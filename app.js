const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressHbs = require('express-handlebars');
const flash = require('connect-flash');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const handlebarsHelper = require('./controllers/HandlebarsHelper');
require('./database');

//Passport config
require('./config/passport')(passport);

const indexRouter = require('./routes/indexRouter');
const membersRouter = require('./routes/membersRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));//config Handlebars trong project

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
})); 

// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use( (req, res, next) => {
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Route
app.use('/', indexRouter);
app.use('/members', membersRouter)
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
