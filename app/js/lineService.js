'use strict';

var lineProperties = require("./lineProperties.js");

module.exports = {
  newLine: function(props){
    console.log(lineProperties.init())
    lineProperties = lineProperties.init();
    for (var key in lineProperties){
      for (var k in props){
        if (k === key){
          lineProperties[key] = props[k];
        }
      }
    }
    
    var material = new THREE.LineBasicMaterial();
    var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( lineProperties.x1, lineProperties.y1, lineProperties.z1) );
    geometry.vertices.push( new THREE.Vector3( lineProperties.x2, lineProperties.y2, lineProperties.z2) );
    
    return new THREE.Line( geometry, material );
  }
}