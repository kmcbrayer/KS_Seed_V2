'use strict';

//var scene = require('scene');

window.SCENE = {VERSION: '0.1'};

SCENE.init = function() {
  SCENE.scene = new THREE.Scene();
  SCENE.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  SCENE.camera.position.z = 1000;

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  SCENE.scene.add( mesh );

  SCENE.renderer = new THREE.CanvasRenderer();
  SCENE.renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( SCENE.renderer.domElement );
}