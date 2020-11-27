const Price = require('../models/price-model');

module.exports = {
  POST: (req, res) => {
    const price = new Price({
      date: req.body.date,
      good_id: req.body.good_id,
      good: req.body.good,
      category_id: req.body.category_id,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rating,
      photo: req.body.photo
    });
    price.save((err,data) => {
      if (err) {
          console.log(err)
        } else {
          res.send({
            success: true,
            message: `Загрузка расценки ID_${data._id} выполнена успешно...`
          })
        }   
      });      
    },
    GET: (req, res) => {
      let search = {};
      const o = {good_id: 1};//сортировка "№п/п"(например let o = {rating: 1}-поле "рейтинг" по возрастанию, {rating: -1}-по убыванию, {}-нет сортировки)
      const v = 20;//лимит в 20 записей
      if(req.query || req.params) {
        if(req.params.id) search.good_id = req.params.id;
        if(req.query.brandName && req.query.brandName !== '') {
          search.brand = req.query.brandName;};
        if(req.query.highRating === 'true') {
          search = {...search, rating: 10};
        };
       if(req.query.startDate !== '' && req.query.endDate === '') {
          search = {...search, date: {$gte: req.query.startDate}};
        };
        if((req.query.startDate !== '' && req.query.endDate !== '') && (req.query.startDate <= req.query.endDate)) {
          search = {...search, date: {$gte: req.query.startDate, $lte: req.query.endDate}};
        };
        if(req.query.startDate === '' && req.query.endDate !== '') {
          search = {...search, date: {$lte: req.query.endDate}};
        };         
          Price.find(search).sort(o).limit(v).exec((err, data) => {
            if(err) 
            {res.sendStatus(500);}
            else 
            {
              return res.send(data);
            };
          });          
      } else {
        Price.find(search).exec((err, data) => {
          if(err) 
          {res.sendStatus(500);}
          else 
          {
            return res.send(data);
          }
        });
      };
    },
    GET_ID: (req, res) => {
      Price.find({brand: req.query.brandName}).exec((err, data) => {
          if(err) 
          {req.sendStatus(500);}
          else
          {res.send(data);}
      });
    },
    PUT_ID: (req, res) => {
        Price.findOneAndUpdate({good_id: req.params.id}, 
          req.body ,
          (err, docks) => {
            if(err) 
            {req.sendStatus(500);}
            else
            {res.send({
              success: true,
              message: `Обновление расценки ID_${data._id} выполнено успешно...`
            });}
        });
    }, 
    DELETE: (req, res) => {
      Price.remove({good_id: req.params.id},
        (err, docks) => {
          if(err) 
          {req.sendStatus(500);}
          else
          {res.send({
            success: true,
            message: `Удаление расценки ID_${data._id} выполнено успешно...`
          });}
      });
    }
  }  