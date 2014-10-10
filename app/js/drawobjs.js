'use strict';

var boxService = require('./boxService.js');
var lineService = require('./lineService.js');

module.exports = {
  objs : [],
  init : function(options){
    if (options.type === 'Box'){
        this.objs.push(boxService.newBox(options.props));
      }
      if (options.type === 'Line'){
        this.objs.push(lineService.newLine(options.props));
      }
      if (options.type === 'Triangle'){
        this.objs.push(triangleService.newTriangle(options.props));
      }
      if (options.type === 'Plane'){
        this.objs.push(planeService.newPlane(options.props));
      }
      if (options.type === 'Text'){
        this.objs.push(textService.newText(options.text,options.props));
      }
  }
}