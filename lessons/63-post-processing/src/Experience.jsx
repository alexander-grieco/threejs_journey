import { OrbitControls } from '@react-three/drei'
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, ToneMapping, Vignette } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode, ToneMappingMode } from 'postprocessing'
import { Perf } from 'r3f-perf'
import Drunk from './Drunk'
import { useRef } from 'react'
import { useControls } from 'leva'

export default function Experience() {
    const drunkRef = useRef()

    const drunkProps = useControls('Drunk Effect', {
        frequency: { value: 2, min: 1, max: 20 },
        amplitude: { value: 0.1, min: 0, max: 1, step: 0.01 },

    })

    return <>
        <color args={['#ffffff']} attach="background" />

        <EffectComposer multisampling={8}>
            <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />

            {/* Adds small black soft edges to focus on center of scene */}
            {/* <Vignette */}
            {/*     offset={0.3} */}
            {/*     darkness={0.9} */}
            {/*     blendFunction={BlendFunction.NORMAL} */}
            {/* /> */}

            {/* <Glitch */}
            {/*     delay={[0.5, 1]} */}
            {/*     duration={[0.1, 0.3]} */}
            {/*     strength={[0.2, 0.4]} */}
            {/*     mode={GlitchMode.SPORADIC} */}
            {/* /> */}

            {/* <Noise */}
            {/*     premultiply */}
            {/*     blendFunction={BlendFunction.SOFT_LIGHT} */}
            {/* /> */}

            {/* Set the background color to black */}
            {/* <Bloom */}
            {/*     mipmapBlur // This really makes things glow */}
            {/*     luminanceThreshold={1.1} */}
            {/*     intensity={0.5} */}
            {/* /> */}

            {/* Values are normalized 0 to 1 based on Camera's near and far settings */}
            {/* Not great for performance */}
            {/* <DepthOfField */}
            {/*     focusDistance={0.025} */}
            {/*     focalLength={0.025} */}
            {/*     bokehScale={6} */}
            {/* /> */}

            <Drunk
                ref={drunkRef}
                {...drunkProps}
                blendFunction={BlendFunction.DARKEN}
            />

        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
            {/* Change to basic for bloom filter -> light is uniform */}
            {/* <meshBasicMaterial color={[1.5, 1, 4]} /> */}
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}
