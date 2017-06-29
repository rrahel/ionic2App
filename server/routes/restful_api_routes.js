let moment = require('moment');
let sanitize = require('express-mongo-sanitize').sanitize;
let path = require('path');
let fs = require('fs');

let config = require("../config.json"),
    MongoClient = require('mongodb').MongoClient,
    dburl = `mongodb://${config.database.username}:${config.database.password}@ds123182.mlab.com:23182/holidaychecker-db`,
    db, collection, test;




MongoClient.connect(dburl, function (err, database) {
    if(err) throw err;
    db = database;

    db.collection('countries', function(err, countries) {
       collection = countries;
    });

    db.collection('test', function(err, collect) {
       test = collect;
    });
});

exports.getFirstPage = function(req,res){
    res.sendfile(path.join(__dirname + "/index.html"));
};

exports.findAll = function(req, res) {

    collection.find().toArray(function(err, items) {
        res.send(items);
    });
    
};

exports.findByCountry = function (req, res, next) {
    let country = sanitize(req.params.country);

    collection.find({'country':new RegExp(country, 'i')}).toArray(function(err, items) {
        res.send(items);
    });
    
};

exports.delete = function (req, res, next) {
    let country = sanitize(req.params.country);

    collection.remove({'country':new RegExp(country, 'i')}, {safe:true}, function(err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });

};

exports.findByGivenParams = function(req, res, next) {
	let country = sanitize(req.params.country),
        dateFrom = new Date(sanitize((req.params.dateFrom)).toString()),
        dateTo = new Date(sanitize((req.params.dateTo)).toString()),
        usrDateFrom = moment(dateFrom, 'YYYY-MM-DD').format(),
		usrDateTo =  moment(dateTo, 'YYYY-MM-DD').format();
        

        collection.find({'country':new RegExp(country, 'i' ),
                        'isoDate':{$gte: usrDateFrom, $lte:usrDateTo}}).toArray(function(err, items) {
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


//let imgDir = require('../images');
let img = path.join(__dirname + "/figure1.jpg");
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let express = require('express');
let schema = new Schema({
    img: { name: String, data: Buffer, contentType: String }
});

let A = mongoose.model('A', schema);

exports.getImages = function(req, res, next) {
    console.log(img);

    let a = new A;

    a.img.data = fs.readFileSync(img);
    a.img.contentType = 'image/jpg';
    a.img.name = 'figure1';
    test.save(function(error, a){
        if(err) throw err;
        a.image = a;
    });


     //var server = express.createServer();
   /* test.findById(a, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.img.contentType);
        res.send(doc.img.data);
    });*/


    /*fs.readFile(img, 'binary', function(err, original_data){
        fs.writeFile('img.jpeg', original_data, 'binary', function(err){});
        
        let base64img = new Buffer(original_data, 'binary').toString('base64');
        console.log(base64img);
        cosnole.log(base64img.length);

        let decodedImage = new Buffer(base64Image, 'base64').toString('binary');
        console.log("decodedImage:");
        console.log(decodedImage);
        fs.writeFile('image_decoded.jpg', decodedImage, 'binary', function(err) {});
    });*/

    

    /*collection.find(function (err, doc) {
        if (err) return next(err);
        
        let base64 = (doc[0].img.data.toString('base64'));
        res.send(base64);    

    });*/
   
};
