import * as THREE from '../js/three.module.js';

const testCube = (() => {
  var camera, scene, renderer;
  var geometry, line, material, mesh, wireframe;

  let wire = false;

  const toggleWire = () => {
    if (wire == false) {
      wire = true;
      line.material.opacity = 1.0;
    } else {
      wire = false;
      line.material.opacity = 0.0;
    }
    return wire;
  }

  init();
  animate();

  function init(wire) {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 0.5;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    wireframe = new THREE.WireframeGeometry( geometry );

    line = new THREE.LineSegments( wireframe );
    line.material.depthTest = false;
    line.material.opacity = 0.0;
    line.material.transparent = true;

    scene.add( line );

    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );

    scene.add( mesh );

    
    //line.material.opacity = 0.25;

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  }


  function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    line.rotation.x += 0.01;
    line.rotation.y += 0.02;

    renderer.render( scene, camera );
  }

  return { toggleWire }
})();

export { testCube }