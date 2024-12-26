import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

/**
 * Debug
**/
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
* Textures
*/
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')



/*
// Objects
*/
//////////////////////// Mesh Basic Material ////////////////////////////////////////
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('green')
// material.wireframe = true // show object wireframe (generally only for testing)
// material.transparent = true // needed for opacity and alpha methods
// material.opacity = 0.2
// material.alphaMap = doorAlphaTexture // white surfaces are seen, black hidden
// material.side = THREE.DoubleSide // inside surfaces have color

//////////////////////// Mesh Normal Material ////////////////////////////////////////
// // think normal like the geometrical definition -> perpendicular to the surface
// // This is most useful when debugging the "normals" of an object
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//////////////////////// Mesh MatCap Material ////////////////////////////////////////
// // These can be useful for mocking light in your scene without actually creating light
// // list of matcaps => github.com/nidorx/matcaps
// const material = new THREE.MeshMatcapMaterial()
// // NOTE: it's matcap and not map
// material.matcap = matcapTexture

//////////////////////// Mesh Depth Material ////////////////////////////////////////
// const material = new THREE.MeshDepthMaterial()


//////////////////////// Mesh Lambert Material ////////////////////////////////////////
// // This material requires light - does not have any radiance properties of its own
// const material = new THREE.MeshLambertMaterial()

//////////////////////// Mesh Phong Material ////////////////////////////////////////
// // Less performant than Lamber, but more realistic
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//////////////////////// Mesh Toon Material ////////////////////////////////////////
// // Like the two above, but more of a video game (toon) vibe
// const material = new THREE.MeshToonMaterial()
// // mipmapping
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false // this is just for performance
// material.gradientMap = gradientTexture // wont work on its own, use mipmapping (shown above)

// //////////////////////// Mesh Standard Material ////////////////////////////////////////
// const material = new THREE.MeshStandardMaterial()
// // material.metalness = 0.7
// // material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1 //default is 1, can make the occlusion more/less
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true // need for alphaMap
// material.alphaMap = doorAlphaTexture

//////////////////////// Mesh Physical Material ////////////////////////////////////////
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 0
material.roughness = 0
material.side = THREE.DoubleSide
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1 //default is 1, can make the occlusion more/less
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true // need for alphaMap
// material.alphaMap = doorAlphaTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// // Clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0
//
// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// // Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)
// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')

// // Irridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transimission
// IOR - index of refraction => can find table of typical values for objects on wikipedia
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5
gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(0).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

///////////////////////// End of Materials /////////////////////////////////////////////
// // Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment map
**/
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap // make the environment the background
    scene.environment = environmentMap // adds environment to scene, allows for reflections in objects that are in scene
})

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// My attempt
// // Sphere
// const sphere = new THREE.SphereGeometry()
// const sphereMaterial = new THREE.MeshBasicMaterial()
// const sphereMesh = new THREE.Mesh(sphere, sphereMaterial)
// sphereMesh.position.x = -2
//
// // Plane
// const plane = new THREE.PlaneGeometry()
// const planeMaterial = new THREE.MeshBasicMaterial()
// const planeMesh = new THREE.Mesh(plane, planeMaterial)
//
// // torus
// const torus = new THREE.TorusGeometry()
// const torusMaterial = new THREE.MeshBasicMaterial()
// const torusMesh = new THREE.Mesh(torus, torusMaterial)
// torusMesh.position.x = 2
//
// // Add to scene
// scene.add(sphereMesh, planeMesh, torusMesh)

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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
