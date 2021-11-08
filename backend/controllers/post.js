const models = require("../models");
const fs = require("fs");

exports.getAllPosts = (req, res) => {
  const options = {
    include: "user",
    order: [["createdAt", "DESC"]],
  };

  models.Post.findAll(options)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = async (req, res) => {
  let reqFiles = "";
  if (req.files) {
    const url = req.protocol + "://" + req.get("host");
    for (let i = 0; i < req.files.length; i++) {
      reqFiles += url + "/images/" + req.files[i].filename + ";";
    }
  }

  const postObject = req.files
    ? {
        title: req.body.title,
        content: reqFiles,
      }
    : { ...req.body };

  try {
    const user = await models.User.findOne({
      where: { uuid: req.token.userUuid },
    });

    const newPost = await models.Post.create({
      title: postObject.title,
      content: req.files ? postObject.content : "",
      userId: user.id,
    });

    const post = await models.Post.findOne({
      where: { id: newPost.id },
      include: "user",
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.modifyPost = async (req, res) => {
  const uuid = req.token.userUuid;
  const postObject = req.file
    ? {
        title: req.body.title,
        content: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  try {
    const user = await models.User.findOne({ where: { uuid } });
    const post = await models.Post.findOne({
      where: { id: req.params.postId, userId: user.id },
    });
    const file = await post.content.split("/images/")[1];
    if (file != undefined) {
      fs.unlink(`images/${file}`, (error) => {
        if (error) res.status(400).json({ error });
      });
    }

    post.title = postObject.title;
    post.content = postObject.content;
    await post.save();

    const changedPost = await models.Post.findOne({
      where: { id: req.params.postId, userId: user.id },
      include: "user",
    });

    return res.status(201).json(changedPost);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  const uuid = req.token.userUuid;
  const isAdmin = req.token.isAdmin;
  const where = {
    id: req.params.postId,
  };

  try {
    const user = await models.User.findOne({ where: { uuid } });
    if (!isAdmin) where.userId = user.id;
    const post = await models.Post.findOne({ where });
    // const isfiles = await post.content
    // if (isfiles != "") {
    //   const files = await post.content.split(";");
    //   for (let i = 0; i < files.length - 1; i++) {
    //     const file = await files[i].split("/images/")[1];
    //     console.log(files)
    //     fs.unlink(`images/${file}`, (error) => {
    //       if (error) res.status(400).json({ error });
    //     });
    //   }
    // }
    await post.destroy();
    await models.Comment.destroy({ where: { postId: req.params.postId } });
    return res.status(200).json({ message: "Publication supprimé" });
  } catch (e) {
    return res.status(500).json({ e });
  }
};
