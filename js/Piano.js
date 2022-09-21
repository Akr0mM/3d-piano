import * as THREE from '../node_modules/three/build/three.module.js';
import { Key } from './Key.js';

export default class Piano {
    constructor() {
        this.pianoGroup = new THREE.Group();
        this.keys = [
            ['C4', 0, 'capslock'],
            ['C4#', 5, 'a'],
            ['D4', 10, 'q'],
            ['D4#', 15, 'z'],
            ['E4', 20, 's'],
            ['F4', 30, 'd'],
            ['F4#', 35, 'r'],
            ['G4', 40, 'f'],
            ['G4#', 45, 't'],
            ['A5', 50, 'g'],
            ['A4#', 55, 'y'],
            ['B5', 60, 'h'],
            ['C5', 70, 'j'],
            ['C5#', 75, 'i'],
            ['D5', 80, 'k'],
            ['D5#', 85, 'o'],
            ['E5', 90, 'l'],
            ['F5', 100, 'm'],
            ['F5#', 105, 'dead'],
            ['G5', 110, 'ù'],
            ['G5#', 115, '$'],
            ['A5', 120, '*'],
            ['A5#', 125, 'enter'],
            ['B5', 130, 'shift'],
        ];
        this.createPiano();
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
        this.keys.forEach(key => {
            let index = this.keys.indexOf(key)
            if (key[2] === keyToplay) {
                meshToPlay = this.pianoGroup.children[index]
                // songToPlay = `../song/${key[0]}.mp3`
            }
        });
        meshToPlay.material.color.set(0xff0000)
    }
}