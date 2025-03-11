import { useThree, useFrame } from '@react-three/fiber'
import {
    AccumulativeShadows,
    SoftShadows,
    BakeShadows,
    OrbitControls,
    useHelper,
    RandomizedLight,
    ContactShadows,
    Sky,
    Environment,
    Lightformer,
    Stage
} from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience() {
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()

    useFrame((state, delta) => {
        // const time = state.clock.elapsedTime
        // cube.current.position.x = 2 + Math.sin(time)
        cube.current.rotation.y += delta * 0.2
    })

    const { color, opacity, blur } = useControls('contact shadows', {
        color: '#4b2709',
        opacity: { value: 0.4, min: 0, max: 1 },
        blur: { value: 2.8, min: 0, max: 10 },
    })

    const { sunPosition } = useControls('sky', {
        sunPosition: { value: [1, 2, 3] },
    })

    const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls('environment Map', {
        envMapIntensity: { value: 3.5, min: 0, max: 12 },
        envMapHeight: { value: 7, min: 0, max: 100 },
        envMapRadius: { value: 20, min: 10, max: 1000 },
        envMapScale: { value: 100, min: 10, max: 1000 },
    })

    // // Now redundant
    // const scene = useThree(state => state.scene)
    // useEffect(() => {
    //     scene.environmentIntensity = envMapIntensity
    // }, [envMapIntensity])

    return <>

        {/* <Environment */}
        {/*     // background */}
        {/*     preset="sunset" */}
        {/*     ground={{ */}
        {/*         height: envMapHeight, */}
        {/*         radius: envMapRadius, */}
        {/*         scale: envMapScale, */}
        {/*     }} */}
        {/* // resolution={32} */}
        {/* // files={[ */}
        {/* //     './environmentMaps/the_sky_is_on_fire_2k.hdr' */}
        {/* //     // './environmentMaps/2/px.jpg', */}
        {/* //     // './environmentMaps/2/nx.jpg', */}
        {/* //     // './environmentMaps/2/py.jpg', */}
        {/* //     // './environmentMaps/2/ny.jpg', */}
        {/* //     // './environmentMaps/2/pz.jpg', */}
        {/* //     // './environmentMaps/2/nz.jpg', */}
        {/* // ]} */}
        {/* > */}
        {/* <color args={["#000000"]} attach="background" /> */}
        {/* <Lightformer */}
        {/*     position-z={-5} */}
        {/*     scale={10} */}
        {/*     color="red" */}
        {/*     intensity={10} */}
        {/*     form="ring" */}
        {/* /> */}
        {/* <mesh position-z={-5} scale={10}> */}
        {/*     <planeGeometry /> */}
        {/*     <meshBasicMaterial color={[10, 0, 0]} /> */}
        {/* </mesh> */}
        {/* </Environment> */}

        {/* <BakeShadows /> */}

        {/* Dont change these settings once set - very bad for performance */}
        {/* <SoftShadows */}
        {/*     size={25} */}
        {/*     samples={10} */}
        {/*     focus={0} */}
        {/* /> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <directionalLight */}
        {/*     ref={directionalLight} */}
        {/*     castShadow */}
        {/*     position={sunPosition} */}
        {/*     intensity={4.5} */}
        {/*     shadow-mapSize={[1024, 1024]} */}
        {/*     shadow-camera-near={1} */}
        {/*     shadow-camera-far={10} */}
        {/*     shadow-camera-top={5} */}
        {/*     shadow-camera-right={5} */}
        {/*     shadow-camera-bottom={-5} */}
        {/*     shadow-camera-left={-5} */}
        {/* /> */}
        {/* <ambientLight intensity={1.5} /> */}

        {/* <Sky sunPosition={sunPosition} /> */}

        {/* <AccumulativeShadows */}
        {/*     position={[0, -0.99, 0]} */}
        {/*     scale={10} // sizing - should match plane size */}
        {/*     color="#316d39" */}
        {/*     opacity={0.8} */}
        {/*     frames={Infinity} */}
        {/*     temporal */}
        {/*     blend={100} */}
        {/* > */}
        {/*     <RandomizedLight */}
        {/*         amount={8} */}
        {/*         radius={1} */}
        {/*         ambient={0.5} */}
        {/*         intensity={3} */}
        {/*         position={[1, 2, 3]} */}
        {/*         bias={0.001} */}
        {/*     /> */}
        {/* </AccumulativeShadows> */}

        {/* <ContactShadows */}
        {/*     position={[0, 0, 0]} */}
        {/*     scale={10} */}
        {/*     resolution={512} */}
        {/*     far={5} */}
        {/*     color={color} */}
        {/*     opacity={opacity} */}
        {/*     blur={blur} */}
        {/* /> */}



        {/* <mesh castShadow position-x={- 2} position-y={1}> */}
        {/*     <sphereGeometry /> */}
        {/*     <meshStandardMaterial color="orange" /> */}
        {/* </mesh> */}

        {/* <mesh ref={cube} castShadow position-x={2} position-y={1} scale={1.5}> */}
        {/*     <boxGeometry /> */}
        {/*     <meshStandardMaterial color="mediumpurple" /> */}
        {/* </mesh> */}

        {/* <mesh position-y={0} rotation-x={- Math.PI * 0.5} scale={10}> */}
        {/*     <planeGeometry /> */}
        {/*     <meshStandardMaterial color="greenyellow" /> */}
        {/* </mesh> */}

        <Stage
            shadows={{
                type: 'contact',
                opacity: 0.2,
                blur: 3,
            }}
            environment="sunset"
            preset="portrait"
            intensity={envMapIntensity}
        >
            <mesh castShadow position-x={- 2} position-y={1}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>

            <mesh ref={cube} castShadow position-x={2} position-y={1} scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </Stage>
    </>
}
