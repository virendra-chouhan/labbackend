const mongoose = require('mongoose');




const userSchema = mongoose.Schema({

    _id:String,
    userName: String,
    category: String,
    address: String,
    mobileNumber: String,
    altMobileNumber: String,
    aadhar: String,



});

const USER = mongoose.model('user', userSchema);

module.exports = USER;    