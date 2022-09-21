import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import WebGL from './WebGLError.js';
import Piano from './Piano.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 120;

let piano = new Piano();

window.onload = function main() {
    if (!WebGL.isWebGLAvailable()) {
        const warning = WebGL.getWebGLErrorMessage();
        document.querySelector('.container-WebGL-error').appendChild(warning);
    } else {
        // main       
        // scene.add(new THREE.AxesHelper(4))
        scene.add(piano.getMesh());

        animate();
    }
};

function animate() {
    requestAnimationFrame(animate);

    orbitControls.update();

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener('keydown', (e) => {
    let key = e.key
    if (e.key === '¨') key = '^'
    if (e.key === '£') key = '$'
    if (e.key === '%') key = 'ù'
    if (e.key === 'µ') key = '*'
    let possibleInputs = ['capslock', 'a', 'q', 'z', 's', 'd', 'r', 'f', 't', 'g', 'y', 'h', 'j', 'i', 
                          'k', 'o', 'l', 'm', 'dead', 'ù', '$', '*', 'enter', 'shift'];   
    if (!possibleInputs.includes(e.key.toLocaleLowerCase())) return 
    else piano.playKey(e.key.toLocaleLowerCase())
});