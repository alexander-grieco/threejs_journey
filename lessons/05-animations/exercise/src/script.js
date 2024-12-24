import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
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
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// // time
// let time = Date.now()

// // clock
// const clock = new THREE.Clock()

// Using GSAP package (GS = Green sock)
gsap.to(mesh.position, { duration: 1, delay:1, x: 2})
gsap.to(mesh.position, { duration: 1, delay:2, x: 0})

// Animations
const tick = () => {
    // // clock - simpler way to account for different frame rates
    // const elapsedTime = clock.getElapsedTime()
    //
    // // // time - To account for different frame rates of screens
    // // const currentTime = Date.now()
    // // const deltaTime = currentTime - time
    // // time = currentTime
    //
    // // update objects
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)
    //
    // Render
    renderer.render(scene, camera)

    // Request next frame only
    window.requestAnimationFrame(tick)
}

tick()
