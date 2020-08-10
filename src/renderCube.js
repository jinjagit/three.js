import * as THREE from '../js/three.module.js';

const renderCube = (() => {
  var camera, scene, renderer;
  var geometry, line, wireMaterial, meshMaterial, mesh, wireframe;

  let wire = false;

  const toggleWire = () => {
    if (wire == false) {
      wire = true;
      line.material.opacity = 1.0;
      mesh.material.opacity = 0.0;
    } else {
      wire = false;
      line.material.opacity = 0.0;
      mesh.material.opacity = 1.0;
    }
    return wire;
  }

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 0.5;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    wireframe = new THREE.WireframeGeometry( geometry );
    wireMaterial = new THREE.LineBasicMaterial( { color: 0x80e5ff } );

    line = new THREE.LineSegments( wireframe, wireMaterial );
    line.material.depthTest = false;
    line.material.opacity = 0.0;
    line.material.transparent = true;

    scene.add( line );

    meshMaterial = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, meshMaterial );
    mesh.material.opacity = 1.0;
    mesh.material.transparent = true;

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  }

  function animate() {
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    mesh.rotation.z += 0.015;
    line.rotation.x += 0.01;
    line.rotation.y += 0.02;
    line.rotation.z += 0.015;

    renderer.render( scene, camera );
  }

  return { toggleWire }
})();

export { renderCube }