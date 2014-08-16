'use strict';

var ks = require('./kiss');

var tabModel = ks.Model({
	data:{
		tabList:["aww","javascript","pics"],
		current:"aww"
	}
});

var tabView = ks.View({
	model:tabModel,
	el:$("#tabNav"),
	template:$("#tabTemplate")
})

tabView.addEvents({
	"click": function(e){
		tabView.model.set("current",e.target.innerHTML)
	}
});

var myModel = ks.Model({
	/*
	data:{
		name: "kevin",
		spelling: "bad"
	}
	----or use url-----
	*/
	url:"http://www.reddit.com/r/aww/.json?jsonp=?"
});

var myView = ks.View({
	model:myModel,
	el:$('#divEl'),
	template: $('#divTemplate'),
	events:{
		'click':function(){}
	}
});

var inputModel = ks.Model({
	data:{
		inputData: "first_time"//cant be spaces for input fields??
	}
});

var inputView = ks.View({
	model:inputModel,
	el:$("#inputForm"),
	template:$("#inputTemplate"),
});