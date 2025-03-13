import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
    const donuts = useRef([])

    // const donutsGroup = useRef()

    // Matcap options: https://github.com/emmelleppi/matcaps
    const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

    // Set the material to use the Matcap texture
    useEffect(() => {
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    useFrame((_, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.1
        }
    })


    return <>
        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault />

        {/* To be used later in array -> uses "useState" above to set the geometry */}
        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} /> */}
        {/* <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

        <Center>
            <Text3D
                material={material}
                font="./fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO R3F
            </Text3D>
        </Center>

        {[...Array(100)].map((_, index) =>
            <mesh
                ref={(element) => {
                    donuts.current[index] = element
                }}
                geometry={torusGeometry}
                material={material}
                key={index}
                position={[
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI * 0.5,
                    Math.random() * Math.PI * 0.5,
                    0
                ]}
            />
        )}

    </>
}
