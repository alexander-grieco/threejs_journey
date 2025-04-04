import { Float, Text, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)

// Materials
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstableMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })


// The starting block
function BlockStart({ position = [0, 0, 0] }) {

    return <group position={position} >
        <Float floatIntensity={0.25} rotationIntensity={0.25}>
            <Text
                font="./bebas-neue-v9-latin-regular.woff"
                scale={0.5}
                maxWidth={0.25}
                lineHeight={0.75}
                textAlign='right'
                position={[0.75, 0.65, 0]}
                rotation-y={-0.25}
            >
                Marble Race
                <meshBasicMaterial toneMapped={true} />
            </Text>
        </Float>
        <mesh geometry={boxGeometry} scale={[4, 0.2, 4]} position={[0, -0.1, 0]}
            receiveShadow material={floor1Material}
        />
    </group>

}


// obstacle that rotates
export function BlockSpinner({ position = [0, 0, 0] }) {
    const obstacle = useRef()

    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Make the obstacle rotate in place
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstacle.current.setNextKinematicRotation(rotation)
    })

    return <group position={position} >
        <mesh geometry={boxGeometry} scale={[4, 0.2, 4]} position={[0, -0.1, 0]}
            receiveShadow material={floor2Material}
        />

        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstableMaterial} scale={[3.5, 0.3, 0.3]}
                castShadow receiveShadow
            />
        </RigidBody>
    </group>

}

// Obstacle that moves up and down
export function BlockLimbo({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Make the obstacle move up and down
        const y = Math.sin(time * timeOffset) + 1.15
        obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
    })

    return <group position={position} >
        <mesh geometry={boxGeometry} scale={[4, 0.2, 4]} position={[0, -0.1, 0]}
            receiveShadow material={floor2Material}
        />

        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstableMaterial} scale={[3.5, 0.3, 0.3]}
                castShadow receiveShadow
            />
        </RigidBody>
    </group>

}


// Obstacle that moves side to side
export function BlockAxe({ position = [0, 0, 0] }) {
    const obstacle = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Make the obstacle move up and down
        const x = Math.sin(time * timeOffset) * 1.25
        obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2] })
    })

    return <group position={position} >
        <mesh geometry={boxGeometry} scale={[4, 0.2, 4]} position={[0, -0.1, 0]}
            receiveShadow material={floor2Material}
        />

        <RigidBody ref={obstacle} type='kinematicPosition' position={[0, 0.3, 0]} restitution={0.2} friction={0}>
            <mesh geometry={boxGeometry} material={obstableMaterial} scale={[1.5, 1.5, 0.3]}
                castShadow receiveShadow
            />
        </RigidBody>
    </group>

}

// The ending block
function BlockEnd({ position = [0, 0, 0] }) {
    const hamburger = useGLTF('./hamburger.glb')

    hamburger.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return <group position={position} >
        <Text
            font="./bebas-neue-v9-latin-regular.woff"
            scale={1}
            position={[0, 2.25, 2]}
        >
            FINISH
            <meshBasicMaterial toneMapped={false} />
        </Text>
        <mesh geometry={boxGeometry} scale={[4, 0.2, 4]} position={[0, 0, 0]}
            receiveShadow material={floor1Material}
        />
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0} position={[0, 0.25, 0]}>
            <primitive object={hamburger.scene} scale={0.2} />
        </RigidBody>

    </group>

}

// Walls
function Bounds({ length = 1 }) {

    return <>
        <RigidBody type='fixed' restitution={0.2} friction={0}>
            <mesh
                position={[2.15, 0.75, -(length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, 4 * length]}
                castShadow
            />
            <mesh
                position={[-2.15, 0.75, -(length * 2) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[0.3, 1.5, 4 * length]}
                receiveShadow
            />
            <mesh
                position={[0, 0.75, -(length * 4) + 2]}
                geometry={boxGeometry}
                material={wallMaterial}
                scale={[4, 1.5, 0.3]}
                receiveShadow
            />

            <CuboidCollider
                args={[2, 0.1, 2 * length]}
                position={[0, -0.1, -(length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />
        </RigidBody>
    </>
}


export function Level({ count = 5, types = [BlockSpinner, BlockAxe, BlockLimbo,], seed = 0, }) {
    const blocks = useMemo(() => {
        const blocks = []

        for (let i = 0; i < count; i++) {
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }

        return blocks
    }, [count, types])

    return <>
        <BlockStart position={[0, 0, 0]} />
        {blocks.map((Block, index) => <Block key={index} position={[0, 0, -4 * (index + 1)]} />)}
        <BlockEnd position={[0, 0, -(count + 1) * 4]} />
        <Bounds length={count + 2} />
    </>
}
