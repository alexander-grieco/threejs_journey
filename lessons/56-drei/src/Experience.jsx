import { useRef } from "react"
import {
    OrbitControls,
    TransformControls,
    PivotControls,
    Html,
    Text,
    Float,
    MeshReflectorMaterial,
} from "@react-three/drei"

export default function Experience() {
    const cube = useRef()
    const sphere = useRef()
    return <>
        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={4.5} />
        <ambientLight intensity={1.5} />

        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={1}
        // fixed={true} // I'm not a fan of this, but scale needs to be large (100) if using this
        >
            <mesh ref={sphere} position-x={- 2}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={3}
                    occlude={[sphere, cube]}
                >That's a sphere 👍</Html>
            </mesh>
        </PivotControls>

        <mesh position-x={2} scale={1.5} ref={cube}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        {/* This allows us to move the object (cube) and the mode changes the ways in which we can move it */}
        <TransformControls object={cube} mode="translate" />


        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.75}
                color="greenyellow"
            />
            {/* <meshStandardMaterial color="greenyellow" /> */}
        </mesh>

        <Float
            speed={5}
            floatIntensity={2}
        >
            <Text
                font="./bangers-v20-latin-regular.woff" // this file is in public folder - woff is lightest format for fonts
                fontSize={1}
                color="salmon"
                position-y={2}
                maxWidth={2}
                textAlign="center"
            >
                I LOVE R3F
            </Text>
        </Float>


    </>
}
