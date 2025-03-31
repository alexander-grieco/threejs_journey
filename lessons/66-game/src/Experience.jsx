import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import { Physics } from '@react-three/rapier'
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'

export default function Experience() {
    const blocksCount = useGame((state) => {
        return state.blocksCount
    })
    const blocksSeed = useGame((state) => state.blocksSeed)


    return <>
        <color args={['#bdebfc']} attach="background" />
        <Physics debug={false}>
            <Lights />
            <Level count={blocksCount} seed={blocksSeed} />
            <Player />
        </Physics>

    </>
}
