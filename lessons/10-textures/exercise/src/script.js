import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/*
Textures
*/
// Loading image and setting up the texture
// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace // textures are supposed to be encoded in sRGB
// image.onload = () => {
//     // Trigger reload once image is loaded
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

// Simpler verison of loading texture with an image
const loadingManager = new THREE.LoadingManager() // helps communicate info on state of loading all your textures (and other things - models, etc)
// loadingManager.onStart = () => {
//     console.log('onStart')
// }
// loadingManager.onProgress= () => {
//     console.log('onProgress')
// }
// loadingManager.onLoad = () => {
//     console.log('onLoad')
// }
// loadingManager.onError = () => {
//     console.log('onError')
// }

// Loading the textures
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/minecraft.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/door/color.jpg',)
colorTexture.colorSpace = THREE.SRGBColorSpace
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg',)
const heightTexture = textureLoader.load('/textures/door/height.jpg',)
const normalTexture = textureLoader.load('/textures/door/normal.jpg',)
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg',)
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg',)
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg',)

// // To repeat the texture n number of times
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
//
// colorTexture.offset.x = 0.5 // offset the pattern
// colorTexture.offset.y = 0.5

// Rotation and recentering
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// Changing the filters
// Can help you adjust a texture/image to make it sharper
//
// NertestFilter generally gives you better performance
//
// jpg generally better for performance, png will provide sharper images (lossless)
// Try to make textures with resolutions with power of 2 sizing (512, 1024, etc...)
// Can use sites like tinypng.com to shrink images
//
// Where to find textures?
// poliigon.com
// 3dtextures.me
// arroway-textures.ch
//
// Or create your own
// substance designer (software)
//
// When using minfilter (next line) no need for mipmapping (i.e. generating smaller
// versions of the texture down to 1x1 sizing)
colorTexture.generateMipmaps = false // disable mipmapping (see explanation above)
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

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
const geometry = new THREE.BoxGeometry(1, 1, 1)
// UV unwrapping - helps position the image on the geometry
// For custom images you will have to provide the UV unwrapping yourself (looks like blender will help you calculate this)
// console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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
