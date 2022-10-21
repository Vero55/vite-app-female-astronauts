import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

// Torus

const geometry = new THREE.TorusGeometry( 10, 3, 16, 60);
const material = new THREE.MeshNormalMaterial( { color:0x978B8B, wireframe: true });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5,5,5);
const ambientLight = new THREE.AmbientLight(0xDECA8E);
ambientLight.position.set(10,10,10);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xDECA8E });
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x, y, z);
  scene.add(star)
}
Array(300).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load('sky.jpg');
scene.background = spaceTexture;

// Avatar

const veronikaTexture = new THREE.TextureLoader().load('Veronika.jpeg');

const veronika = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: veronikaTexture }));

scene.add(veronika);

function animate() {
  requestAnimationFrame( animate );
  
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  
  controls.update();

  renderer.render( scene, camera );
}

animate()
