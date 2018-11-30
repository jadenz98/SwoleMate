// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: ['env']
});

var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');

var bodyParser = require('body-parser');



// var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');
var loginRouter = require('./routes/user/login');
var registerRouter = require('./routes/user/register');
var updateRouter = require('./routes/user/update');
var updateLocationRouter = require('./routes/user/updateLocation');
var deleteRouter = require('./routes/user/delete');
var matchesRouter = require('./routes/user/matches');
var unmatchRouter = require('./routes/user/unmatch');
var conversationRouter = require('./routes/user/conversation');
var userRouter = require('./routes/user/index');
var nearbyUsersRouter = require('./routes/user/nearbyUsers');
var deleteEverythingRouter = require('./routes/user/deleteEverything');
var recoverPasswordRouter = require('./routes/user/recoverPassword');
var passwordChange = require('./routes/user/passwordChange');
var reportRouter = require('./routes/user/report');
var calendarRoute = require('./routes/user/calendar');
var updateCalendarRoute = require('./routes/user/updateCalendar');

var app = express();
app.get('/accountRecovery/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/accountRecover.html'));
    // console.log(res.body);
});
app.get('/success/', function(req, res) {});
app.set('port', 8000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (config.util.getEnv('NODE_ENV') !== 'test')
    app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '10gb' }));
app.use(bodyParser.urlencoded({ limit: "10gb", extended: true }))


app.use('/hello', helloRouter);
app.use('/user/login', loginRouter);
app.use('/user/register', registerRouter);
app.use('/user/update', updateRouter);
app.use('/user/updateLocation', updateLocationRouter);
app.use('/user/delete', deleteRouter);
app.use('/user/matches', matchesRouter);
app.use('/user/unmatch', unmatchRouter);
app.use('/user/conversation', conversationRouter);
app.use('/user/nearbyUsers', nearbyUsersRouter);
app.use('/user/deleteEverything', deleteEverythingRouter);
app.use('/user', userRouter);
app.use('/user/recoverPassword', recoverPasswordRouter);
app.use('/user/passwordChange', passwordChange);
app.use('/user/report', reportRouter);
app.use('/user/calendar', calendarRoute);
app.use('/user/updateCalendar', updateCalendarRoute);
app.disable('etag');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

var httpServer = http.createServer(app);

httpServer.listen(app.get('port'), function() {
    console.log('Server listing on port ' + app.get('port'));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
