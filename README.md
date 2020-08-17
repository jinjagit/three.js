# three.js

published at: https://jinjagit.github.io/three.js/

* [three.js on github](https://github.com/mrdoob/three.js/)  
* [three.js documentation ](https://threejs.org/docs/)  
* [basic three.js tutorials](https://www.youtube.com/playlist?list=PLRtjMdoYXLf6mvjCmrltvsD0j12ZQDMfE) 
* [nice perlin noise example](https://codepen.io/ya7gisa0/pen/vGJvWw)  
* [discussion of smooth shading & normals](https://stackoverflow.com/questions/43624693/computevertexnormals-doesnt-work-with-model-from-jsonloader) 
* [example of texture on each face](http://jsfiddle.net/9fy3j/1/)   
* [example of smoothing using vertex normals](https://codepen.io/Ni55aN/pen/zROmoe)  

### install in webpack node dir:
`$ npm install --save three`

### test example (from Three.js github readme):
Find `three.module.js` in `three` node dir, and copy to somewhere in project (e.g. `js/three.module.js`). This code should then produce a rotating cube in the browser:  
```
import * as THREE from 'js/three.module.js';

var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}
```

### useful commands:
* `$ npx webpack --watch`  
* `$ git subtree push --prefix dist origin gh-pages`  
* `$ php -S 127.0.0.1:8080` (from `dist` dir, to serve `index.html` to http://127.0.0.1:8080/)  