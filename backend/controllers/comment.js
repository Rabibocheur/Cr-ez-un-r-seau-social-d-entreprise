const models = require("../models");

exports.getAllComments = (req, res, next) => {
  const options = {
    where: { postId: req.params.postId },
    include: 'user',
    order: [['createdAt', 'ASC']]
  }

  if (req.query.limit) {
    options.order = [['createdAt', 'DESC']]
    options.limit = parseInt(req.query.limit)
  }

  models.Comment.findAndCountAll(options)
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => res.status(400).json({ error }))
}

exports.createComment = (req, res) => {
    const userUuid = req.token.userUuid;
  
    models.User.findOne({
      where: { uuid: userUuid },
    })
      .then((userFound) => {
        models.Comment.create({
          userId: userFound.id,
          postId: req.params.postId,
          content: req.body.content,
        })
          .then((newComment) => {
            models.Comment.findOne({
              where: { id: newComment.id },
              include: "user",
            })
              .then((comment) => res.status(200).json(comment))
              .catch((error) => res.status(500).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch(() => res.status(500).json({ error: "unable to verify user" }));
  };

 exports.modifyComment = async (req, res) => {
    const uuid = req.token.userUuid;
  
    try {
      const user = await models.User.findOne({ where: { uuid } });
      const comment = await models.Comment.findOne({
        where: { id: req.params.commentId, userId: user.id },
      });
      comment.content = req.body.content;
      await comment.save();
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  exports.deleteComment = async (req, res) => {
    const uuid = req.token.userUuid;
    const isAdmin = req.token.isAdmin;
    const where = { id: req.params.commentId };
  
    try {
      const user = await models.User.findOne({ where: { uuid } });
      if (!isAdmin) where.userId = user.id;
      const comment = await models.Comment.findOne({ where });
      await comment.destroy();
      return res.status(200).json({ message: "Commentaire supprimé" });
    } catch (e) {
      return res.status(500).json({ e });
    }
  };
  
  