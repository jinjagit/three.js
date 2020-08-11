import * as THREE from 'three/build/three.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const info = () => {
  console.log("vertices:");
  console.log(geometry.vertices);
  console.log("faces:");
  console.log(geometry.faces);
};

const windowDimensions = () => {
  return {width: window.innerWidth, height: window.innerHeight};
};

let win = windowDimensions();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, win.width / win.height, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(win.width, win.height);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function (){
  let win = windowDimensions();
  renderer.setSize(win.width, win.height);
  camera.aspect = win.width / win.height;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);

// Icosahedron: (radius, detail) detail 0 - 5, 6 iterations or more is a lot of vertices!
var geometry = new THREE.IcosahedronGeometry(1, 3);

//geometry.vertices[0] = new THREE.Vector3(-1.2, 1.5, 0);

info();

// create a material, color, or image texture
var material = new THREE.MeshNormalMaterial({color: 0xFFFFFF, wireframe: true});
var icosahedron = new THREE.Mesh(geometry, material);

scene.add(icosahedron);

camera.position.z = 3;

// scene logic
var update = function() {
  icosahedron.rotation.x += 0.0025;
  icosahedron.rotation.y += 0.005;
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