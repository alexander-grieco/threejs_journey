import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import { useControls } from "leva"

export default function Fox() {
    const fox = useGLTF('./Fox/glTF/Fox.gltf')
    const animations = useAnimations(fox.animations, fox.scene)

    const { animationName } = useControls({
        animationName: { options: animations.names }
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action
            .reset()        // Allows to reselect animation
            .fadeIn(0.5)    // Sets fade in time for new animation
            .play()         // Tells new animation to start

        // Enables us to turn off the old animation
        return () => {
            action.fadeOut(0.5) // Fades out the old animation - still not sure exatly how this works...
        }
        // window.setTimeout(() => {
        //     animations.actions.Walk.play()
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
        // }, 2000)
    }, [animationName])
    return <primitive
        object={fox.scene}
        scale={0.02}
        position={[-2.5, 0, 2.5]}
        rotation-y={0.3}
    />
}
