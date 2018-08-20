let camera, scene, renderer;
let cube, plane;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
    scene = new THREE.Scene();

    let cubeGeometry = new THREE.BoxBufferGeometry(100, 100, 100);
    let planeGeometry = new THREE.PlaneGeometry(400, 400, 10, 10);

    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

    plane.rotation.x = -Math.PI/2;
    plane.position.y = -50;
    plane.receiveShadow = true;

    scene.add( cube );
    scene.add( plane );

    renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
}


function animate() {
    requestAnimationFrame( animate ); //se ejecuta cada vez q el browser esta listo para renderizar
    // cube.rotation.x += 0.005;
    // cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
