import * as THREE from '../node_modules/three/build/three.module.js';
import { Key } from './Key.js';
export default class Piano {
    constructor(gui) {
        this.pianoGroup = new THREE.Group();
        this.keys = [
            ['C4', 0, 'capslock'],
            ['Db4', 5, 'a'],
            ['D4', 10, 'q'],
            ['Eb4', 15, 'z'],
            ['E4', 20, 's'],
            ['F4', 30, 'd'],
            ['Gb4', 35, 'r'],
            ['G4', 40, 'f'],
            ['Ab4', 45, 't'],
            ['A4', 50, 'g'],
            ['Bb4', 55, 'y'],
            ['B4', 60, 'h'],
            ['C5', 70, 'j'],
            ['Db5', 75, 'i'],
            ['D5', 80, 'k'],
            ['Eb5', 85, 'o'],
            ['E5', 90, 'l'],
            ['F5', 100, 'm'],
            ['Gb5', 105, 'dead'],
            ['G5', 110, 'ù'],
            ['Ab5', 115, '$'],
            ['A5', 120, '*'],
            ['Bb5', 125, 'enter'],
            ['B5', 130, 'shift'],
        ];
        this.createPiano();
        this.keyOnPress = {
            Color: 0xff0000
        }
        const pianoFolder = gui.addFolder('Piano')
        pianoFolder.addColor(this.keyOnPress, 'Color')
        pianoFolder.open()
    }

    getMesh() {
        return this.pianoGroup;
    }

    createPiano() {
        this.keys.forEach(key => {
            let keyMesh = new Key(key).getMesh();
            this.pianoGroup.add(keyMesh);
        });
        this.pianoGroup.position.x -= 65;
    }

    playKey(keyToplay) {
        let meshToPlay;
        let songToPlay;
        let isNormalKey;
        this.keys.forEach(key => {
            let index = this.keys.indexOf(key);
            if (key[2] === keyToplay) {
                meshToPlay = this.pianoGroup.children[index];
                songToPlay = new Howl({
                    src: [`../grand_piano_mp3/${key[0]}.mp3`]
                });
                meshToPlay.songIsPlaying = true;
                songToPlay.play();
                songToPlay.fade(1, 0, 1000);
                isNormalKey = !Boolean(key[0].length - 2);
            }
        });
        if (meshToPlay.keyIsPlaying) return;

        meshToPlay.keyIsPlaying = true;
        meshToPlay.material.color.set(this.keyOnPress.Color);
        if (isNormalKey) {
            this.rotateNormalKeyClockWise(meshToPlay);
        }
        if (!isNormalKey) {
            this.rotateFlatKeyClockWise(meshToPlay);
        }
    }

    stopPlayingKey(keyToStop) {
        let meshToStop;
        let isNormalKey;
        this.keys.forEach(key => {
            let index = this.keys.indexOf(key);
            if (key[2] === keyToStop) {
                meshToStop = this.pianoGroup.children[index];
                isNormalKey = !Boolean(key[0].length - 2);
            }
        });
        if (!meshToStop.keyIsPlaying) return;

        meshToStop.keyIsPlaying = false;
        if (isNormalKey) {
            meshToStop.material.color.set(0xEEEEEE);
            this.rotateNormalKeyAntiClockWise(meshToStop);
        }
        if (!isNormalKey) {
            meshToStop.material.color.set(0x121212);
            this.rotateFlatKeyAntiClockWise(meshToStop);
        }
    }

    rotateNormalKeyClockWise(mesh) {
        mesh.rotation.x += 0.1;
        mesh.position.z = -2;
    }

    rotateNormalKeyAntiClockWise(mesh) {
        mesh.rotation.x -= 0.1;
        mesh.position.z = 0;
    }

    rotateFlatKeyClockWise(mesh) {
        mesh.rotation.x += 0.14;
        mesh.position.z = 2.7;
    }

    rotateFlatKeyAntiClockWise(mesh) {
        mesh.rotation.x -= 0.14;
        mesh.position.z = 4;
    }
}