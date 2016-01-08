
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var Users = require('../model/users');

// Inedex page
router.get('/', function(req, res, next) {

   console.log('inside index');
   // var cursor = Users.find();
   // cursor.each(function(err, doc) {
   //    console.log(doc);
   // })

   var data = utils.readFile(path.join(__dirname, '../public/data/dashboards.json'))
   var dashboards = JSON.parse(data);
   res.render('index', {
      dashboards: dashboards
   });

});

module.exports = router;
