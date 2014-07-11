var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');


var app = express();

var env = process.env.NODE_ENV || 'development';

app.use(bodyParser());

// define logger
app.use(logger());

// we are behind a proxy (nginx)
app.set('trust proxy', true);

/*
configuration
*/
if ('development' == env) {
  app.set('dbUri', 'mongodb://@localhost:27017/zippy');
}

if ('staging' == env) {
  app.set('dbUri', process.env.MONGOHQ_URL);
}

//add logging for each request
app.use(function(req, res, next) {
  console.log('%s %s — %s', (new Date).toString(), req.method, req.url);
  return next();
});

// enable cookie parser
app.use(cookieParser());

// error handling
app.use(function(err, req, res, next) {
   //do logging and user-friendly error message display
   console.error(err);
   res.send(500, {status:500, message: 'internal error', type:'internal'});
});

//enable csrf protection
//app.use(csrf());

// serve static files, not need for now
//app.use(express.static(path.join(__dirname, 'public')));


var db = mongoskin.db(app.get('dbUri'), {safe:true});

app.set('db', db);

var postcodes = require('./routes/postcodes')(app);




app.get('/postcodes', postcodes.findAll);

app.get('/postcode', postcodes.find);

app.post('/postcode', postcodes.add);

app.get('/postcode/:id', postcodes.findById);

app.put('/postcode/:id', postcodes.updateById);

app.delete('/postcode/:id', postcodes.remove);


console.log('Express server listening on port 3000');

app.listen(3000);