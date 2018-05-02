// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var displayApi 	 = require('express-routemap');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {useMongoClient: true}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'mysecretissecret', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
var routeUsers = require('./app/controllers/users')(passport);
var routeCompanies = require('./app/controllers/companies');
var routeAddresses = require('./app/controllers/addresses');
var routePackages = require('./app/controllers/packages');
var routeReservations = require('./app/controllers/reservations');
var routeReviews = require('./app/controllers/reviews');

app.use('/api/v1', routeUsers);
app.use('/api/v1', routeCompanies);
app.use('/api/v1', routeAddresses);
app.use('/api/v1', routePackages);
app.use('/api/v1', routeReservations);
app.use('/api/v1', routeReviews);

// launch ======================================================================
app.listen(port);

displayApi(app);
