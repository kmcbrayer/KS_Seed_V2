'use strict';

var sceneData = require('./scene.js');

sceneData.init = function() {
  var geometry, material, mesh;

  sceneData.scene = new THREE.Scene();
  sceneData.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  sceneData.camera.position.z = 1000;

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  sceneData.scene.add( mesh );

  sceneData.renderer = new THREE.CanvasRenderer();
  sceneData.renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( sceneData.renderer.domElement );
};

sceneData.animate = function() {
  requestAnimationFrame( sceneData.animate );
  sceneData.renderer.render( sceneData.scene, sceneData.camera );
};

window.SCENE = sceneData;