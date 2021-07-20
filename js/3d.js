const canvas = document.getElementById('3d');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth - (window.innerWidth * 4 / 100), window.innerHeight );
    const fov = 75;
    const aspect = 4/3;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;
    

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xA5DCC7);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.update();
            function animate() {

                requestAnimationFrame(animate);
                renderer.render(scene, camera);
                controls.update();
            }

    {
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const objects = [];
    const spread = 15;

    function createMat() {
        const material = new THREE.MeshToonMaterial({
            color:new THREE.Color(0xff637d),
            emissive:new THREE.Color(0xFD1138),
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });
        return material;
    }

    function createTorusKnot() {
        const radius = 30;  
        const tubeRadius = 10;  
        const radialSegments = 10;  
        const tubularSegments = 64;  
        const p = 2;  
        const q = 3;  
        const geometry = new THREE.TorusKnotGeometry(
            radius, tubeRadius, tubularSegments, radialSegments, p, q);

        return geometry; 
    }

    

    function addSolidGeometry(x, y, geometry) {
        const mesh = new THREE.Mesh(geometry, createMat());
        addObject(x, y, mesh);
    }

    function addObject(x, y, obj) {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    addSolidGeometry(0,0 , createTorusKnot()); 
    animate(); 
