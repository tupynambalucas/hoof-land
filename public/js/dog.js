
import * as THREE from '../three/three.module.js';
import { GLTFLoader } from '../three/loaders/GLTFLoader.js';



var div = document.getElementById('dog');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 3000 );

// Ajuste de posição da camera e da mesh
camera.position.z = 500;
camera.position.x = 0
camera.position.y = 8
camera.rotation.x = -0.4

let mixer
let dog
// Luz
var light3 = new THREE.DirectionalLight( 0xffffff, 0.3);
var light2 = new THREE.HemisphereLight( 0xffffff);
var light = new THREE.PointLight( 0x624780, 1, 1000 );

// Ajustando luz
light.position.set(6, -20, 480);
light3.position.set(6, -20, 500)
light3.target.position.set(6, -5, 470)
light3.castShadow = true
light3.shadow.mapSize.width = 2000;
light3.shadow.mapSize.height = 2000;
light3.shadow.camera.top = 170;
light3.shadow.camera.bottom = -170;
light3.shadow.camera.left = -150;
light3.shadow.camera.right = 150;
light3.shadow.camera.near = 0.1;
light3.shadow.camera.far = 2000;
light3.shadow.camera.fov = 60;
scene.add(light2);
scene.add(light3);
var clock = new THREE.Clock();

const geometry = new THREE.CircleGeometry( 8, 8 );
const material = new THREE.MeshPhongMaterial( {color: 0xE4B73E, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.receiveShadow = true
plane.position.set(10.5, -5, 478);
plane.rotation.x = Math.PI / -2;
scene.add( plane );

// Setando o renderer e juntando ele a Div: lua


// GLTF loader
var loader = new GLTFLoader();
// const modifer = new THREE.SimplifyModifier();
// Carregando modelo
loader.load(
// Caminho pro arquivo
'../three/models/dog/scene.gltf',

    // Função chamada quando o arquivo é carregado
    function ( gltf ) { 

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; 

        gltf.scene.traverse( function ( child ) {

          if ( child.isMesh ) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.geometry.computeVertexNormals(); // FIX
          }
        });
        // Empurrando objeto para variavel
        dog = gltf.scene
        dog.scale.set(10,10,10);
        dog.name = 'dope';
        // Adicionando objeto a cena
        mixer = new THREE.AnimationMixer( dog );
        var action = mixer.clipAction( gltf.animations[ 2 ] );
        action.play();
        
        if (window.innerWidth < 700) {
          dog.position.set(4, -9, 479);
          dog.rotation.y = -0.6
          plane.position.set(4, -9, 479);
        } else {
          dog.position.set(12, -5, 478);
          dog.rotation.y = -0.9 
        }
        scene.add(dog)
        action.play();




        // let y = dog.rotation.y
        // gsap.to(dog.rotation, {duration: 5, y: -2, repeat: 0, ease: "none", onComplete: animateBack});
        // function animateBack() {
        //   console.log('back')
        //   gsap.to(dog.rotation, {duration: 10, y: Math.PI * +0.5, repeat: 0, ease: "none"});
        // }
    },
    // Função de carregamento
    function ( xhr ) {
      console.log("Scene polycount:", renderer.info.render.triangles)
      console.log("Active Drawcalls:", renderer.info.render.calls)
      console.log("Textures in Memory", renderer.info.memory.textures)
      console.log("Geometries in Memory", renderer.info.memory.geometries)
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // Função em caso de erro
    function ( error ) {

        console.log( 'An error happened' );
        console.log(error)
    },
);
var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  powerPreference: "high-performance",
})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio *  0.6);

if (window.innerWidth < 600) {
  renderer.setPixelRatio( window.devicePixelRatio *  0.6);
}

div.appendChild( renderer.domElement ); 

// Adicionando a mesh e luz na cena


function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    if (mixer) mixer.update( delta );
    // console.log(animationTime)


    
    renderer.render( scene, camera );
};

animate();
