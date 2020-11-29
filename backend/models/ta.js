const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Ta = new Schema({
    t_name : { type:String},
    t_email : {type:String},
    t_phone : {type:String},
    t_address : {type:String},
    t_city : {type:String},
    t_role : {type:String},
},
    {
        collection:'Travel-Agents'
    },{ versionKey: false 
})
module.exports = mongoose.model('Travel-Agents',Ta);