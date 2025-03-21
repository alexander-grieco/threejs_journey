import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Texture
 * This can be added to an object to create what appears to be a shadow
 * But the shadow was pre-made in the `bakedShadow` image so we can increase
 * performance by not having to load and calculate a bunch of shadows
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
bakedShadow.colorSpace = THREE.SRGBColorSpace

const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')
simpleShadow.colorSpace = THREE.SRGBColorSpace

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
 * Lights & Shadows
 *
 * To activate shadows you must enable them on the renderer (below)
 * You then must pick which objects should cast shadows, and enable them
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(3).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

// Lights create a shadow map to -

directionalLight.castShadow = true // allow light to cast shadows

// Make shadow map have more pixels (default 512) for sharper shadow projection
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
// Set the closest/farthest point the shadown takes affect
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// Set the size of the orthographic camera
directionalLight.shadow.camera.left = -2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.bottom = -2
// Add some blur to the shadow
directionalLight.shadow.radius = 10


// See the shape of the directionalLight
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

// SPOTLIGHT
const spotLight = new THREE.SpotLight(0xffffff, 2.6, 10, Math.PI * 0.3)

spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

const spotlightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotlightCameraHelper.visible = false
scene.add(spotlightCameraHelper)

// Point light
const pointLight = new THREE.PointLight(0xffffff, 2.7)
pointLight.castShadow = true
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5


pointLight.position.set(-1, 1, 0)
scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

// rect light
const rectLight = new THREE.RectAreaLight(0xffffff, 2.7)
rectLight.castShadow = true
scene.add(rectLight)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true // Enabling casting shadows on other objects

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
    // new THREE.MeshBasicMaterial({
    //     map: bakedShadow
    // })
)
plane.receiveShadow = true // Enabling projections onto this plane

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow,
    })
)
sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow)

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

renderer.shadowMap.enabled = false
// Options are:
// BasicShadowMap - performant but shitty looking
// PCFShadowMap - default -- less performant but smoother edges
// PCFSoftShadowMap - less performant but even softer edges
// VSMShadowMap - less performant, more constrains, can have unexcpected results
renderer.shadowMap.type = THREE.PCFSoftShadowMap // radius doesnt work with soft shadow map

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update the sphere - bouncing circle, shadow is oscillating with bounce
    sphere.position.x = Math.cos(elapsedTime)
    sphere.position.z = Math.sin(elapsedTime)
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))
    sphereShadow.position.x = Math.cos(elapsedTime)
    sphereShadow.position.z = Math.sin(elapsedTime)
    sphereShadow.material.opacity = 1 - sphere.position.y * 0.3

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
