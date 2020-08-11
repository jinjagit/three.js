import * as THREE from '../js/three.module.js';

const renderCube = (() => {
  var camera, scene, renderer;
  var geometry, material, mesh, wireframe;

  let wire = false;

  const toggleWire = () => {
    (wire == false) ? wire = true : wire = false;

    mesh.material.wireframe = wire;
    return wire;
  }

  const windowDimensions = () => {
    return {width: window.innerWidth, height: window.innerHeight};
  };

  init();
  animate();

  function init() {
    let win = windowDimensions();

    camera = new THREE.PerspectiveCamera( 70, win.width / win.height, 0.01, 10 );
    camera.position.z = 0.5;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    mesh.material.opacity = 1.0;
    mesh.material.transparent = true;

    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( win.width, win.height );
    document.body.appendChild( renderer.domElement );

    window.addEventListener('resize', function (){
      let win = windowDimensions();
      renderer.setSize(win.width, win.height);
      camera.aspect = win.width / win.height;
      camera.updateProjectionMatrix();
    });
  }

  function animate() {
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );
  }

  return { toggleWire }
})();

export { renderCube }