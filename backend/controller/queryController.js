let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    Aroute = express.Router(),
    m = require('../models/query'),
    formidable = require('formidable');
app.use(bodyParser.json());
app.use(cors());

Aroute.route('/create').post((req, res, next) => {
    m.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Data : ' + data)
            res.json(data)
        }
    })
});

Aroute.route('/').get((req, res) => {
    m.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
module.exports = Aroute;