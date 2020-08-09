import * as THREE from '../js/three.module.js';

const testCube = () => {
  var camera, scene, renderer;
  var geometry, material, mesh, wireframe;

  let wire = false;

  init(wire);
  animate();

  function init(wire) {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 0.5;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    if (wire == true) {
      wireframe = new THREE.WireframeGeometry( geometry );

      mesh = new THREE.LineSegments( wireframe );
      mesh.material.depthTest = false;
      mesh.material.opacity = 0.25;
      mesh.material.transparent = true;
    } else {
      material = new THREE.MeshNormalMaterial();

      mesh = new THREE.Mesh( geometry, material );
    }

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
};

export { testCube }