// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: [ 'env' ]
});

var createError = require('http-errors');
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('config');

var indexRouter = require('./routes/index');
var helloRouter = require('./routes/hello');
var loginRouter = require('./routes/user/login');
var registerRouter = require('./routes/user/register');
var updateRouter = require('./routes/user/update');
var updateLocationRouter = require('./routes/user/updateLocation');
var deleteRouter = require('./routes/user/delete');
var matchesRouter = require('./routes/user/matches');
var userRouter = require('./routes/user/index');

var app = express();
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

app.use('/', indexRouter);
app.use('/hello', helloRouter);
app.use('/user/login', loginRouter);
app.use('/user/register', registerRouter);
app.use('/user/update', updateRouter);
app.use('/user/updateLocation', updateLocationRouter);
app.use('/user/delete', deleteRouter);
app.use('/user/matches', matchesRouter);
app.use('/user', userRouter);

app.disable('etag');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var httpServer = http.createServer(app);

httpServer.listen(app.get('port'), function(){
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
