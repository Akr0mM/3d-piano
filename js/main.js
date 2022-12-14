import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import WebGL from './WebGLError.js';
import Piano from './Piano.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const orbitControls = new OrbitControls(camera, renderer.domElement);
const stats = Stats();
const gui = new dat.GUI()

camera.position.z = 120;

let piano = new Piano(gui);

window.onload = function main() {
    if (!WebGL.isWebGLAvailable()) {
        const warning = WebGL.getWebGLErrorMessage();
        document.querySelector('.container-WebGL-error').appendChild(warning);
    } else {
        // main       
        // scene.add(new THREE.AxesHelper(4))
        document.body.appendChild(stats.dom);

        // ambient light which is for the whole scene
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        scene.add(ambientLight);

        // spot light which is illuminating the chart directly
        let spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);

        scene.add(piano.getMesh());

        // gui
        const cameraFolder = gui.addFolder('Camera')
        cameraFolder.add(camera.position, 'z', 0, 999, 1).name('Z position')
        cameraFolder.open()

        animate();
    }
};

function animate() {
    requestAnimationFrame(animate);

    orbitControls.update();
    stats.update();

    renderer.render(scene, camera);
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    let key = e.key;
    if (e.key === '??') key = '$';
    if (e.key === '%') key = '??';
    if (e.key === '??') key = '*';
    let possibleInputs = ['capslock', 'a', 'q', 'z', 's', 'd', 'r', 'f', 't', 'g', 'y', 'h', 'j', 'i',
        'k', 'o', 'l', 'm', 'dead', '??', '$', '*', 'enter', 'shift'];
    if (!possibleInputs.includes(key.toLocaleLowerCase())) return;
    else piano.playKey(key.toLocaleLowerCase());

});

window.addEventListener('keyup', (e) => {
    let key = e.key;
    if (e.key === '??') key = '$';
    if (e.key === '%') key = '??';
    if (e.key === '??') key = '*';
    let possibleInputs = ['capslock', 'a', 'q', 'z', 's', 'd', 'r', 'f', 't', 'g', 'y', 'h', 'j', 'i',
        'k', 'o', 'l', 'm', 'dead', '??', '$', '*', 'enter', 'shift'];
    if (!possibleInputs.includes(key.toLocaleLowerCase())) return;
    else piano.stopPlayingKey(key.toLocaleLowerCase());

});