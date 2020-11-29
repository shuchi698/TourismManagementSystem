let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    app = express(),
    Aroute = express.Router(),
    m = require('../models/attractions'),
    formidable = require('formidable');
app.use(bodyParser.json());
app.use(cors());

Aroute.route('/create').post((req, res) => {
    var k = {}
    console.log('Reached at Backend..');
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
        k.title = fields.title;
        k.description = fields.description;
        k.latitude = fields.latitude;
        k.longitude = fields.longitude;
        k.type = fields.type;

        m.create(k, (err, data) => {
            if (err) { console.log('error : ' + err); }
            else { console.log('data is:' + data) };
        })
    });
    form.on('fileBegin', (name, file) => {
        file.path = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'attractions', file.name);
        console.log('Before file path:'+name);
        console.log(file.path);

        k.photo = file.path;

        console.log(k.photo);

        console.log("JSON: " + k);
    });
    form.on('file', (name, file) => {
        console.log('Uploaded ' + file.name);
    });
    res.end();
});

//Get ALl Attractions
Aroute.route('/').get((req,res)=>{
    m.find((err,data)=>{
        if(err) { console.log(err);}
        else{ res.json(data);}
    })
})
//Read one Attraction

Aroute.route('/read/:id').get((req, res,next) => {
    m.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
//Delete Attraction
Aroute.route('/delete/:id').delete((req,res,next)=>{
    m.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err) {console.log(err);}
        else { res.status(200).json({
            msg :data
        })}
    })
})
//Get Categorywise attractions
Aroute.route('/getatype/:type').get((req,res,next)=>{
    var z=req.params.type
    console.log(z);
    var query=m.find({'type':z});
    query.exec((err,docs)=>{
        if(err) console.log(err)
        else
        {
            console.log(docs);
            res.send(docs);
        }

    })



})

Aroute.route('/update/:id').put((req,res,next)=>{
   
   //
   
   var k = {}
   console.log('Reached at Backend..');
   let form = new formidable.IncomingForm();
   form.parse(req, (err, fields, file) => {
       k.title = fields.title;
       k.description = fields.description;
       k.latitude = fields.latitude;
       k.longitude = fields.longitude;
       k.type = fields.type;

       m.findByIdAndUpdate(req.params.id,k,(err,data)=>{
           if(err) console.log(err);
           else
           {
               console.log("hello"+data);
               console.log(data);
           }
           
       });
   });
   form.on('fileBegin', (name, file) => {
       file.path = path.join(__dirname, '..', '..', 'frontend', 'src', 'assets', 'attractions', file.name);
       console.log('Before file path:'+name);
       console.log(file.path);

       k.photo = file.path;

       console.log(k.photo);

       console.log("JSON: " + k);
   });
   form.on('file', (name, file) => {
       console.log('Uploaded ' + file.name);
   });
   res.end();

   
   
   // 
})
module.exports = Aroute;