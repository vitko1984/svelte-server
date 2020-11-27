const mongoose = require('mongoose');

const api = {};

api.POST = (Roof) => (req, res) => {
  let body_post = {};
  if(req.body) {
    if(!!req.body.serviceId) body_post.service_id = req.body.serviceId; 
    if(!!req.body.serviceName) body_post.service = req.body.serviceName;
    if(!!req.body.unit) body_post.unit = req.body.unit; 
    if(!!req.body.price) body_post.price = req.body.price; 
    if(!!req.body.rating) body_post.rating = req.body.rating; 
    if(!!req.body.foto) body_post.foto = req.body.foto; 
    Roof.create({...body_post}, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({...data, message: "Ценник успешно внесен в БД..."});
      return true;    
    })      
  };
}

api.GET = (Roof) => (req, res) => {
  let search = {};
  //let o = {service_id: 1};//сортировка "№п/п"(например let o = {rating: 1}-поле "рейтинг" по возрастанию, {rating: -1}-по убыванию, {}-нет сортировки)
  let o = {};
  const v = 20000;//лимит в 20 записей
  if(req.query || req.params) {
    if(req.params.id) search.service_id = req.params.id;
    if(req.query.key && req.query.sort) o[req.query.key] = req.query.sort;
    if(req.query.serviceName && req.query.serviceName !== '') {
      search.service = req.query.serviceName;
    };
    if(req.query.highRating === 'true') {
      search = {...search, rating: 10};
    };      
    Roof.find(search).sort(o).limit(v).exec((err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json(data);
      return true;
    });          
  } else {
    Roof.find(search).exec((err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json(data);
      return true;       
    });
  };
}

api.PUT = (Roof) => (req, res) => {
  let search = {};
  let body_edit = {};
  if(req.body) {
    search.service_id = req.body.serviceFilterId;
    if(!!req.body.serviceId) body_edit.service_id = req.body.serviceId; 
    if(!!req.body.serviceName) body_edit.service = req.body.serviceName;
    if(!!req.body.unit) body_edit.unit = req.body.unit; 
    if(!!req.body.price) body_edit.price = req.body.price; 
    if(!!req.body.rating) body_edit.rating = req.body.rating; 
    if(!!req.body.foto) body_edit.foto = req.body.foto; 
    Roof.findOneAndUpdate(search, {$set: {...body_edit}}, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({ ...data, message: "Ценник успешно обновлен в БД..." });
      return true;    
    })
  }
};

api.DELETE = (Roof) => (req, res) => {
  let search = {};  
  if(req.query) {
    const id = req.query.serviceId;
    search.service_id = id;
    Roof.findOneAndDelete(search, (err, data) => {
      if(err) return res.status(400).json(error);
      res.status(200).json({ ...data, message: "Ценник успешно удален из БД..." });
      return true;
    });
  };  
};

module.exports = api;