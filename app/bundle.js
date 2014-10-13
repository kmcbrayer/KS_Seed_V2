(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Obj() {
  return {
    'x': 0,
    'y': 0,
    'z': 0,
    'height':1,
    'width':1,
    'depth':1,
    'color': 0x991D4F
  }
}

module.exports = Obj;
},{}],2:[function(require,module,exports){
'use strict';

var boxProps = require('./boxProperties.js');

module.exports = {
  newBox: function(props){
    var boxProperties = new boxProps;
    for (var key in boxProperties){
      for (var k in props){
        if (k === key){
          boxProperties[key] = props[k];
        }
      }
    }
    var geometry = new THREE.BoxGeometry(boxProperties.width,boxProperties.height,boxProperties.depth);
    var material = new THREE.MeshBasicMaterial({
        'color' : boxProperties.color
      });
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(boxProperties.x,boxProperties.y,boxProperties.z);
    return cube;
  }
}
},{"./boxProperties.js":1}],3:[function(require,module,exports){
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
},{"./boxService.js":2,"./lineService.js":5}],4:[function(require,module,exports){
'use strict';

function Obj() {
  return {
    'x1':-10,
    'y1':0,
    'z1':0,
    'x2':10,
    'y2':0,
    'z2':0,
    'color': "CCCCCC"
  }
}

module.exports = Obj;
},{}],5:[function(require,module,exports){
'use strict';

var lineProps = require("./lineProperties.js");

module.exports = {
  newLine: function(props){
    var lineProperties = new lineProps;
    console.log(lineProperties)
    for (var key in lineProperties){
      for (var k in props){
        if (k === key){
          lineProperties[key] = props[k];
        }
      }
    }
    
    var material = new THREE.LineBasicMaterial({
      'color' : lineProperties.color
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( lineProperties.x1, lineProperties.y1, lineProperties.z1) );
    geometry.vertices.push( new THREE.Vector3( lineProperties.x2, lineProperties.y2, lineProperties.z2) );
    
    return new THREE.Line( geometry, material );
  }
}
},{"./lineProperties.js":4}],6:[function(require,module,exports){
'use strict';

var sceneData = require('./scene.js');
var drawObjs = require('./drawobjs.js');

sceneData.init = function() {
  var geometry, material, mesh;

  sceneData.scene = new THREE.Scene();
  sceneData.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  sceneData.camera.position.z = 10;
  sceneData.camera.position.y = 3;
  sceneData.controls = new THREE.OrbitControls(sceneData.camera,document.body);
  //lights
  sceneData.scene.fog = new THREE.Fog( 0xffffff, 2000, 10000 );

  drawObjs.init({type:"Box"});
  drawObjs.init({type:"Line"});
  drawObjs.init({type:"Line",props:{
    "x1":0,"y1":-10,"x2":0,"y2":10
  }});
  drawObjs.init({type:"Line",props:{
    "x1":0,"z1":-10,"x2":0,"z2":10
  }});

  sceneData.renderer = new THREE.CanvasRenderer();
  sceneData.renderer.setClearColor( sceneData.scene.fog.color, 1 );
  sceneData.renderer.setSize( window.innerWidth, window.innerHeight );

  console.log(drawObjs.objs);
  for (var obj in drawObjs.objs){
    sceneData.scene.add(drawObjs.objs[obj]);
  }

  document.body.appendChild( sceneData.renderer.domElement );
};

sceneData.animate = function() {
  requestAnimationFrame( sceneData.animate );

  sceneData.renderer.render( sceneData.scene, sceneData.camera );
};

window.SCENE = sceneData;
},{"./drawobjs.js":3,"./scene.js":7}],7:[function(require,module,exports){
'use strict';
 
module.exports = {VERSION: '0.1'};
},{}]},{},[1,2,3,4,5,6,7]);