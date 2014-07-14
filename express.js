var env = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var csrf = require('csurf');
var config = require('./config/'+env+'/config');

var app = express();

app.use(bodyParser());
app.use(logger());
app.set('trust proxy', config.trust_proxy);
app.set('config', config);

app.use(function(req, res, next) {
  console.log('%s %s — %s', (new Date).toString(), req.method, req.url);
  return next();
});

app.use(cookieParser());

// error handling
app.use(function(err, req, res, next) {
  console.error(err);
  res.send(500, {status:500, message: 'internal error', type:'internal'});
});

//enable csrf protection
//app.use(csrf());

// serve static files, not need for now
//app.use(express.static(path.join(__dirname, 'public')));

var dbUri = 'mongodb://@'+config.db.host+':'+config.db.port+'/'+config.db.database;

console.log(dbUri);
var db = mongoskin.db(dbUri, {safe:true});

app.set('db', db);

var postcodes = require('./routes/postcodes')(app);
app.get('/postcodes', postcodes.findAll);
app.get('/postcode', postcodes.find);
app.post('/postcode', postcodes.add);
app.get('/postcode/:id', postcodes.findById);
app.put('/postcode/:id', postcodes.updateById);
app.delete('/postcode/:id', postcodes.remove);

console.log('Express server listening on port ' +config.port);

app.listen(config.port);