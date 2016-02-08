//This files contains method which interact with database. All logic should be written here so that
//unit test cases can be written for all db interaction

var mongoose = require('mongoose'),
	 User = require('../config/db').userModel,
	 Credential = require('../config/db').credentialModel;

//Registers a user. It creates an entry into Credential collection. It also adds one template 
//in User collection for dashboard
this.registerUser = function (user, done) {
	Credential.register({
		username : user.username,
		name: user.firstName + ' ' + user.lastName,
		imagePath: user.imagePath}, user.password, function(err, account) {
		if(err) {
			done(err, 'failed')
		} else {
			//make an entry in user collection for new user
			var newUser = new User({
				userid: account._id,
				preferences: [ { theme: 'normal', showLegent: true}],
				dashboards: [{
					_id: mongoose.Types.ObjectId(),
					displayName: "myDashboard",
					sharedWith: [],
					tabs: []
				}],
				sharedDashboards: []
			});
			newUser.save(function(err) {
				if(err) done(err, 'failed');
				else done(null, account);
			});
		}
	});
}


module.exports = this;
