let moment = require('moment');
let sanitize = require('express-mongo-sanitize').sanitize;
let path = require('path');
let fs = require('fs');
let ObjectId = require('mongodb').ObjectID;

let config = require("../config.json"),
    MongoClient = require('mongodb').MongoClient,
    dburl = `mongodb://${config.database.username}:${config.database.password}@ds123182.mlab.com:23182/holidaychecker-db`,
    db, collection;




MongoClient.connect(dburl, function (err, database) {
    if(err) throw err;
    db = database;

    db.collection('countries', function(err, countries) {
       collection = countries;
    });
});

exports.getFirstPage = function(req,res){
    res.sendfile(path.join(__dirname + "/index.html"));
};

exports.findAll = function(req, res) {

    collection.find().sort({country:1}).toArray(function(err, items) {
        res.send(items);
    });
    
};

exports.findByCountry = function (req, res, next) {
    let country = sanitize(req.params.country);

    collection.find({'country':new RegExp(country, 'i')}).sort({isoDate:1}).toArray(function(err, items) {
        res.send(items);
    });
    
};

exports.delete = function (req, res, next) {
    let country = sanitize(req.params.country);

    collection.remove({'country':new RegExp(country, 'i')}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            //console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });

};

exports.findByGivenParams = function(req, res, next) {
	let country = sanitize(req.params.country),
        dateFrom = new Date(sanitize((req.params.dateFrom)).toString()),
        dateTo = new Date(sanitize((req.params.dateTo)).toString()),
        usrDateFrom = moment(dateFrom, 'YYYY-MM-DD').subtract(1, "days").format(),
		usrDateTo =  moment(dateTo, 'YYYY-MM-DD').add(1, "days").format();
        
        let image = {
            creationTimeStamp: 1,
            name: 1,
            base64: 0
        }

        collection.find({'country':new RegExp(country, 'i' ),
                        'isoDate':{$gte: usrDateFrom, $lte:usrDateTo}}, 
                        {englishName:1, country:1, isoDate: 1, _id: 1})
                        .sort({isoDate:1}).toArray(function(err, items) {
                            if (err) {
                                res.send({'error':'An error has occurred - ' + err});
                            } else {                
                                res.send(items);
                            }
        });
};

exports.getCountriesList = function(req, res, next) {

    collection.distinct('country', function(err, item) {
        res.send(item);
    });

};


exports.getImages = function(req, res, next) {
    let id = sanitize(req.params.id);

    collection.findOne({'_id': ObjectId(id)}, (function(err, items) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
                } else {                
                    res.send(items);
                }
        }));
   
};
