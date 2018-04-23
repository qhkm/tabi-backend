module.exports = function(app, passport){
	var routerUsers = require('./controllers/users')(passport);
	var routerCompanies = require('./controllers/companies');
	var routerPackages = require('./controllers/packages');
	var routerReservations = require('./controllers/reservations');
	var routerReviews = require('./controllers/reviews');
	var routerAddresses = require('./controllers/addresses');

	app.use('/api/v1', 
		routerUsers,
		routerCompanies,
		routerPackages,
		routerReservations,
		routerReviews,
		routerAddresses
	);
}
