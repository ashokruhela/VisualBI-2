var mongoose = require('mongoose'),
	 passportLocal = require('passport-local'),
	 passportLocalMongoose = require('passport-local-mongoose');

var CredentialSchema = mongoose.Schema({
   username: String,
   name: String,
	time: {type: Date, default: Date.now}
}, {strict: false});

//CredentialSchema.plugin(passportLocal);
CredentialSchema.plugin(passportLocalMongoose);

CredentialSchema.statics.registerUser =function(user) {
	return new Promise(function(resolve, reject) {
		var newUser = new CredentialSchema({username: user.username, name: user.name});
		CredentialSchema.register(newUser, user.password, function(err, account) {
			if(err)
				reject(err);
			else
				resolve(account);
		});
	});
};

CredentialSchema.statics.getUserId = function(username, callback){
  this.model('Credential')
		.findOne({
		'username': username
	}, {
		'_id': 1
	}).exec(function(err, data) {
			if(err){
				console.log(err);
			}
			callback(data);
	});
};

module.exports = mongoose.model("Credential", CredentialSchema);