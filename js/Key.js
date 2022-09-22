import * as THREE from '../node_modules/three/build/three.module.js';


export class Key {
    constructor(key) {
        this.note = key[0];
        this.xOffset = key[1];
        this.input = key[2];
        if (this.note.length === 2)
            this.createNormalKey();
        else
            this.createFlatKey();
    }

    getMesh() {
        return this.mesh;
    }

    createNormalKey() {
        const geo = new THREE.BoxGeometry(9, 40, 4);
        const mat = new THREE.MeshStandardMaterial({ color: 0xEEEEEEE });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.position.x = this.xOffset;
        this.mesh.keyIsPlaying = false
        this.mesh.songIsPlaying = false
    }

    createFlatKey() {
        const geo = new THREE.BoxGeometry(6, 24, 4);
        const mat = new THREE.MeshStandardMaterial({ color: 0x121212 });
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.position.x = this.xOffset;
        this.mesh.position.y = 8;
        this.mesh.position.z = 4;
        this.mesh.keyIsPlaying = false
        this.mesh.songIsPlaying = false
    }
}
