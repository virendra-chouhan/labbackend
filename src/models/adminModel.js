const mongoose = require('mongoose');

const userSchema= mongoose.Schema({

  userName:{
    type:String,
    unique:true,

  },
  password:String,
  name:String


});


const ADMIN = mongoose.model('admin', userSchema);

module.exports = ADMIN;