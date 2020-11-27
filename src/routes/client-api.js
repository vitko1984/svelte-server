const mongoose = require('mongoose');

const api = {};

api.STORE = (User, Client, Token) => (req, res) => {
  if (Token) {
    const client = new Client({
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    client.save(error => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, message: "Клиент успешно внесен в БД..." });
    })
  } else return res.status(403).send({ success: false, message: 'Неавторизован, нег гокена...' });
}

api.GET_ALL = (User, Client, Token) => (req, res) => {
  if (Token) {
    Client.find({ user_id: req.query.user_id }, (error, client) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(client);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Неавторизован, нет токена...' });
}

module.exports = api;