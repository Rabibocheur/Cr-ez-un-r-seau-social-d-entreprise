const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const fs = require("fs");

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  models.User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(password, 10)
          .then((bcryptedPassword) => {
            models.User.create({
              firstname,
              lastname,
              email,
              password: bcryptedPassword,
              isAdmin: 0,
            })
              .then((newUser) => {
                res.status(201).json(newUser);
              })
              .catch(() => res.status(500).json({ error: "cannot add user" }));
          })
          .catch((error) => res.status(500).json({ error }));
      } else return res.status(400).json({ error: "email already exist" });
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  models.User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(400)
                .json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
              user,
              token: jwt.sign(
                { userUuid: user.uuid, isAdmin: user.isAdmin },
                "SECRET_TOKEN",
                {
                  expiresIn: "1h",
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      } else return res.status(400).json({ error: "user not exist" });
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};

exports.getUserProfile = (req, res) => {
  models.User.findOne({
    where: { uuid: req.params.uuid },
    include: [
      {
        model: models.Post,
        as: "posts",
        include: [
          {
            model: models.User,
            as: "user",
          },
          {
            model: models.Comment,
            as: "comments",
            include: "user",
          },
        ],
      },
    ],
    order: [["posts", "createdAt", "DESC"]],
  })
    .then((user) => {
      if (user) return res.status(201).json(user);
      else return res.status(404).json({ error: "user not found" });
    })
    .catch(() => res.status(500).json({ error: "cannot fetch user" }));
};

exports.modifyProfile = (req, res) => {
  const uuid = req.token.userUuid;

  if (uuid != req.params.uuid)
    return res.status(400).json({ error: "wrong token" });

  if (req.files) {
    models.User.findOne({ where: { uuid } })
      .then((user) => {
        if(req.files.avatar){
          const avatar = user.avatar.split("/images/")[1];
          if(avatar != undefined){
            fs.unlink(`images/${avatar}`, (error) => {
              if (error) res.status(400).json({ error });
            });
          }
        }
        if(req.files.couverture){
          const couverture = user.couverture.split("/images/")[1];
          if(couverture != undefined){
            fs.unlink(`images/${couverture}`, (error) => {
              if (error) res.status(400).json({ error });
            });
          }
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }

  const editUser = req.files
    ? {
        ...JSON.parse(req.body.user),
        avatar: req.files.avatar
          ? `${req.protocol}://${req.get("host")}/images/${
              req.files.avatar[0].filename
            }`
          : req.body.avatar,
        couverture: req.files.couverture
          ? `${req.protocol}://${req.get("host")}/images/${
              req.files.couverture[0].filename
            }`
          : req.body.couverture,
      }
    : { ...req.body };

  models.User.findOne({
    where: { uuid },
  })
    .then((user) => {
      user
        .update(editUser)
        .then((user) => {
          if (user) return res.status(201).json(user);
          else
            return res
              .status(500)
              .json({ error: "cannot update user profile" });
        })
        .catch(() => {
          res.status(500).json({ error: "cannot update user" });
        });
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};
