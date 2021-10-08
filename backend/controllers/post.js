const models = require("../models");

exports.toPost = (req, res) => {
  const userUuid = req.token.userUuid;

  const postObject = req.file
    ? {
        title: req.body.title,
        content: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  models.User.findOne({
    where: { uuid: userUuid },
  })
    .then((userFound) => {
      models.Post.create({
        title: postObject.title,
        content: req.file ? postObject.content : "",
        userId: userFound.id,
      })
        .then((newPost) => res.status(201).json(newPost))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};

exports.getAllPosts = (req, res) => {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        as: "user",
      },
      {
        model: models.Comment,
        as: "comments",
        include: [{ model: models.User, as: "user" }],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then(function (posts) {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch(function () {
      res.status(500).json({ error: "invalid fields" });
    });
};

exports.createComment = (req, res) => {
  const userUuid = req.token.userUuid;

  models.User.findOne({
    where: { uuid: userUuid },
  })
    .then((userFound) => {
      models.Comment.create({
        userUuid: userFound.uuid,
        userId: userFound.id,
        postId: req.params.postId,
        content: req.body.content,
      })
        .then((newComment) => {
          models.Comment.findOne({
            where: { id: newComment.id },
            include: 'user',
          }).then((comment) => res.status(200).json(comment))
          .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};
