import * as THREE from '../node_modules/three/build/three.module.js';

export default class Piano {
    constructor() {
        this.pianoGroup = new THREE.Group();
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.createPiano();
        this.initEvents()
    }

    getMesh() {
        return this.pianoGroup;
    }

    createPiano() {
        let white = 0
        let black = 0
        for (let i = 0; i < this.notes.length; i++) {
            let noteMesh;
            if (this.notes[i][1] === '#') {
                noteMesh = new THREE.Mesh(
                    new THREE.BoxBufferGeometry(1, 3.5, 0.5),
                    new THREE.MeshBasicMaterial({ color: '#121212' })
                );
                noteMesh.position.x = blackPosition(black)
                noteMesh.position.z = 1
                black++
                
            } else {
                noteMesh = new THREE.Mesh(
                    new THREE.BoxBufferGeometry(2, 5, 1),
                    new THREE.MeshBasicMaterial({ color: '#ccc' })
                );
                noteMesh.position.x = white * 2.2;
                white++
            }

            this.pianoGroup.add(noteMesh);
        }
        this.pianoGroup.position.x = - ((white - 1) * 2.2) / 2
    }

    initEvents() {
        console.log(this.getMesh().children);
    }
}

function blackPosition(n) {
    let pos
    if (n <= 1) {
        pos = n + 2.1
    } else if (n <= 4) {
        pos = 6.6 + n + 0.1
    }
    
    return 1.1
}