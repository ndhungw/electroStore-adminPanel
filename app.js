var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');
var handlebarsHelper = require('./controllers/HandlebarsHelper');

var database = require('./database');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter');

var app = express();

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

// //HandlebarsHelper
// Handlebars.registerHelper('createPagination',
// function (totalPage, currentPage){
//   let arr = '';
//   let i = 1;
//   while(i <= totalPage){
//     arr = arr.concat(`<li class="page-item ${i === currentPage ?'active' : ''}"><a class="page-link" href="/users/?page=${i}&limit=5">${i}</a></li>`);
//     i++;
//   }
//   let result = `<nav aria-label="Page navigation">
//   <ul class="pagination">
//     <li class="page-item ${currentPage - 1 < 1 ? 'disabled' : ''}"><a class="page-link" href="/users?page=${currentPage - 1}&limit=5">Previous</a></li>
//     ${arr}
//     <li class="page-item ${currentPage + 1 > totalPage ? 'disabled' : ''}"><a class="page-link" href="/users?page=${currentPage + 1}&limit=5">Next</a></li>
//   </ul>
// </nav>`;
//   console.log(result);
//   return result;
// }
// );
// //end HandlebarHelper

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
