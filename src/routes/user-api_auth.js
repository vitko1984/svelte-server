const //mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      //config = require('@config');
      config = require('../config/config');

const api = {};

api.LOGIN = (User) => (req, res) => {
  User.findOne({ username: req.body.username }, (error, user) => {
    if (error) throw error;
      
    if (!user) res.status(401).send({ success: false, message: 'Неаутентифицирован! Пользователь не найден...' });
    else {
            user.comparePassword(req.body.password, (error, matches) => {
              if (matches && !error) {
                const token = jwt.sign({ user }, config.secret);
                res.json({ success: true, message: 'Токен предоставлен...', token, user });
              } else {
                res.status(401).send({ success: false, message: 'Неаутентифицирован! Пользователь, да не тот...' });
              }
            });
          }
        });
      };
      
api.VERIFY = (headers) => {
  if (headers && headers.authorization) {
    const split = headers.authorization.split(' ');
    if (split.length === 2) return split[1];
    else return null;
  } else return null;
};

module.exports = api;

