const models = require("../models");

exports.getAllMessage = (req, res, next) => {
  models.Chat.findAll({  include: "user" })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => res.status(400).json({ error }));
};
