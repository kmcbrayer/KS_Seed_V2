'use strict';
// This file will have functions for getting and manipulating templates

exports.SetTemplate = function(template){
	if(typeof(template)=== 'string') {
		//if its a string we assume its a url, else it would be a Jquerry object
		var obj = ''
		$.ajax({
			url: template,
			async: false,
			success : function(res) {
				obj = res;
			}
		});
		return obj;
	} else {
		return template;
	}
}

exports.GetHTML = function(template){
	if (typeof(template) === 'string') {
		return template;
	} else {
		return template.html();
	}
}