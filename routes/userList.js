var express = require('express'),
    router = express.Router(),
    Credential = require('../model/credential');

router.post('/',function(req,res){
  Credential.getUsers(function(data){
    res.send(data);
  });
});

module.exports = router;
