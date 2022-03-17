var mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: {
        type: String,
        required:true
    }, 
    number: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true
    }
});



module.exports = {Employee}