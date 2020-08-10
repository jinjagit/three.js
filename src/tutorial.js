import * as THREE from '../js/three.module.js';

const info = () => {
  console.log("vertices:");
  console.log(geometry.vertices);
  console.log("faces:");
  console.log(geometry.faces);
};

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Isocahedron: (radius, detail) detail 0 - 5, 6 iterations or more is a lot of vertices!
var geometry = new THREE.IcosahedronGeometry(1, 0);

//geometry.vertices[0] = new THREE.Vector3(-1.2, 1.5, 0);

info();

// create a material, color, or image texture
var material = new THREE.MeshNormalMaterial({color: 0xFFFFFF, wireframe: true});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 3;

// scene logic
var update = function() {
  cube.rotation.x += 0.0025;
  cube.rotation.y += 0.005;
};

// draw scene
var render = function() {
  renderer.render(scene, camera);
};

// run scene loop (update, render, repeat)
var Gameloop = function() {
  requestAnimationFrame(Gameloop);

  update();
  render();
};

Gameloop();