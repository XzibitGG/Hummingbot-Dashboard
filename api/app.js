var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

let indexRouter = require('./routes/index');
let botInstanceRouter = require("./routes/bot-instance");
let shrimpyNodeRouter = require("./routes/shrimpy-node");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use("/botInstance", botInstanceRouter);
app.use("/shrimpyNode", shrimpyNodeRouter);

module.exports = app;
