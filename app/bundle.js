(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var drawObjs = require('./drawobjs.js');

module.exports = {
	ground: function(props){
		var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({
				'color': 0x991D4F
				}),
			.8, // high friction
			.3 // low restitution
		);
		var ground = new Physijs.BoxMesh(
			new THREE.BoxGeometry(100, 1, 100),
			ground_material,
			0 // mass
		);
		ground.receiveShadow = true;
		drawObjs.objs.push( ground );
	},
	init: function(scene,camera){
		scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
	  scene.addEventListener(
	      'update',
	      function() {
	        scene.simulate( undefined, 1 );
	      }
	    ); 

	  //controls
	  //var controls = new THREE.OrbitControls(camera,document.body);

	  //lights
	  var ambientLight = new THREE.AmbientLight( 0x101010 );
	  scene.add( ambientLight );

	  var light = new THREE.DirectionalLight( 0xFFFFFF );
	  light.position.set( 200, 400, -150 );
	  light.target.position.copy( scene.position );
	  light.castShadow = true;
	  
	  light.shadowBias = -.0001
	  light.shadowMapWidth = light.shadowMapHeight = 2048;
	  light.shadowDarkness = .7;
	  scene.add( light );
	}
}
},{"./drawobjs.js":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
    var material = new THREE.MeshLambertMaterial({
        'color' : boxProperties.color
      });
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(boxProperties.x,boxProperties.y,boxProperties.z);
    return cube;
  }
}
},{"./boxProperties.js":2}],4:[function(require,module,exports){
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
},{"./boxService.js":3,"./lineService.js":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict';

var lineProps = require("./lineProperties.js");

module.exports = {
  newLine: function(props){
    var lineProperties = new lineProps;
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
},{"./lineProperties.js":5}],7:[function(require,module,exports){
'use strict';

var sceneData = require('./scene.js');
var drawObjs = require('./drawobjs.js');
var KS = require('./KS.js');
var thirdPersonControls = require('./thirdPersonControls.js');

sceneData.init = function() {
  
  //worker scripts
  Physijs.scripts.worker = 'physijs_worker.js';
  Physijs.scripts.ammo = 'ammo.js';
  //renderer init
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  document.body.appendChild( renderer.domElement );

  //scene init
  var scene = new Physijs.Scene();
  var camera = new THREE.TargetCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
  KS.init(scene,camera);
  //--------PUT OBJS HERE -------------------

  KS.ground(); 
  //-------CHARACTRER-----------------------
  var char_mat = Physijs.createMaterial(
    new THREE.MeshLambertMaterial,
    .6,
    .3
    );
  var chara = new Physijs.BoxMesh(
    new THREE.BoxGeometry(5,5,5),
    char_mat
    );
  chara.position.set(0,5,0);
  
  //------TARGET CAMERA---------------
  camera.addTarget({
    name: 'myTarget',
    targetObject: chara,
    cameraPosition: new THREE.Vector3(0,20,-50),
    fixed: false,
    stiffness: 0.1,
    matchRotation: false
  });
  camera.setTarget('myTarget');
  scene.add(chara);
  //------THIRD PERSON CONTROLS--------
  thirdPersonControls(chara);


  //--------SCENE RENDERING HERE ------------
  for (var obj in drawObjs.objs){
    scene.add(drawObjs.objs[obj]);
  }
  function render() {
    scene.simulate();
    renderer.render( scene, camera );
    requestAnimationFrame( render );
    camera.update();
  }
  requestAnimationFrame( render );
};

window.SCENE = sceneData;
},{"./KS.js":1,"./drawobjs.js":4,"./scene.js":8,"./thirdPersonControls.js":9}],8:[function(require,module,exports){
'use strict';
 
module.exports = {VERSION: '0.1'};
},{}],9:[function(require,module,exports){
'use strict';

function moveForward(pl) {
  //need to find "foward"
  //then increase velocity in that direction
}

module.exports = function(pl) {
  console.log(pl._physijs)

  document.onkeydown = function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 87){
      //move forward
    }
    if(e.keyCode == 83){
      //move backward
    }
    if(e.keyCode == 68){
      //move forward
    }
    if(e.keyCode == 65){
      //move forward
    }
  }
}
},{}]},{},[1,2,3,4,5,6,7,8]);