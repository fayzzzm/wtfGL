function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 100;
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

    const particleGeom = new THREE.Geometry();
    const particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color('white'),
        size: 0.01,
    });

    let particleCount = 5800;
    let particleDistance = 53;
    for (var i = 0; i < particleCount; i++) {
        let posX = (Math.random() - 0.5) * particleDistance;
        let posY = (Math.random() - 0.5) * particleDistance;
        let posZ = (Math.random() - 0.5) * particleDistance;
        let particle = new THREE.Vector3(posX, posY, posZ);
        particleGeom.vertices.push(particle);
    }

    const particleSys = new THREE.Points(particleGeom, particleMaterial);
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

    animate();
    console.log(scene);
}

main();
