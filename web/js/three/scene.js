let camera, scene, renderer;
let cube, plane;
let controls, clock;
init();
animate();

function init() {
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 300;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    scene = new THREE.Scene();

    let cubeGeometry = new THREE.BoxBufferGeometry(100, 100, 100);
    let planeGeometry = new THREE.PlaneGeometry(400, 400, 10, 10);

    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let cubeMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    plane.rotation.x = -Math.PI/2;
    plane.position.y = -50;
    plane.receiveShadow = true;

    scene.add(cube);
    scene.add(plane);

    let ambientLight = new THREE.AmbientLight(0x383838);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 1.0;
    controls.staticMoving = true;
}


function animate() {
    requestAnimationFrame( animate ); //se ejecuta cada vez q el browser esta listo para renderizar
    let delta = clock.getDelta();
    controls.update(delta);
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
