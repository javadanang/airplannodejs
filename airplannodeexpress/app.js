var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var mongoose = require('mongoose');
var app = express();

//write log to file
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))
// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

//set up handlebar view
var handlebars = require('express3-handlebars' )
    .create({ defaultLayout: 'main',helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
      },
      static: function(name) {
        return require('./lib/static.js').map(name);
      }
    } });
app. engine('handlebars' , handlebars. engine);
app. set('view engine' , 'handlebars' );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/airplane', function (error) {
  if (error) {
    console.log(error);
  }
});

app.use(function(req, res, next){
  res.locals.showTests = app. get('env' ) !== 'production' &&
      req. query. test === '1' ;
  next();
});

app.use('/', routes);
app.use('/users', users);

app.set('port',process.env.PORT || 3000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.render('404' );
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res. status(500);
    res. render('500' );
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console. error(err. stack);
  res. status(500);
  res. render('500' );
});

// set application lister port
app.listen(app. get('port' ), function(){
  console. log( 'Express started on http://localhost:' +
      app. get('port' ) + '; press Ctrl-C to terminate.' );

});

module.exports = app;
