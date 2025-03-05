import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function CustomObject() {
    const geometryRef = useRef()

    const verticesCount = 10 * 3 // each vertex has 3 coordinates
    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount * 3) // Each position has 3 vertices (bc its a triangle)

        for (let i = 0; i < verticesCount * 3; i++)
            positions[i] = (Math.random() - 0.5) * 3
        return positions
    }, [])

    useEffect(() => {
        geometryRef.current.computeVertexNormals() // make Three.js calculate the normals of all the faces of your shape
    }, [])

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute
                attach="attributes-position"
                count={verticesCount}
                itemSize={3}
                array={positions}
            />
        </bufferGeometry>
        <meshStandardMaterial color='red' side={THREE.DoubleSide} />
    </mesh>
}
