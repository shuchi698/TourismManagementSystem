const express = require('express'),
   app = express(),
   path = require('path'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./db');
   
var mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
var MongoClient = require('mongodb').MongoClient;
const Dao = require('./controller/controller');
const taO = require('./controller/taController');
const queryO = require('./controller/queryController');
const passport = require('passport');
const session = require('express-session');
const m = require('./models/attractions');
const formidable = require('formidable');
//app.use(cors());

app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors({
   origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
   credentials: true
}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
   console.log('Database sucessfully connected')
},
   error => {
      console.log('Database could not connected: ' + error)
   }
)

// // app.post('/create', (req, res) => {

// //    var k = {}
// //    console.log('Reached at Backend..');
// //    let form = new formidable.IncomingForm();
// //    form.on('fileBegin', (name, file) => {
// //       file.path = path.join(__dirname, '..', 'frontend', 'src', 'assets', 'attractions', file.name);
// //       console.log('Before file path:' + k);
// //       console.log(file.path);

// //       k.photo = file.path;

// //       console.log(k.photo);
// //    });
// //    form.parse(req, (err, fields, file) => {
// //       k.title = fields.title;
// //       k.description = fields.description;
// //       k.latitude = fields.latitude;
// //       k.longitude = fields.longitude;
// //       k.type = fields.type;
// //       console.log(JSON.stringify(k));
// //       m.create(k, (err, data) => {
// //          if (err) { console.log('error : ' + err); }
// //          else { console.log('data is:' + data) };
// //       })
// //       //
// //       // var url = "mongodb://localhost:27017/";
// //       // MongoClient.connect(url, function(err, db) {
// //       //    if (err) throw err;
// //       //    var dbo = db.db("e-tourism");
         
// //       //    dbo.collection("Attractions").insertOne(k, function(err, res) {
// //       //      if (err) throw err;
// //       //      console.log("1 document inserted" + res);
// //       //      db.close();
// //       //    });
// //       //  });

// //       //
// //    });

// //    form.on('file', (name, file) => {
// //       console.log('Uploaded ' + file.name);
// //    });
// //    res.end();
// });
// Setting up port with express js
//const employeeRoute = require('../backend/routes/employee.route')

const MongoStore = require('connect-mongo')(session);

app.use(session({
   name: 'myname.sid',
   resave: false,
   saveUninitialized: false,
   secret: 'secret',
   cookie: {
      maxAge: 36000000,
      httpOnly: false,
      secure: false
   },
   store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use('/query',queryO);
app.use('/api',Dao);
app.use('/ta',taO)
// app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// //app.use('/api', employeeRoute)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


//PORT USAGE
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
   console.log('Connected to port ' + port)
})

// app.use(function (err, req, res, next) {
//    console.error(err.message);
//    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
//    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
// })