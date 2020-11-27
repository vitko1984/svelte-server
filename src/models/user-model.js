const mongoose = require('mongoose');
bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {  
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }                                
  });

  UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(8, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });

  UserSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
  };

  const User = mongoose.model('User', UserSchema);
  module.exports = User;