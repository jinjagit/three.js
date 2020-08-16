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

var geometry = new THREE.BoxGeometry(2, 2, 2);

//geometry.vertices[0] = new THREE.Vector3(-1.2, 1.5, 0);

info();

// MeshBasicMaterial is not affected by lighting, but also does nto require lighting
// MeshPhongMaterial == glossy, MeshLambertMaterial == matte

var cubeMaterials =
[
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat1.png'), side: THREE.DoubleSide}), // right side
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/pat2.png'), side: THREE.DoubleSide}), // left side
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat3.png'), side: THREE.DoubleSide}), // top side
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/pat4.png'), side: THREE.DoubleSide}), // bottom side
  new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat5.png'), side: THREE.DoubleSide}), // front side
  new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/pat6.png'), side: THREE.DoubleSide})  // back side
];

// create a material, color, or image texture
// MeshFaceMaterials deprecated? https://stackoverflow.com/questions/45429660/three-multimaterial-has-been-removed-use-an-array-instead
//var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh(geometry, cubeMaterials);

scene.add(cube);

camera.position.z = 9;

// lighting
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
scene.add(ambientLight);

var pointLight1 = new THREE.PointLight(0xFF0040, 1.5, 50); // (color, intensity, range)
scene.add(pointLight1);

var pointLight2 = new THREE.PointLight(0x0040FF, 1.5, 50); // (color, intensity, range)
scene.add(pointLight2);

var pointLight3 = new THREE.PointLight(0x80FF80, 1.5, 50); // (color, intensity, range)
scene.add(pointLight3);

var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
directionalLight.position.set(0, 1, 0);
//scene.add(directionalLight);

var spotLight = new THREE.SpotLight(0xFFFFFF, 1);
spotLight.position.set(5, 4, 5);
scene.add(spotLight);

// scene logic
var update = function() {
  cube.rotation.x += 0.0025;
  cube.rotation.y += 0.005;

  var time = Date.now() * 0.0005;
  pointLight1.position.x = Math.sin(time * 0.7) * 30;
  pointLight1.position.y = Math.cos(time * 0.5) * 40;
  pointLight1.position.z = Math.cos(time * 0.3) * 30;

  pointLight2.position.x = Math.cos(time * 0.3) * 30;
  pointLight2.position.y = Math.sin(time * 0.5) * 40;
  pointLight2.position.z = Math.sin(time * 0.7) * 30;

  pointLight3.position.x = Math.sin(time * 0.7) * 30;
  pointLight3.position.y = Math.cos(time * 0.3) * 40;
  pointLight3.position.z = Math.sin(time * 0.5) * 30;
};

// add some 3d stuuf to simulate walls, floor & ceiling (to test lighting)
var floorGeometry = new THREE.CubeGeometry(10, 0.2, 10);
var floorMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat3.png'), side: THREE.DoubleSide})
var floorCube = new THREE.Mesh(floorGeometry, floorMaterial);
floorCube.position.y = -5;
scene.add(floorCube);

var ceilingCube = new THREE.Mesh(floorGeometry, floorMaterial);
ceilingCube.position.y = 5;
scene.add(ceilingCube);

var wallGeometry = new THREE.CubeGeometry(0.2, 10, 10);
var wallMaterial = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat6.png'), side: THREE.DoubleSide})
var wallLeftCube = new THREE.Mesh(wallGeometry, wallMaterial);
wallLeftCube.position.x = -5;
scene.add(wallLeftCube);

var wallRightCube = new THREE.Mesh(wallGeometry, wallMaterial);
wallRightCube.position.x = 5;
scene.add(wallRightCube);

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