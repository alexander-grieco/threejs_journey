import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import Model from './Model.jsx'
import Placeholder from './Placeholder.jsx'
import { Suspense } from 'react'
import Hamburger from './Hamburger.jsx'
import Fox from './Fox.jsx'

export default function Experience() {
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight
            castShadow
            position={[1, 2, 3]}
            intensity={4.5}
            shadow-normalBias={0.04} // makes shadow smoother on rounded surfaces
        />
        <ambientLight intensity={1.5} />

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* Suspense lets the rest of the scene load, but everything inside
        of the Suspense waits until everything is loaded before showing up */}
        <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />} >
            <Hamburger scale={0.35} />
        </Suspense>

        <Fox />
    </>
}
