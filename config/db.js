const mongoose = require('mongoose');
const connection = mongoose.connect('mongodb://0.0.0.0/day1').then(()=>{
    console.log('connect to db')
});

module.exports= connection;