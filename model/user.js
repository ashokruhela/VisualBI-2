 var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	userid: { type: mongoose.Schema.ObjectId, ref: 'Credential' },
   preferences:[{
      _id: false,
      theme:String,
      showLegend: Boolean
   }],
   dashboards: [{
      sharedWith: [mongoose.Schema.Types.Mixed],
      tabs: [{tabTitle: String,
         tabId: String,
         rows: [{
				columns:[{
					colWidth: Number,
            	widgetId: {type: mongoose.Schema.ObjectId, ref: 'Widget'}
				}]
         }]
      }]
   }]
}, {strict: false});

UserSchema.statics.getDashboard = function (userid, callback) {
	this.model('User')
		.findOne({
		'userid': mongoose.Types.ObjectId(userid)
	}, {
		'_id': 0,
	}).populate('dashboards.tabs.rows.columns.widgetId')
		.exec(function(err, data) {
			var d={};
			if(data && data.dashboards)
					d = data.dashboards;
			callback(d);
	});
}

UserSchema.statics.setUserTheme=function(id, userTheme){
   this.model('User').update({
     'email' : id
   },{
     $set: {
       preferences:{
         theme:userTheme
       }
     }
   },function(err, userTheme) {
   });
}

UserSchema.statics.insertSharedWith = function(fromUserId,toUserId){
  this.model('User').update({_id: mongoose.Types.ObjectId(fromUserId)},
  {
    $pushAll:
    {
      "dashboards.0.sharedWith":[toUserId]
    }
  },
  {upsert:true},function(err){
        if(err){
                console.log(err);
        }else{
                console.log("Successfully added");
        }
});
};

UserSchema.statics.saveTab = function(userid, savetabs) {
  console.log("reached user savetab");
  console.log(userid);
  console.log(savetabs);

  this.model('User').update({
    'userid': userid
  },{
    $set: {
      dashboards:{
        tabs:savetabs
      }
    }
  },function(err, userTheme) {
    console.log("Error " + err);
  });


}

module.exports = mongoose.model("User", UserSchema);
