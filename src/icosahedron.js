import * as THREE from 'three/build/three.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const info = () => {
  console.log("vertices:");
  console.log(geometry.vertices);
  console.log("faces:");
  console.log(geometry.faces);
  console.log("materials:");
  console.log(materials);
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
var geometry = new THREE.IcosahedronGeometry(1, 0);

//geometry.vertices[0] = new THREE.Vector3(-1.2, 1.5, 0);



var material = new THREE.MeshLambertMaterial({map: new THREE.TextureLoader().load('img/pat4.png'), side: THREE.DoubleSide, flatShading: false});

var materials = [];

geometry.faceVertexUvs[0] = [];
for(var i = 0; i < geometry.faces.length; i++){      
  geometry.faceVertexUvs[0].push([
  new THREE.Vector2( 0,0 ),
  new THREE.Vector2( 0,1 ),
  new THREE.Vector2( 1,1),
  ]);

  geometry.faces[i].materialIndex = i;
  materials.push(material);
}

info();

geometry.computeFaceNormals();
geometry.dynamic = true;
geometry.uvsNeedUpdate = true;

// create a material, color, or image texture
var icosahedron = new THREE.Mesh(geometry, materials);

icosahedron.material.flatShading = false;


icosahedron.geometry.computeVertexNormals(true);
icosahedron.material.shading = THREE.SmoothShading;

scene.add(icosahedron);

camera.position.z = 3;

// lighting
var ambientLight = new THREE.AmbientLight(0x66ccff, 0.15);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0x66ccff, 1.0);
directionalLight.position.set(1, 1, 0.5);
scene.add(directionalLight);

var directionalLight2 = new THREE.DirectionalLight(0xff6699, 0.1);
directionalLight2.position.set(-1, -1, 0.5);
scene.add(directionalLight2);

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