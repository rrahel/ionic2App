let express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    apiRoutes = require('./routes/restful_api_routes'),
    server = express(),
    config = require("./config"),
    MongoClient = require('mongodb').MongoClient,
    dburl = `mongodb://${config.database.username}:${config.database.password}@ds123182.mlab.com:23182/holidaychecker-db`,
    moment = require('moment'),
    fs = require('fs'),  
    http = require('http'),
    path = require('path'); 

  //  MongoClient.connect(dburl, function (err, db) {

   //  if(err) throw err;
    
  /* db.collection('countries', function(err, collection) {
      /* collection.updateMany({},{$set: { "image": {
                                            "creationTimeStamp": "",
                                            "name": "",
                                            "base64": "",
                                            "type": ""
                                    } }});*/
       // collection.updateMany({},{$set: { "country": "China" }})
       // collection.updateMany({},{$set: { "description": "" }})
    /* collection.find().snapshot().forEach(
         function (e) {

         //   var ddate = e.date.day + '-' + e.date.month + '-' + e.date.year;

            //e.image.creationTimeStamp = moment().format();
            //e.image.name = "defaultImage";
            //e.image.type = "png";
           // var x = moment(e.date, 'DD-MM-YYYY').format();
            //e.isoDate = x;
            delete e.date;
            // save the updated document
            collection.save(e);
            }
   )});*/
  //  });


    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(methodOverride());

    server.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        next();
    });

    server.get('/', apiRoutes.getFirstPage);
    server.get('/api', apiRoutes.findAll);
    server.get('/api/countries', apiRoutes.getCountriesList);
    server.get('/api/:country', apiRoutes.findByCountry);
    server.delete('/api/:country', apiRoutes.delete);
    //server.get('/api/:id', apiRoutes.findById);
    //server.post('/api', apiRoutes.add);
    //server.put('/api/:id', apiRoutes.update);
    server.get('/api/:country/:dateFrom/:dateTo', apiRoutes.findByGivenParams);
    server.get('/api/event-details/:id', apiRoutes.getImages);

    server.set('port', process.env.PORT || 3000);
    server.listen(server.get('port'), function () {
        //console.log('Express server listening on port ' + server.get('port'));
    });
