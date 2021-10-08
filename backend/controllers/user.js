const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Post, Comment } = require("../models");

exports.register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

  if (
    email == null ||
    password == null ||
    firstname == null ||
    lastname == null
  ) {
    return res.status(400).json({ error: "missing parameters" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "email is not valid" });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      error:
        "password invalid (must length 4 - 8 and include 1 number at least)",
    });
  }

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(password, 10)
          .then((bcryptedPassword) => {
            User.create({
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

  User.findOne({ where: { email } })
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
  User.findOne({ 
    where: { uuid: req.params.uuid },
    include: [{
      model: Post,
      as: 'posts',
      include: [{
        model: User,
        as: 'user'
      },{
        model: Comment,
        as: 'comments',
        include: 'user'
      }]
    }],
    order: [
      ['posts', 'createdAt', 'DESC']
    ]
  })
    .then((user) => {
      if (user) return res.status(201).json(user);
      else return res.status(404).json({ error: "user not found" });
    })
    .catch(() => res.status(500).json({ error: "cannot fetch user" }));
};

exports.modifyProfile = (req, res) => {
  const userUuid = req.token.userUuid;

  if (userUuid < 0 || userUuid != req.params.uuid)
    return res.status(400).json({ error: "wrong token" });

  let editUser = { ...req.body };

  if (req.files) {
    editUser = {
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
    };
  }

  User.findOne({
    where: { uuid: userUuid },
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
        .catch((error) => {
          res.status(500).json({ error, error: "cannot update user" });
        });
    })
    .catch(() => res.status(500).json({ error: "unable to verify user" }));
};
