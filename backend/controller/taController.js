let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    Aroute = express.Router(),
    m = require('../models/ta');
app.use(bodyParser.json());
app.use(cors());

//Add Travel Agent
Aroute.route('/create').post((req, res, next) => {
    console.log("In create");
    m.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data);
            res.json(data)
        }
    })
});
//Get All Travel Agents
Aroute.route('/').get((req, res) => {
    m.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
//Get single Agent
Aroute.route('/read/:id').get((req, res) => {
    m.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

//Update Agent
Aroute.route('/update/:id').put((req, res, next) => {
    m.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})
//Delete Agent
Aroute.route('/delete/:id').delete((req, res, next) => {
    m.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  
module.exports = Aroute;