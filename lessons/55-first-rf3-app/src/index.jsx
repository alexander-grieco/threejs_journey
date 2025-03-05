import Experience from './Experience.jsx'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import './style.css'
import ReactDOM from 'react-dom/client'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        dpr={[1, 2]} // clamp pixel ratio between 1 and 2 -> this is the default
        // orthographic
        gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping, // the default
            outputColorSpace: THREE.SRGBColorSpace, // the default
        }}
        camera={{
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 100,
            position: [3, 2, 6],
        }}
    >
        <Experience />
    </Canvas>
)
