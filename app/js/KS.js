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