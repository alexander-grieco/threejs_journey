import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/*
 * Debug
*/
const gui = new GUI({
    title: 'Nice debug ui',
    width: 300,
    closeFolders: false,
})
// gui.close() // default to being closed (folded)
// gui.hide() // hide the gui by default
// Even to toggle the debug ui
window.addEventListener('keydown', (event) => {
    if(event.key == 'h'){
        gui.show(gui._hidden)
    }
})
const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#a778d8'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Add folders to the lil-gui menu
const cubeTweaks = gui.addFolder('Awesome cube')

cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')

// make visibile/invisible
cubeTweaks.add(mesh, 'visible')
// show/hide wireframe
cubeTweaks.add(mesh.material, 'wireframe')

// Change color
// Threejs has an internal color change that is slightly different than the default hex
// output of the lil-gui component - we need to account for that difference
cubeTweaks
    .addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
        // console.log(material.color)

        // // This shows the threejs hex version of the color
        // console.log(value.getHexString())
    })

debugObject.spin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y  + Math.PI * 2})
}
cubeTweaks.add(debugObject, 'spin')

// Subdivision property is only used at geometry compile time - thus needs to be added to debugOjbect
debugObject.subdivision = 2
cubeTweaks.add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    // Only triggers when mouse is released
    .onFinishChange((value) => {
        // need to dispose of old geometries
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value, value, value)
    })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
