var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    apiRoutes = require('./routes/restful_api_routes'),
    server = express(),
    MongoClient = require('mongodb').MongoClient,
    dburl = "mongodb://butjaa:admin@ds123182.mlab.com:23182/holidaychecker-db"

    MongoClient.connect(dburl, function (err, db) {

     if(err) throw err;

       // db.collection('countries', function (err, collection) {
          //collection.updateMany({},{$set: { "country": "Austria" }})
       // }); 
    });

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(methodOverride());

    server.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    server.get('/api', apiRoutes.findAll);
    server.get('/api/:country', apiRoutes.findByCountry);
    server.delete('/api/:country', apiRoutes.delete);
    //server.get('/api/:id', apiRoutes.findById);
    //server.post('/api', apiRoutes.add);
    //server.put('/api/:id', apiRoutes.update);
    server.get('/api/:country/:dateFrom/:dateTo', apiRoutes.findByGivenParams);
    //server.get('/api/search?country={country}&dateFrom={dateFrom}&dateTo={dateTo}', apiRoutes.findByGivenParams);


    server.set('port', process.env.PORT || 3000);
    server.listen(server.get('port'), function () {
        console.log('Express server listening on port ' + server.get('port'));
    });
