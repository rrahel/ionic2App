var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    endpoints = require('./routes/data/index'),
    holidayslist    = require('./routes/holidayslist'),
    server = express(),
    MongoClient = require('mongodb').MongoClient;
    //config = require('./config.js');



  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, db) {
   
     if(err) throw err;
     //Write databse Insert/Update/Query code here..   
        db.collection('Persons', function (err, collection) {
            
            collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
            collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
            collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
            
            

            db.collection('Persons').count(function (err, count) {
                if (err) throw err;
                
                console.log('Total Rows: ' + count);
            });
        });         
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(methodOverride());    // simulate DELETE and PUT

    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    server.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    server.get('/api', endpoints.findAll);
    server.get('/api/:country', endpoints.findByCountry);
    server.get('/api/:country/:dateFrom/:dateTo', endpoints.findByGivenParams);
    //server.get('/api/search?country={country}&dateFrom={dateFrom}&dateTo={dateTo}', endpoints.findByGivenParams);

    //server.get('/holidayslist', holidayslist.findAll);
    //server.get('/holidayslist/:country', holidayslist.findByCountry);
    //server.get('/holidayslist/:country/:dateFrom/:dateTo', holidayslist.findByGivenParams);

    server.set('port', process.env.PORT || 3000);
    server.listen(server.get('port'), function () {
        console.log('Express server listening on port ' + server.get('port'));
    });
