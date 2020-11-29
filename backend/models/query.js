const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Query = new Schema({
    q_name : {type:String},
    q_email : {type:String},
    q_phone : {type:String},
    q_cat : {type:String},
    q_msg : {type:String}
},
    {
        collection:'queries'
    },{ versionKey: false 
})
module.exports = mongoose.model('queries',Query);