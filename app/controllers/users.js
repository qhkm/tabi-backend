var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(passport) {

    // get all users
    router.route('/users')
        .get(isLoggedIn, function(req, res) {
            User.find(function(err, users) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(users);
                }
            });
        });

    // PROFILE SECTION =========================
    router.route('/users/profile')
        .get(isLoggedIn, function(req, res) {
            // show logged in user profile
            res.json(req.user);
        });

    router.route('/users/edit')
        .put(isLoggedIn, function(req, res) {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.updated_at = Date.now();

            user.save(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json('User profile updated!');
                }
            });
        });

      // Superuser to modify user privilege
      router.route('/users/:user_id/profile')
      .get(isSuperUser, function(req, res){
        User.findById(req.params.user_id, function(err, user){
          if(err){
            res.send(err);
          }else{
            res.json(user);
          }
        });
      });

    router.route('/users/:user_id/set_privilege')
        .put(isSuperUser, function(req, res) {
          User.findById(req.params.user_id, function(err, user){
            if(user.id !== req.params.user_id){
              res.send(err);
            }else{
              user.privilege = req.body.privilege;
              user.updated_at = Date.now();

              user.save(function(err) {
                  if (err) {
                      res.send(err);
                  } else {
                      res.json('User privilege updated!');
                  }
              });
            }
          });
        });

    // LOGOUT ==============================
    router.route('/users/sign_out')
        .get(function(req, res) {
            req.logout();
            res.redirect('/api/v1/');
        });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    router.route('/users/sign_in')
        // Show sign in form
        .get(function(req, res) {
            res.json('This is a sign in page. Please sign in first!');
        })

        .post(passport.authenticate('local-login', {
            successRedirect: '/api/v1/users/profile', // redirect to the secure profile section
            failureRedirect: '/api/v1/error', // redirect back to the signup page if there is an error
        }));

    // SIGNUP =================================
    router.route('/users/sign_up')
        .post(passport.authenticate('local-signup', {
            successRedirect: '/api/v1/users/profile', // redirect to the secure profile section
            failureRedirect: '/api/v1/error', // redirect back to the signup page if there is an error
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
    return router;
}

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/api/v1/users/sign_in');
}

function isSuperUser(req, res, next) {
    if (req.user.privilege == 'Superuser') {
        return next();
    } else {
        res.json('You are not authorized!');
        res.redirect('/api/v1/');
    }
}

function isAdmin(req, res, next) {
    if (req.user.privilege == 'Admin') {
        return next();
    } else {
        res.json('You are not authorized!');
        res.redirect('/api/v1/');
    }
}
