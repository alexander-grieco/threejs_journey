import { useFrame, useThree, extend } from "@react-three/fiber"
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import CustomObject from "./CustomObject.jsx"

extend({
    OrbitControls: OrbitControls,
})

export default function Experience() {
    const { camera, gl } = useThree() // hook to get access to Three.js elements
    const cubeRef = useRef() // how to select the cube
    const groupRef = useRef()

    // The underline is the "state" and gives access to the state of the frame
    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta
        // groupRef.current.rotation.y += delta

        // const angle = state.clock.elapsedTime
        // state.camera.position.x = 8 * Math.sin(angle)
        // state.camera.position.z = 8 * Math.cos(angle)
        // state.camera.lookAt(0, 0, 0)
    })

    return <>
        <orbitControls args={[camera, gl.domElement]} />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />


        <group ref={groupRef}>
            <mesh position-x={-2}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh rotation-y={Math.PI * 0.25} scale={1.5} position-x={2} ref={cubeRef}>
                { /*<sphereGeometry args={[1.5, 32, 32]} />*/}
                <boxGeometry scale={1.5} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </group>

        <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <CustomObject />
    </>

}
