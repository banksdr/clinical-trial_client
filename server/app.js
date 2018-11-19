"use strict";
var express = require('express');
var cors = require('cors');
var uuid = require('uuid');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var reportPDF = require('./utils/reportPDF');

var app = express();

app.options('*', cors());
app.use(cors());

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

reportPDF.setupReportPDF(app);

app.listen(5000, (err) => {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('Listening on port', 5000);
  }
});
