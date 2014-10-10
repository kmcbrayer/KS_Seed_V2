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

  drawObjs.init({type:"Box"});
  drawObjs.init({type:"Line"});
  drawObjs.init({type:"Line",props:{
    "x1":0,"y1":-10,"x2":0,"y2":10
  }});
  drawObjs.init({type:"Line",props:{
    "x1":0,"z1":-10,"x2":0,"z2":10
  }});

  sceneData.renderer = new THREE.CanvasRenderer();
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