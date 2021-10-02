const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.register = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const bio = req.body.bio;

    const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;

    if(email == null || password == null || firstname == null || lastname == null){
        return res.status(400).json({'error': 'missing parameters'});
    }

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({ 'error': 'password invalid (must length 4 - 8 and include 1 number at least)' });
    }

    models.User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(user => {
        if(!user){
            bcrypt
            .hash(password, 10)
            .then((bcryptedPassword) => {
                models.User.create({
                  firstname: firstname,
                  lastname: lastname,
                  email: email,
                  password: bcryptedPassword,
                  avatar: avatar,
                  bio: bio,
                  isAdmin: 0,
                })
                  .then((newUser) => {
                    return res.status(201).json({
                      userId: newUser.id,
                    });
                  })
                  .catch((error) => {
                    return res
                      .status(500)
                      .json({ error, error: "cannot add user" });
                  });
            })
            .catch((error) => res.status(500).json({ error }));
        }else{
            return res.status(400).json({'error': 'email already exist'});
        }
    })
    .catch(error => { return res.status(500).json({error, 'error': 'unable to verify user'}) })
}

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(email == null || password == null){
        return res.status(400).json({'error': 'missing parameters'});
    }

    models.User.findOne({
        where: { email: email }
    })
    .then(user => {
        if(user){
            bcrypt
                .compare(password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id }, "SECRET_TOKEN", {
                            expiresIn: "24h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        }else{
            return res.status(400).json({'error': 'user not exist'});
        }
    })
    .catch(error => { return res.status(500).json({error, 'error': 'unable to verify user'}) })
}

exports.getUserProfile = (req, res) => {
    models.User.findOne({
        attributes: [ 'id', 'email', 'firstname', 'lastname', 'avatar', 'bio'],
        where: { id: req.params.userId }
      }).then(function(user) {
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      }).catch(function(err) {
        res.status(500).json({ 'error': 'cannot fetch user' });
      });
}