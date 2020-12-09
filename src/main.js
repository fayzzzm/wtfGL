import * as THREE from './three.js';

import { OrbitControls } from './orbit-controls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75,
        aspect = 2; // the canvas default
    const near = 0.1,
        far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 1.3;

    const scene = new THREE.Scene();

    {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 1, 4);
        scene.add(light);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    const particleGeom = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color('white'),
        size: 0.01,
    });

    const particleCount = 5800;
    const particleDistance = 53;
    for (var i = 0; i < particleCount; i++) {
        const posX = (Math.random() - 0.5) * particleDistance;
        const posY = (Math.random() - 0.5) * particleDistance;
        const posZ = (Math.random() - 0.5) * particleDistance;
        const particle = new THREE.Vector3(posX, posY, posZ);
        particleGeom.vertices.push(particle);
    }

    const particleSys = new THREE.PointCloud(particleGeom, particleMaterial);
    particleSys.name = 'particleSys';
    scene.add(particleSys);

    const animate = () => {
        requestAnimationFrame(animate);

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }

        const particleSys = scene.getObjectByName('particleSys');
        particleSys.geometry.vertices.forEach((particle) => {
            particle.z += 0.01;
            if (particle.z > 40) {
                particle.z = -10;
            }
        });
        particleSys.geometry.verticesNeedUpdate = true;
        renderer.render(scene, camera);
    };

    setTimeout(() => {
        console.log('Hello world');
        particleSys.boundingSphere = 50;
    }, 1000);

    animate();
    console.log(scene);
}

main();
