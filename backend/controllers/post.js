const models = require("../models");

exports.toPost = (req, res) => {
  const userId = req.token.userId;

  models.User.findOne({
    where: { id: userId },
  })
    .then(function (userFound) {
      models.Message.create({
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        UserId: userFound.id,
      })
        .then(function (newMessage) {
          return res.status(201).json(newMessage);
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch(function (err) {
      return res.status(500).json({ error: "unable to verify user" });
    });
};

exports.getAllPosts = (req, res) => {
  models.Message.findAll({
    attributes: ["id", "UserId", "title", "content"],
    include: [
      {
        model: models.User,
        attributes: ["firstname", "avatar"],
      },
    ],
  })
    .then(function (messages) {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ error: "no messages found" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "invalid fields" });
    });
};
