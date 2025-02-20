import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'


/**
 * NOTE:
 *
 * Helpful article: https://discoverthreejs.com/tips-and-tricks/
 */

/**
 * Stats
 */
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const displacementTexture = textureLoader.load('/textures/displacementMap.png')

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
camera.position.set(2, 2, 6)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: 'high-performance', // only add if you're having frame rate issues
    antialias: true // only add if there are visible aliasing issues - i.e. "steps" on edges of geometries
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Test meshes
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial()
)
cube.castShadow = true
cube.receiveShadow = true
cube.position.set(- 5, 0, 0)
// scene.add(cube)

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 128, 32),
    new THREE.MeshStandardMaterial()
)
torusKnot.castShadow = true
torusKnot.receiveShadow = true
// scene.add(torusKnot)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial()
)
sphere.position.set(5, 0, 0)
sphere.castShadow = true
sphere.receiveShadow = true
// scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial()
)
floor.position.set(0, - 2, 0)
floor.rotation.x = - Math.PI * 0.5
floor.castShadow = true
floor.receiveShadow = true
// scene.add(floor)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    stats.begin()

    const elapsedTime = clock.getElapsedTime()

    // Update test mesh
    torusKnot.rotation.y = elapsedTime * 0.1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    stats.end()
}

tick()

/**
 * Tips
 */

// // Tip 4
// console.log(renderer.info)

// // Tip 6
// // Dispose of unused objects!
// // https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
// scene.remove(cube)
// cube.geometry.dispose()
// cube.material.dispose()

// // Tip 10
// // Properly set size of shadow maps - only as big as they need to be
// directionalLight.shadow.camera.top = 3
// directionalLight.shadow.camera.right = 6
// directionalLight.shadow.camera.left = - 6
// directionalLight.shadow.camera.bottom = - 3
// directionalLight.shadow.camera.far = 10
// directionalLight.shadow.mapSize.set(1024, 1024)
//
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(cameraHelper)
//
// // Tip 11
// // If an object should only receive shadows, dont let it cast shadows
// // If an object should only cast shadows, dont let if receive shadows
// cube.castShadow = true
// cube.receiveShadow = false
//
// torusKnot.castShadow = true
// torusKnot.receiveShadow = false
//
// sphere.castShadow = true
// sphere.receiveShadow = false
//
// floor.castShadow = false
// floor.receiveShadow = true
//
// // Tip 12
// // If shadows don't move, dont update the shadows on each frame
// renderer.shadowMap.autoUpdate = false
// renderer.shadowMap.needsUpdate = true // does the first render of the shadows

// // Tip 18
// // Use mergeGeometries to consolidate a bunch of related geometries into one
// // This will render all those items at the same time, in a single frame
// const geometries = []
// for (let i = 0; i < 50; i++) {
//     const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
//     geometry.rotateX((Math.random() - 0.5) * Math.PI * 2)
//     geometry.rotateY((Math.random() - 0.5) * Math.PI * 2)
//
//     geometry.translate(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//     )
//
//     geometries.push(geometry)
//
// }
//
// const mergedGeometries = BufferGeometryUtils.mergeGeometries(geometries)
//
//
// const material = new THREE.MeshNormalMaterial()
//
// const mesh = new THREE.Mesh(mergedGeometries, material)
// scene.add(mesh)

// // Tip 19
// // Create a single material, no need to create a bunch
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()
//
// for (let i = 0; i < 50; i++) {
//
//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2
//
//     scene.add(mesh)
// }

// // Tip 20
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

// for(let i = 0; i < 50; i++)
// {
//     const material = new THREE.MeshNormalMaterial()

//     const mesh = new THREE.Mesh(geometry, material)
//     mesh.position.x = (Math.random() - 0.5) * 10
//     mesh.position.y = (Math.random() - 0.5) * 10
//     mesh.position.z = (Math.random() - 0.5) * 10
//     mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2

//     scene.add(mesh)
// }

// // Tip 22
// // Use an instance mesh - like a merged geometry, but allows moving individual items in the group
// const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material = new THREE.MeshNormalMaterial()
//
// const mesh = new THREE.InstancedMesh(geometry, material, 50)
// // Add this if you're gonna update the matrices in the `tick` function
// mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
// scene.add(mesh)
//
// for (let i = 0; i < 50; i++) {
//     // update position
//     const position = new THREE.Vector3(
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 10,
//     )
//
//     // Set individual rotation
//     const quarternion = new THREE.Quaternion()
//     quarternion.setFromEuler(new THREE.Euler(
//         (Math.random() - 0.5) * Math.PI * 2,
//         (Math.random() - 0.5) * Math.PI * 2,
//         0,
//     ))
//
//     const matrix = new THREE.Matrix4()
//     matrix.makeRotationFromQuaternion(quarternion)
//     matrix.setPosition(position)
//     mesh.setMatrixAt(i, matrix)
//
//     // const mesh = new THREE.Mesh(geometry, material)
//     // mesh.position.x = (Math.random() - 0.5) * 10
//     // mesh.position.y = (Math.random() - 0.5) * 10
//     // mesh.position.z = (Math.random() - 0.5) * 10
//     // mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2
//     // mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2
//     //
//     // scene.add(mesh)
// }

// Tip 29
// You never really need a pixel ratio above 2
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Tip 31, 32, 34 and 35
const shaderGeometry = new THREE.PlaneGeometry(10, 10, 256, 256)

const shaderMaterial = new THREE.ShaderMaterial({
    precision: 'lowp', // defaults to mediump, if it looks fine, then use lowp -> better for performance
    uniforms:
    {
        uDisplacementTexture: { value: displacementTexture },
        uDisplacementStrength: { value: 1.5 }
    },
    vertexShader: `
        uniform sampler2D uDisplacementTexture;
        uniform float uDisplacementStrength;

        varying vec2 vUv;

        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);

            float elevation = texture2D(uDisplacementTexture, uv).r;
            // remove if statement -> better for performance => remove variable, just inject into final calc (see below)
            // if(elevation < 0.5)
            // {
            //     elevation = 0.5;
            // }

            modelPosition.y += max(elevation, 0.5) * uDisplacementStrength;

            gl_Position = projectionMatrix * viewMatrix * modelPosition;

            vUv = uv;
        }
    `,
    fragmentShader: `
        uniform sampler2D uDisplacementTexture;

        varying vec2 vUv;

        void main()
        {
            float elevation = texture2D(uDisplacementTexture, vUv).r;
            elevation = max(elevation, 0.25);
            // if(elevation < 0.25)
            // {
            //     elevation = 0.25;
            // }

            vec3 depthColor = vec3(1.0, 0.1, 0.1);
            vec3 surfaceColor = vec3(0.1, 0.0, 0.5);

            // Replace next four lines with the single line at the bottom -> better performance
            // vec3 finalColor = vec3(0.0);
            // finalColor.r += depthColor.r + (surfaceColor.r - depthColor.r) * elevation;
            // finalColor.g += depthColor.g + (surfaceColor.g - depthColor.g) * elevation;
            // finalColor.b += depthColor.b + (surfaceColor.b - depthColor.b) * elevation;
            vec3 finalColor = mix(depthColor, surfaceColor, elevation);

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `
})

const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
shaderMesh.rotation.x = - Math.PI * 0.5
scene.add(shaderMesh)
