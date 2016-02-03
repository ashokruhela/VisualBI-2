//Third party modules
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser');

//custom modules
var passport = require('./routes/passport'),
    indexRouter = require('./routes/indexRouter'),
    userRouter = require('./routes/userRouter'),
    widgetRouter = require('./routes/widgetRouter'),
	 dashboardRouter = require('./routes/dashboardRouter'),
    chartdataRouter = require('./routes/chartdataRouter'),
    dbConfig = require('./config/db'),
	 Credential = require('./model/credential'),
	 gridRouter = require('./routes/girdRouter');
   getUserId  = require('./routes/userId');
   getUserList = require('./routes/userList');
mongoose.connect(dbConfig.url);
var db = mongoose.connection;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser('keyboard cat'));
app.use(flash());

//initialize passort sessions
app.use(expressSession({
   secret: 'tobo',
   cookie: { maxAge: 360*5 },
   proxy: true,
   resave: true,
   saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/widgets', widgetRouter);
app.use('/chartdata', chartdataRouter);
app.use('/execute', gridRouter);
app.use('/getUserId', getUserId);
app.use('/getUserList', getUserList);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error('Not found');
   err.status = 404;
   next();
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
   app.use(function(err, req, res, next) {
		console.log("in error handler", err)
      res.status(err.status || 500);
      res.render('error', {
         message: "err.message",
         error: err
      })
   });
}

module.exports = app;
