import { useState, useMemo } from 'react'
import Clicker from './Clicker.jsx'
import People from './People.jsx'


export default function App({ clickersCount, children }) {
    const [hasClicker, setHasClicker] = useState(true)

    const [count, setCount] = useState(0)

    const toggleClickerClick = () => {
        setHasClicker(!hasClicker)
    }

    const increment = () => {
        setCount(count + 1)
    }

    // useMemo is a way to store information in a cache. The last input is the list of variables that cause the function to be re-evaluated
    const colors = useMemo(() => {
        const colors = []
        for (let i = 0; i < clickersCount; i++) {
            colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%)`)
        }
        return colors
    }, [clickersCount])

    // const tempArray = [...Array(clickersCount)] // the "..." is the spread operator and allows us to traverse over an otherwise emptry array with "map"
    // tempArray.map((value, index) => {
    //     console.log(value, index)
    // })

    return <>
        {children}

        <div>Total count: {count} </div>

        <button onClick={toggleClickerClick}>{hasClicker ? 'Hide' : 'Show'} Clicker</button>
        {
            hasClicker && <>
                {[...Array(clickersCount)].map((_, index) => {
                    return <Clicker
                        key={index /* avoid this wherever possible */}
                        increment={increment}
                        keyName={`count${index}`}
                        color={colors[index]}
                    />
                })}
                {/* <Clicker increment={increment} keyName="countB" color={`hsl(${Math.random() * 360}deg, 100%, 70%)`} /> */}
                {/* <Clicker increment={increment} keyName="countC" color={`hsl(${Math.random() * 360}deg, 100%, 70%)`} /> */}
            </>
        }
        <People />
    </>
}
