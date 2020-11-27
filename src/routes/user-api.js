const mongoose = require('mongoose');
const api = {};
api.SETUP = (User) => (req, res) => {
  const admin = new User({
    username: 'admin',
    password: 'admin',
    clients: []
  });
admin.save(error => {
    if (error) throw error;
console.log('Админ-аккаунт успешно создан...');
    res.json({ success: true });
  })
};

api.INDEX = (User, VitkoToken) => (req, res) => {
  const token = VitkoToken;
  if (token) {
    User.find({}, (error, users) => {
      if (error) throw error;
      res.status(200).json(users);
    });
  } else return res.status(403).send({ success: false, message: 'Неавторизован...' });
};

api.REGISTER = (User) => (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.password_confirm) res.json({ success: false, message: 'Пожалуйста заполните все поля формы...' })
  else {
    if(req.body.password !== req.body.password_confirm) res.json({ success: false, message: 'Пароли в обеих полях должны быть одинаковы...' })
    else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password/*,
        clients: []*/
      });
      newUser.save((error) => {
        if (error) return res.status(400).json({ success: false, message:  'Такой пользователь уже существует...' });
        res.json({ success: true, message: 'Аккаунт успешно создан...' });
      });
    }; 
  };
};

module.exports = api;  