'use strict';

function moveForward(pl) {
  var _vector = new THREE.Vector3(0,0,10);
  pl.setLinearVelocity(_vector);
}
function moveBackward(pl) {
  var _vector = new THREE.Vector3(0,0,-10);
  pl.setLinearVelocity(_vector);
}
function moveRight(pl) {
  var _vector = new THREE.Vector3(-10,0,0);
  pl.setLinearVelocity(_vector);
}
function moveLeft(pl) {
  var _vector = new THREE.Vector3(10,0,0);
  pl.setLinearVelocity(_vector);
}

module.exports = function(pl) {
  pl.rotation
  console.log(pl)
  document.onkeydown = function(e) {
    //chrome only keycodes
    if(e.keyCode == 87){
      moveForward(pl);
    }
    if(e.keyCode == 83){
      moveBackward(pl);
    }
    if(e.keyCode == 68){
      moveRight(pl);
    }
    if(e.keyCode == 65){
      moveLeft(pl);
    }
  }
  document.
}