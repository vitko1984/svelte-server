const mongoose = require('mongoose');

const api = {};

api.POST = (Comment) => (req, res) => {
  let body_post = {};
  if(req.body) {
    if(!!req.body.client) body_post.client = req.body.client; 
    if(!!req.body.service) body_post.service = req.body.service;
    if(!!req.body.date) body_post.date = req.body.date; 
    if(!!req.body.rating) body_post.rating = req.body.rating; 
    if(!!req.body.comments) body_post.comments = req.body.comments; 
    Comment.create({...body_post}, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({...data, message: "Отзыв успешно внесен в БД..."});
      return true;    
    })      
  };
}

api.GET = (Comment) => (req, res) => {
  let search = {};
  Comment.find(search).exec((err, data) => {
    if(err) return res.status(400).json(error);
    res.status(200).json(data);
    return true;       
  });
}

api.PUT = (Comment) => (req, res) => {
  let search = {};
  let body_edit = {};
  if(req.body) {
    search._id = req.body.serviceFilterId;
    if(!!req.body.client) body_edit.client = req.body.client; 
    if(!!req.body.service) body_edit.service = req.body.service;
    if(!!req.body.date) body_edit.date = req.body.date; 
    if(!!req.body.rating) body_edit.rating = req.body.rating; 
    if(!!req.body.comments) body_edit.comments = req.body.comments; 
    Comment.findOneAndUpdate(search, {$set: {...body_edit}}, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({ ...data, message: "Отзыв успешно обновлен в БД..." });
      return true;    
    })
  }
};

api.DELETE = (Comment) => (req, res) => {
  let search = {};  
  if(req.query) {
    const id = req.query.serviceId;
    search._id = id;
    Comment.findOneAndDelete(search, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({ ...data, message: "Отзыв успешно удален из БД..." });
      return true;
    });
  };  
};

module.exports = api;