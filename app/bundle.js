(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//KISS == Keep It Simple Stupid
'use strict';

var tmpl = require('./tmplUtils');
//Models
exports.Model = function(attrs){
  var self = this;

  if (attrs.url){self.url = attrs.url};
  if (attrs.data){self.data = attrs.data;}

  if (self.url){
    $.getJSON(self.url, function(result){
      self.set("data",result);
    }); 
  }
  //set data and trigger changes
  self.set = function(attr_name, val){
    if (attr_name=="data"){self.data = val}
    else{self.data[attr_name] = val;}
    if (self.view){
      self.view.load()
    }  
  }
  return self;
};
//Views
exports.View = function(attrs){
  var self = this;

  //adds a view parameter to the binded model
  if (attrs.model){
    self.model = attrs.model;
    self.model.view = self;
  }
  if (attrs.el){self.el = attrs.el}
  if (attrs.template){
    self.template = tmpl.SetTemplate(attrs.template);
  }
  if (attrs.events){
    self.events = attrs.events;
    $.each(self.events,function(e,fxn){
      self.el.bind(e,fxn);
    });
  }
  else{self.events = {}}

  self.addEvents = function(eventsObj){
    $.each(eventsObj,function(e,fxn){
      self.events[e] = fxn;
      self.el.bind(e,fxn);
    });
  }
  self.load = function(attrs){
    //this is a hack for syntax purposes
    var attrs = (attrs) ? attrs : {};
    // end hack
    var data = (attrs.data) ? attrs.data : self.model.data;
    var source = (attrs.source) ? attrs.source : tmpl.GetHTML(self.template);
    var template = Handlebars.compile(source);
    self.el.html(template(data));
  };
  //2-way data binding??
  self.el.on("change",function(e){
    if(e.target.hasAttribute("data-bind")){
      self.model.set(
        e.target.getAttribute("data-bind"),
        e.target.value
      );
    }
  });
  //render
  self.load();
  return self;
};
},{"./tmplUtils":3}],2:[function(require,module,exports){
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
	template:'templates/tabTemplate.html'
	// or 
	//template:$("#tabTemplate")
});

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
},{"./kiss":1}],3:[function(require,module,exports){
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
},{}]},{},[1,2]);