const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Attraction Schema

let Attraction = new Schema({
    title:{type: String },
    photo : { type :String},
    description : { type : String },
    latitude : { type :String},
    longitude : { type : String },
    type : { type :String},
},
    {
        collection:'Attractions'
    },{ versionKey: false 
})
module.exports = mongoose.model('Attractions',Attraction);
