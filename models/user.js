var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Setup user schema
var userSchema = mongoose.Schema({
    name: String,
    description: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at:  { type: Date, default: Date.now },
    updated_at:  { type: Date, default: Date.now },
    headerImage: String,
    profileImage: String,
    followers: {type: Array},
    following: {type: Array}
});

userSchema.pre('save', function(next){
  var currentDate = new Date();

  this.updated_at = currentDate;

  this.created_at = currentDate;

  next();
});

// Functions for generating a hash and validing a password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

//Setup user table and assocaite the schama
var User = mongoose.model('User', userSchema);

//Exports our User model
module.exports = User;
