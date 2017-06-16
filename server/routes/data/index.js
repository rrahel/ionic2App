var requireDir = require('require-dir');
var holidayslist = requireDir('./endpoints/');
//var moment = require('moment'); 
var url = require('url') ;


var jsonServer = require('json-server'),
    server = jsonServer.create();

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

exports.findAll = function (req, res, next) {
    //res.send(JSON.stringify(holidayslist));
    res.set({
    'Content-Type': 'application/json'
    });

    res.send(holidayslist);
};

exports.findByCountry = function (req, res, next) {
    var country = req.params.country,
        response = holidayslist[country];

        response.notices = '';
       /* response.forEach(function(element) {
            element.push({notices:{}});
        }, this);*/


    res.send(response);
};

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
			//smallerThan = compareDates(usrDateFrom, dateObj)
            //greaterThan = compareDates(usrDateTo, dateObj);			
	
		    return	inRange == true;
		    //return	(smallerThan == 0 || smallerThan == -1) && (greaterThan == 1 || greaterThan == -1);

	    }));	
    } else {
        res.send("There is no data for the given parameters!");
    }

    /*var country = url.parse(req.url).query.country;
    var dateFrom = req.query.dateFrom;
    var dateTo = req.query.dateTo;

    var response = holidayslist[country];


    res.send('Test' + country);*/

	
}

function compareDates(dateTimeA, dateTimeB) {
    var momentA = moment(dateTimeA).format("DD-MM-YYYY");
    var momentB = moment(dateTimeB).format("DD-MM-YYYY");

    if (momentA > momentB) return 1; //a > b
    else if (momentA < momentB) return -1; // a = b
    else return 0; // a < b
}