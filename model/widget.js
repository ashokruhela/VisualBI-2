var mongoose = require('mongoose');


var WidgetSchema = mongoose.Schema({
   title: String,
   chartRenderer: String,
   url: String,
   lastCommentedBy : String,
   commentsCounter :Number,
   comments:[{
	  _id : false,
      userid: String,//{ type: mongoose.Schema.ObjectId, ref: 'Credential' },
      comment: String,
      datetime:{type:Date, default: Date.Now},
	  badgeClass: String,
	  badgeIconClass: String
   }],
  commenters:[{commenter:String}],
  commentersCounter : Number
}, {strict: false});

var widgetProto = function(studio_id, title,chartRenderer,parameters) {
  this.studio_id = studio_id;
  this.title = title;
  this.chartRenderer = chartRenderer;
  this.url = "";
  this.commentersCounter = 0;
  this.comments = [];
  this.commenters = [];
  this.commentsCounter = 0;
  this.lastCommentedBy = "";
  this.parameters = parameters;
}

WidgetSchema.statics.getWidgets = function(callback) {
   this.model('Widget').find({}, function(err, data) {
      callback(data);
   })
}

WidgetSchema.statics.getWidget = function (widgetId, callback) {
   this.model('Widget').findOne({
      'widgetId': widgetId
   }, {
      '_id': 0
   },function(err, data) {
      callback(data);
   });
}

WidgetSchema.statics.getCommenters = function(widgetId,callback) {
   this.model('Widget').find({
	   '_id': widgetId
   }, {
      '_id': 0,
	   commenters: []
   },function(err, data) {
     callback(data);
   });
}

WidgetSchema.statics.saveWidget = function(userId, tabs, tabIndex,User) {
  var savewidget = tabs[tabIndex];
  var rowLen = savewidget.rows.length;
  var widgetArray = [];

  for (var i = 0; i < rowLen; i++) {
    var colLen = savewidget.rows[i].columns.length;
    for (var j = 0; j < colLen; j++) {

      var title = savewidget.rows[i].columns[j].widgetId.widgetName;
      var studio_id = savewidget.rows[i].columns[j].widgetId._id;
      var chartRenderer = "executeQueryService";
      var params = {
        "catalog" : savewidget.rows[i].columns[j].widgetId.connectionData.catalog,
        "dataSource" : savewidget.rows[i].columns[j].widgetId.connectionData.dataSource,
        "connId" : savewidget.rows[i].columns[j].widgetId.connectionData.connectionId,
        "statement" : savewidget.rows[i].columns[j].widgetId.queryMDX
      };
      var studioWidget = new widgetProto(studio_id, title, chartRenderer, params);
      widgetArray.push(studioWidget);
    }
  }

  this.model('Widget').collection.insert(widgetArray,function(err,data) {
    var insertCount = data.insertedCount;
    var insertedData = data.ops;
    var rowLen = savewidget.rows.length;
    for (var i = 0; i < rowLen; i++) {
      var colLen = savewidget.rows[i].columns.length;
      for (var j = 0; j < colLen; j++) {
        var studio_id = savewidget.rows[i].columns[j].widgetId._id;
        for(var k=0; k<insertCount; k++) {
          if(studio_id === insertedData[k].studio_id) {
            savewidget.rows[i].columns[j].widgetId = insertedData[k]._id;//mongoose.Types.ObjectId(insertedData[k]._id);
            break;
          }
        }
      }
    }
    tabs[tabIndex] = savewidget;

    User.saveTab(userId, tabs);
  })
}

WidgetSchema.statics.updateCommenterDetails=function(widgetId,userid,callback){

   this.model('Widget').update({
     '_id' : widgetId
   },{$push:{
         commenters : {commenter:userid}
     }
   },function(err) {
       if(err){
                console.log(err);
       }
   });


   this.model('Widget').update({'_id' : widgetId},{$inc : { commentersCounter : 1 }},function(err) {
       if(err){
                console.log(err);
       }
   });
}

WidgetSchema.statics.postComment=function(userid,widgetId,userComment,commentClass,commentCategory){
   this.model('Widget').update({
     '_id' : widgetId
   },{
     $push: {
         comments:{userid : userid,
                   comment : userComment,
                   datetime : new Date(),//{type:Date, default: Date.Now},
				   badgeClass : commentCategory,
				   badgeIconClass:commentClass,
				   _id:0
				  }
     }
   },function(err, userComment) {
       if(err){

                console.log(err);
       }
   });

   this.model('Widget').update({
     '_id' : widgetId
   },{$set:{
         lastCommentedBy : userid
     }
   },function(err, userComment) {
       if(err){
                console.log(err);
       }
   });


   this.model('Widget').update({'_id' : widgetId},{$inc : { commentsCounter : 1 }},function(err, userComment) {
       if(err){
                console.log(err);
       }
   });

}
// mongoose.model("Widget", WidgetSchema);
module.exports = WidgetSchema;
