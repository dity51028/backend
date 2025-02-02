


const mongoose = require('mongoose');

//creating schema
const userSchema = new mongoose.Schema({
    userName : String,
    email:String,
    password:String,

});

//create usermodel
 const userModel = mongoose.model('user',userSchema);

 module.exports = userModel;

