'use strict';

var path = require('path');

exports.index = function(req, res) {
  res.render('index');
};
exports.example = function(req,res) {
	res.render('example');
}