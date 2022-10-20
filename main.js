import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusKnotGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial( { color:0x9018CD });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

//renderer.render(scene, camera);

function animate() {
  requestAnimationFrame( animate );
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;


  renderer.render( scene, camera );
}

animate()