var express = require('express');
var router = express.Router();

// normal routes ===============================================================
router.route('/')
    // Home page
    .get(function(req, res) {
        res.json('Welcome to home page! Where you will be heart broken and GTR is the only bae')
    });

router.route('/error')
    // Error page
    .get(function(req, res) {
        res.json('Opps!!! Error! You have been friendzoned! Try again!');
    });

router.route('/profile')
    // PROFILE SECTION =========================
    .get(isLoggedIn, function(req, res) {
        // show logged in user profile
        res.json(req.user);
    });

router.route('/logout')
    // LOGOUT ==============================
    .get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

// locally --------------------------------
// LOGIN ===============================
router.route('/login')
    .post(passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/error', // redirect back to the signup page if there is an error
    }));

// SIGNUP =================================
router.route('/signup')
    .post(passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/error', // redirect back to the signup page if there is an error
    }));

// facebook -------------------------------

// send to facebook to do the authentication
// app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

// handle the callback after facebook has authenticated the user
//app.get('/auth/facebook/callback',
//    passport.authenticate('facebook', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));

// twitter --------------------------------

// send to twitter to do the authentication
//app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

// handle the callback after twitter has authenticated the user
//app.get('/auth/twitter/callback',
//    passport.authenticate('twitter', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));


// google ---------------------------------

// send to google to do the authentication
//app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
//app.get('/auth/google/callback',
//    passport.authenticate('google', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

// locally --------------------------------
//    app.post('/connect/local', passport.authenticate('local-signup', {
//        successRedirect : '/profile', // redirect to the secure profile section
//        failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
//    }));

// facebook -------------------------------

// send to facebook to do the authentication
//app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

// handle the callback after facebook has authorized the user
//app.get('/connect/facebook/callback',
//    passport.authorize('facebook', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));

// twitter --------------------------------

// send to twitter to do the authentication
//app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

// handle the callback after twitter has authorized the user
//app.get('/connect/twitter/callback',
//    passport.authorize('twitter', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));


// google ---------------------------------

// send to google to do the authentication
//app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

// the callback after google has authorized the user
//app.get('/connect/google/callback',
//    passport.authorize('google', {
//        successRedirect : '/profile',
//        failureRedirect : '/'
//    }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

// local -----------------------------------
//app.get('/unlink/local', isLoggedIn, function(req, res) {
//    var user            = req.user;
//    user.local.email    = undefined;
//    user.local.password = undefined;
//    user.save(function(err) {
//        res.redirect('/profile');
//    });
//});

// facebook -------------------------------
//app.get('/unlink/facebook', isLoggedIn, function(req, res) {
//    var user            = req.user;
//    user.facebook.token = undefined;
//    user.save(function(err) {
//        res.redirect('/profile');
//    });
//});

// twitter --------------------------------
//app.get('/unlink/twitter', isLoggedIn, function(req, res) {
//    var user           = req.user;
//    user.twitter.token = undefined;
//    user.save(function(err) {
//        res.redirect('/profile');
//    });
//});

// google ---------------------------------
//app.get('/unlink/google', isLoggedIn, function(req, res) {
//    var user          = req.user;
//    user.google.token = undefined;
//    user.save(function(err) {
//        res.redirect('/profile');
//    });
//});

module.exports = router;

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
