import { Center, OrbitControls, shaderMaterial, Sparkles, useGLTF, useTexture } from '@react-three/drei'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// Use Drei shaderMaterial to create a shader material and then use extend
// to create a native react component for the material
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#e9fcff'),
        uColorEnd: new THREE.Color('#ffffff'),
    },
    portalVertexShader,
    portalFragmentShader
)
extend({ PortalMaterial: PortalMaterial })

export default function Experience() {
    const { nodes } = useGLTF('./model/portal-mine.glb')
    // console.log(nodes)

    const bakedTexture = useTexture('./model/baked-mine.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()
    useFrame((_, delta) => {
        portalMaterial.current.uTime += delta
    })

    return <>

        <color args={['#030202']} attach="background" />

        <OrbitControls makeDefault />

        <Center>
            {/* Main baked image */}
            <mesh geometry={nodes.baked.geometry} >
                <meshBasicMaterial map={bakedTexture} />
            </mesh>


            {/* Pole lights */}
            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>
            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            {/* Portal light */}
            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial} />
            </mesh>

            <Sparkles
                size={3}
                scale={[4, 2, 4]}
                position-y={1}
                speed={0.5}
                count={40}
            />
        </Center>
    </>
}


