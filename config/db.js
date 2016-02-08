var mongoose = require('mongoose');
var visualdb = mongoose.connect("mongodb://localhost:27017/visualdb");
var studiodb = mongoose.createConnection("mongodb://localhost/visualBI"); //172.23.238.253

var connectionSchema = require('../model/connections');
var credentialSchema = require('../model/credential');
//var dbUtilsSchema = require('./model/dbUtils');
var userSchema = require('../model/user');
var widgetSchema = require('../model/widget');
var widgetWave1Schema = require('../model/widget_wave1')

module.exports = {
  credentialModel : mongoose.model('Credential',credentialSchema),
//  dbUtilsModel : mongoose.model('Config',dbUtilsSchema),
  userModel : mongoose.model('User',userSchema),
  widgetModel : mongoose.model('Widget', widgetSchema),
	widgetWave1Model : studiodb.model('Widget', widgetWave1Schema),
  connectionModel : studiodb.model('Connection',connectionSchema)

};


// module.exports = {
// //    url : 'mongodb://172.23.238.253:27017/visualdb',
// 	 url : 'mongodb://localhost:27017/visualdb'
// }
