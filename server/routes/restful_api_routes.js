MongoClient = require('mongodb').MongoClient;
var  moment = require('moment');


var dburl = "mongodb://butjaa:admin@ds123182.mlab.com:23182/holidaychecker-db";
var db;

MongoClient.connect(dburl, function (err, database) {
    if(err) throw err;
    db = database;
});


exports.findAll = function(req, res) {
    db.collection('countries', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findByCountry = function (req, res, next) {
    var country = req.params.country;
      db.collection('countries', function(err, collection) {
        collection.find({'country':new RegExp(country, "i")}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.delete = function (req, res, next) {
    var country = req.params.country;
      db.collection('countries', function(err, collection) {
        collection.remove({'country':new RegExp(country, "i")}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

exports.findByGivenParams = function(req, res, next) {
	var country = req.params.country,
        dateFrom = new Date((req.params.dateFrom).toString()),
        dateTo = new Date((req.params.dateTo).toString()),
        usrDateFrom = moment(dateFrom, 'YYYY-MM-DD').format(),
		usrDateTo =  moment(dateTo, 'YYYY-MM-DD').format();
        
       db.collection('countries', function(err, collection) {

            collection.find({'country':new RegExp(country, "i" ),
                            'isoDate':{$gte: usrDateFrom, $lte:usrDateTo}}).toArray(function(err, items) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
                } else {
                    res.send(items);
                }
            });
        });
}


/*
exports.findByGivenParams = function(req, res, next) {
	var country = req.params.country,
        dateFrom = req.params.dateFrom,
        dateTo = req.params.dateTo,
        response = holidayslist[country];

    if (response !== undefined) {
        res.send(response.filter(function (el) {
		var dateObj = new Date(el.date.year,el.date.month-1,el.date.day).getTime(),
			usrDateFrom = new Date(dateFrom).getTime(),
			usrDateTo = new Date(dateTo).getTime(),
			inRange = dateObj >= usrDateFrom && dateObj <= usrDateTo;
	
		    return	inRange == true;
	    }));	
    } else {
        res.send("There is no data for the given parameters!");
    }
}*/