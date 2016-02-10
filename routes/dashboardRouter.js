var express = require('express'),
    router = express.Router(),
    User = require('../config/db').userModel,
    Credential = require('../config/db').credentialModel;
	 utils = require('./utils');

//Checks wheather user is authenticated 
router.use(utils.isAuthenticated);

router.get('/userData', function(req, res, next) {
    var userid = req.user._id; //it contains _id value of user whose dashboard to be fetched
    if (userid) {
        User.getData(userid, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.get('/:userid/:dashboardId', function(req, res, next) {
    var userid = req.params.userid; //it contains _id value of credentials
    var dashId = req.params.dashboardId;
    if (userid) {
        User.getDashboard(userid, dashId, function(data) {
            res.json(data);
        });
    } else
        res.json({});
});

router.post('/shareDashboard', function(req, res, next) {
    var currentDashboard = req.body.currentDashboard;
    var userNames = req.body.userNames;
    var currentUserId = req.user._id;
    var currentUserName = req.user.name;
    var permission = req.body.permission;
    var usernameProcessed = 0;

    userNames.forEach(function(credentialObj) {
        User.getUserId(credentialObj._id, function(userObj) {
            if (userObj === null) {
                res.send(credentialObj.username + "'s document not present");
            } else {
                User.isExist(currentUserName, currentDashboard, userObj._id, permission, function(result) {
                    if (result == true) {
                        User.updatePermission(currentUserId, currentUserName, currentDashboard, userObj._id, permission);
                        console.log("updating permission");
                    } else {
                        console.log("not updating");
                        User.shareDashboard(currentUserId, currentUserName, currentDashboard, userObj._id, permission, function(result) {
                            User.sharedDashboards(currentUserId, credentialObj.name, credentialObj.username, currentDashboard);
                        });
                    }
                });


                usernameProcessed++;
                if (userNames.length == usernameProcessed)
                    res.send(true);
            }
        });
    });
});

router.post('/', function(req, res, next) {
    var userName = req.body.userName;
    var currentDashboard = req.body.currentDashboard;
    var currentUserName = req.user.name;
    var permission = req.body.permission;
    if (userName) {
        Credential.getCredentialId(userName, function(credentialId) {
            if (!credentialId) {
                res.send("Invalid user");
            } else {
                User.getUserId(credentialId._id, function(userId) {
                    if (userId === null) {
                        res.send(userName + "'s document not present");
                    } else {
                        User.isExist(currentUserName, currentDashboard, userId._id, permission, function(result) {
                            if (result == true)
                                res.send(userName + " already existing");
                            else {
                                res.send("can be shared");
                            }
                        });
                    }
                });
            }
        });
    }
});

router.post('/userList', function(req, res) {
    Credential.getUsers(function(data) {
        res.send(data);
    });
});

module.exports = router;
