var express = require('express')
  , mongoskin = require('mongoskin')
  , bodyParser = require('body-parser')

var app = express()
app.use(bodyParser())

var db = mongoskin.db('mongodb://@localhost:27017/zippy', {safe:true});

var postcodes = db.collection('postcodes');

app.get('/', function(req, res, next) {
  res.send('dit endpoint doet niets. ga naar postcode/')
})

app.get('/postcode/', function(req, res, next) {
  postcodes.find({} ,{}).toArray(function(e, results) {
    if (e) {
      return next(e);
    }
    res.send(results)
  });
})

app.post('/postcode/', function(req, res, next) {
  postcodes.insert(req.body, {}, function(e, results){
    if (e) {
      return next(e);
    }
    res.send(results)
  })
})

app.get('/postcode/:id', function(req, res, next) {
  postcodes.findById(req.params.id, function(e, result){
    if (e) { 
      return next(e);
    }
    res.send(result)
  })
})

app.put('/postcode/:id', function(req, res, next) {
  postcodes.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
    if (e) {
      return next(e);
    }
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})

app.delete('/postcode/:id', function(req, res, next) {
  postcodes.removeById(req.params.id, function(e, result){
    if (e) {
      return next(e);
    }
    res.send((result===1)?{msg:'success'}:{msg:'error'})
  })
})

app.listen(3000);