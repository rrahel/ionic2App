

exports.findByCountry = function (req, res, next) {
    var country = req.params.country;

	res.send( holidaysList.filter(function (el) {
		return el.country === country
	}));
};

exports.findByGivenParams = function(req, res, next) {
	var country = req.params.country;
	var dateFrom = req.params.dateFrom;
	var dateTo = req.params.dateTo;

	res.send(holidaysList.filter(function (el) {
		var dateObj = new Date(el.date).getTime(),
			usrDateFrom = new Date(dateFrom).getTime(),
			usrDateTo = new Date(dateTo).getTime(),
			inRange = dateObj >= usrDateFrom && dateObj <= usrDateTo;
	
		return	el.country === country && inRange == true
	}));	


}