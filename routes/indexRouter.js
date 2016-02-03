var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    utils = require('./utils'),
    User = require('../model/user'),
    passport = require('passport'),
	 Credential = require('../model/credential');

// Login page
router.get('/',function(req, res, next) {
   res.render('index');
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('authToken');
	req.logout();
  	req.session.destroy();
	console.log("logged out successfully");
   res.send("success");
});

router.post('/login', passport.authenticate('local'),function(req, res){
	//authenticated successfully, send the authentication token
	res.cookie("authToken", JSON.stringify({"authToken": req.user._id, "name": req.user.name}));
	res.send("success");
});

function restisterUser (req, res, next) {
	Credential.register({ username : "wave1@wipro.com", name: "Wave 1"}, "abc@123", function(err, account) {
		console.log("added");
		next();
	});

//        passport.authenticate('local')(req, res, function () {
//          res.redirect('/');
//        });
	
}
module.exports = router;
