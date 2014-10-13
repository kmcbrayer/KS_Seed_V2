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
    var material = new THREE.MeshBasicMaterial({
        'color' : boxProperties.color
      });
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(boxProperties.x,boxProperties.y,boxProperties.z);
    return cube;
  }
}