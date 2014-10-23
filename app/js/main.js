'use strict';

var sceneData = require('./scene.js');
var drawObjs = require('./drawobjs.js');
var KS = require('./KS.js');

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
  var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 1000 );
  KS.init(scene,camera);
  //--------PUT OBJS HERE -------------------

  KS.ground(); 



  //--------SCENE RENDERING HERE ------------
  for (var obj in drawObjs.objs){
    scene.add(drawObjs.objs[obj]);
  }
  function render() {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  }
  requestAnimationFrame( render );
  scene.simulate();
};

window.SCENE = sceneData;