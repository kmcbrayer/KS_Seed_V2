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