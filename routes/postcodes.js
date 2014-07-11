module.exports = function(app) {
	var db = app.get('db');

	var postcodes = db.collection('postcodes');

	return {
		findAll: function(req, res, next) {

			postcodes.find({} ,{}).toArray(function(e, results) {
				if (e) {
					return next(e);
				}
				res.send(results)
			});
		},
		find: function(req, res, next) {

			console.log(req.query);
			if (req.query.huisnummer === undefined || req.query.postcode === undefined) {
				res.send(204, {msg: 'either huisnummer or postcode must be used'});
				return next();
			} else {

				postcodes.findOne({postcode:req.query.postcode, huisnummer: req.query.huisnummer}, function(err, result) {
				  console.log(result);
				  if ( result === null ) {
				  	res.send(404);
				  } else {
				  	res.send(result);
					}
				});

			}


		},
		add: function(req, res, next) {

			postcodes.insert(req.body, {}, function(e, results){
				if (e) {
					return next(e);
				}
				res.send(results);
			});
		},
		findById: function(req, res, next) {
			postcodes.findById(req.params.id, function(e, result){
				if (e) { 
					return next(e);
				}
				res.send(result);
			})
		},
		updateById: function(req, res, next) {

			postcodes.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(e, result){
				if (e) {
					return next(e);
				}
				res.send((result===1)?{msg:'success'}:{msg:'error'})
			});
		},
		remove: function(req, res, next) {
			postcodes.removeById(req.params.id, function(e, result){
				if (e) {
					return next(e);
				}
				res.send((result===1)?{msg:'success'}:{msg:'error'})
			});
		}
	}

};



