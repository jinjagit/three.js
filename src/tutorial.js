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

var geometry = new THREE.BoxGeometry(1, 1, 1);

//geometry.vertices[0] = new THREE.Vector3(-1.2, 1.5, 0);

info();

var cubeMaterials =
[
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat1.png'), side: THREE.DoubleSide}), // right side
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat2.png'), side: THREE.DoubleSide}), // left side
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat3.png'), side: THREE.DoubleSide}), // top side
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat4.png'), side: THREE.DoubleSide}), // bottom side
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat5.png'), side: THREE.DoubleSide}), // front side
  new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/pat6.png'), side: THREE.DoubleSide})  // back side
];

// create a material, color, or image texture
// MeshFaceMaterials deprecated? https://stackoverflow.com/questions/45429660/three-multimaterial-has-been-removed-use-an-array-instead
//var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, cubeMaterials);

scene.add(cube);

camera.position.z = 2;

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