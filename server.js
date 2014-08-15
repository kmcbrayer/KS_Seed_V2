'use strict';

// Module dependencies.
var express = require('express');

//init app
var app = express()
require('./lib/config/express')(app);

//controllers
var index = require('./lib/controllers');

//routes
app.get('/*',index.index);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;