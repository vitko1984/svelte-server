const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./config.js'),
      UserModel = require('../../src/models/user-model');

      module.exports = (passport) => {
        const parameters = {};
        parameters.secretOrKey = config.secret;
        parameters.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
        passport.use(new Strategy(parameters, function(payload, done) {
          UserModel.findOne({ id: payload.id }, (error, user) => {
            if (error) return done(error, false);
            if (user) done(null, user);
            else done(null, false);
          });
        }));
      }