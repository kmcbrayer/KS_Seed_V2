(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';
 
module.exports = function() {
  return new THREE.Scene();
}
},{}]},{},[1,2]);