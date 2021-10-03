const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.register = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

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
                  avatar: 'http://127.0.0.1:3000/images/pngegg.png',
                  couverture: 'http://127.0.0.1:3000/images/couverture.jpg',
                  bio: '',
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
                        return res.status(401).json({ 'error': "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: user.id,
                        firstname: user.firstname,
                        avatar: user.avatar,
                        token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, "SECRET_TOKEN", {
                            expiresIn: "1h",
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
        attributes: [ 'id', 'email', 'firstname', 'lastname', 'avatar', 'couverture', 'bio'],
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

exports.modifyProfile = (req, res) => {
    const userId = req.token.userId

    if(userId < 0 || userId != req.params.userId)
        return res.status(400).json({'error': 'wrong token'})

    let editUser = { ...req.body };

    if(req.files){
        editUser = {
            ...JSON.parse(req.body.user),
            avatar: req.files.avatar ? `${req.protocol}://${req.get("host")}/images/${
                req.files.avatar[0].filename}` : req.body.avatar,
            couverture: req.files.couverture ? `${req.protocol}://${req.get("host")}/images/${
                req.files.couverture[0].filename}` : req.body.couverture
        }
    }

    models.User.findOne({
        attributes: ['id', 'firstname', 'lastname', 'avatar', 'couverture', 'bio'],
        where: { id: userId }
    }).then(user => {
        user.update(editUser)
        .then(user => {
            if (user) return res.status(201).json({'message': 'profil modifié'});
            else return res.status(500).json({ 'error': 'cannot update user profile' });
        })
        .catch(error => {
            res.status(500).json({ error, 'error': 'cannot update user' });
        })
    }).catch(error => {
        return res.status(500).json({ error, 'error': 'unable to verify user' });
    })
}