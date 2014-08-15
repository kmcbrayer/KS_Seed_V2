//KISS == Keep It Simple Stupid
//Models
var Model = kissModel = function(attrs){
  var self = this;

  if (attrs.url){self.url = attrs.url};
  if (attrs.data){self.data = attrs.data;}

  if (self.url){
    $.getJSON(self.url, function callback(result){
      self.set("data",result);
    }); 
  }
  //set data and trigger changes
  self.set = function(attr_name, val){
    if (attr_name=="data"){self.data = val}
    else{self.data[attr_name] = val;}
    if (self.view){self.view.load()}  
  }
  //set rest delete and save methods
  if (attrs.init){
    self.init = attrs.init;
    self.init();
  }
};
//Views
var View = kissView = function(attrs){
  var self = this;

  //adds a view parameter to the binded model
  if (attrs.model){self.model=attrs.model;self.model.view = self}
  if (attrs.el){self.el = attrs.el}
  if (attrs.template){self.template = attrs.template}
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
    var source = (attrs.source) ? attrs.source : self.template.html();
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
};