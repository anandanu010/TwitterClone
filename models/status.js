var mongoose = require('mongoose');
//Setup Status model with just status in it
var statusSchema = mongoose.Schema({
   status: String,
   username: String,
   created_at:  { type: Date, default: Date.now },
   updated_at:  { type: Date, default: Date.now }
});

statusSchema.pre('save', function(){
  var currentDate = new Date();

  this.updated_at = currentDate;

  this.created_at = currentDate;

  next();
});

var Status = mongoose.model('Status', statusSchema);

module.exports = Status;
