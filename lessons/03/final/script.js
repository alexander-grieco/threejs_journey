// this is the three.js package
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// We need 4 elements to actually see something on screen
// - Scene
// - Objects
// - Camera
// - Renderer

// Scene
const scene = new THREE.Scene()

// Objects
// we need to create a Mesh to make an object, a mesh is two things
// a geometry (the shapte)
// a material (how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1)
// can also put 0xff00000 for the color entry
const material = new THREE.MeshBasicMaterial({ color: 'red' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)


renderer.render(scene, camera)
