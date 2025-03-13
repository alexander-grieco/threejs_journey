import { useGLTF, Clone } from '@react-three/drei'

export default function Model() {
    const model = useGLTF('./hamburger-draco.glb')
    return <>
        <Clone object={model.scene} scale={0.35} position-x={-4} />
        <Clone object={model.scene} scale={0.35} position-x={0} />
        <Clone object={model.scene} scale={0.35} position-x={4} />
    </>
}

// Preload the model - this can be helpful in situations where you dont
// need to add the model to the scene right away, but would like it loaded
// in the background before you need to add it
useGLTF.preload('./hamburger-draco.glb')
