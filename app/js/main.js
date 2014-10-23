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