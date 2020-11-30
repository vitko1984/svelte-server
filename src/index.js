require('module-alias/register');
require("dotenv").config()

const express = require('express'),
      priceRouter = express.Router(),
      priceRoofRouter = express.Router(),
      userRouter = express.Router(),
      clientRouter = express.Router(),
      commentRouter = express.Router(),
      basketRouter = express.Router(),
      mailerRouter = express.Router(),
      telegramRouter = express.Router(),
      //whatsappRouter = express.Router(),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      //consign = require('consign'),
      passport = require('passport'),
      passportConfig = require('./config/passport')(passport),
      jwt = require('jsonwebtoken'),      
      morgan = require('morgan'),
      mongoose = require('mongoose'),

      config = require('./config/config'),
      //config = require('@config'),
      priceAPI = require('./routes/price-api'),
      price_roofAPI = require('./routes/price_roof-api'),
      user_authAPI = require('./routes/user-api_auth'),
      userAPI = require('./routes/user-api'),
      clientAPI = require('./routes/client-api'),
      commentAPI = require('./routes/comment-api'),
      basketAPI = require('./routes/basket-api'),
      mailerAPI = require('./routes/mailer-api'),
      telegramAPI = require('./routes/telegram-api'),
      //whatsappAPI = require('./routes/whatsapp-api');
      UserModel = require('./models/user-model'),
      ClientModel = require('./models/client-model'),
      CommentModel = require('./models/comment-model'),
      PriceRoofModel = require('./models/price_roof-model'),
      BasketModel = require('./models/basket-model'), 

      app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(passport.initialize());

app.set('vitkosecret', config.secret);

const authenticate = passport.authenticate('jwt', config.session);

app.use('/price', priceRouter);
priceRouter.post('/', priceAPI.POST);
priceRouter.get('/:id?', priceAPI.GET);
priceRouter.put('/:id', priceAPI.PUT_ID);
priceRouter.delete('/:id', priceAPI.DELETE);

app.use('/prices', priceRoofRouter);
priceRoofRouter.post("/", price_roofAPI.POST(PriceRoofModel));
priceRoofRouter.get("/", price_roofAPI.GET(PriceRoofModel));
priceRoofRouter.put("/",  price_roofAPI.PUT(PriceRoofModel));
priceRoofRouter.delete("/",  price_roofAPI.DELETE(PriceRoofModel));

app.use('/comments', commentRouter);
commentRouter.post("/", commentAPI.POST(CommentModel));
commentRouter.get("/", commentAPI.GET(CommentModel));
commentRouter.put("/",  commentAPI.PUT(CommentModel));
commentRouter.delete("/",  commentAPI.DELETE(CommentModel));

app.use('/users', userRouter);
userRouter.post('/', user_authAPI.LOGIN(UserModel));
userRouter.post('/setup', userAPI.SETUP(UserModel));
userRouter.post('/register', userAPI.REGISTER(UserModel));
userRouter.get('/', authenticate, userAPI.INDEX(UserModel, app.get('vitkosecret')));

app.use('/clients', clientRouter);
clientRouter.post("/", authenticate, clientAPI.STORE(UserModel, ClientModel, app.get('vitkosecret')));
clientRouter.get("/", authenticate, clientAPI.GET_ALL(UserModel, ClientModel, app.get('vitkosecret')));

app.use('/basket', basketRouter);
basketRouter.post('/', authenticate, basketAPI.STORE(UserModel, ClientModel, BasketModel, app.get('vitkosecret')));
basketRouter.get('/', authenticate, basketAPI.GET_ALL(UserModel, BasketModel, app.get('vitkosecret')));
basketRouter.get('/from_client', authenticate, basketAPI.GET_ALL_FROM_CLIENT(UserModel, BasketModel, app.get('vitkosecret')));

app.use('/mailer', mailerRouter);
mailerRouter.post('/', mailerAPI.POST());

app.use('/telegram', telegramRouter);
//telegramRouter.get('/', telegramAPI.GET());
telegramRouter.post('/', telegramAPI.POST());

/*app.use('/whatsapp', whatsappRouter);
whatsappRouter.get('/', whatsappAPI.GET());
whatsappRouter.post('/', whatsappAPI.POST());*/

mongoose.connect(config.dbURL, config.dbOptions);
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - подключение успешно...`);
    app.listen(process.env.PORT || config.port, () => console.log(`Сервер стартовал с порта ${config.port}...`));})
  .on('error', error => console.warn(error));
    
module.exports = app;