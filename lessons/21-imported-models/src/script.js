/*
 * GLTF is becoming the standard format for imported modules
 * There are many others, but GLTF is probably the one you should use
 *
 * GLTF - GL Transmission Format
 *
 * Supports different sets of data like geometries, materials, cameras,
 * lights, scene graph, animations, skeletons, morhping, etc
 *
 * Various formats like json, binary, embeded textures
 *
 * Highly supported - can get similar results across different environments
 *
 * Where to get models?
 * GLTF github - https://github.com/KhronosGroup/glTF-Sample-Assets
 * There are many different ways these files can be loaded.
 * - glTF-default -> couple of files - some can be edited
 * - glTF-Draco -> couple of files - compressed (much lighter)
 * - glTF-binary -> one binary - lighter than default, can't edit
 * - glTF-Embedded -> one json file - super heavy, but everything editable
 *
 * in GLTF formats, created objects tend to use PBR -- Physically Based
 * Rendering -- which means we need to provide light -- ambient or otherwise
 *
 * NOTE: can go to threejs.org/editor to try live editing gltf resources.
 * Simplydrag and drop resources into the browser
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * models
 */

// Draco loader -> copy the files from the node_modules/three/exmaples/jsm/libs/draco to the /static/ folder
// Can help have smaller files, but can freeze app if it has to decompress
// a large amount of textures
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // this is lazy loaded :thumsup

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null
gltfLoader.load(
    // '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    '/models/Fox/glTF/Fox.gltf',
    (gltf) => {
        // // NOTE: Can't do this -> removes child from gltf.scene when its
        // // added to the new scene. This messes up the for loop
        // for (const child of gltf.scene.children) {
        //     // scene.add(gltf.scene.children)
        //     scene.add(child)
        // }

        // // This is one solution to address the above issue
        // while (gltf.scene.children.length) {
        //     scene.add(gltf.scene.children[0])
        // }

        // // Here is another way -> copy the array
        // const children = [...gltf.scene.children]
        // for (const child of children) {
        //     scene.add(child)
        // }

        // Animations
        // must update mixer on each tick
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[1])

        action.play()
        console.log(action)

        // Simplest solution is to just add the entire gltf scene
        gltf.scene.scale.setScalar(0.025)
        scene.add(gltf.scene)
    },
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update mixer
    // must test if null since textures take a little bit to load
    if (mixer !== null) {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
