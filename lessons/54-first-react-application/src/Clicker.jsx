import { useState, useEffect, useRef } from "react"

export default function Clicker({ increment, keyName, color }) {
    // useState returns an array -> a value and a function to update that value
    // we set count to the count, and setCount to the function to update the count
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

    const buttonRef = useRef()
    // console.log(buttonRef) // This will be null, becuase the DOM elements aren't rendered yet. Need to wait until the useEffect function is called (or within the useEffect function)

    // second argument tells useEffect when to be called
    // An empty array = only called on first render -> this is useful when loading from local storage
    // This function restores count from local storage
    useEffect(() => {
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon'

        // This gets called when the component is destroyed (I dont really get this - and neither does Bruno)
        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    // This function updates count on click
    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])


    const buttonClick = () => {
        setCount(count + 1)
        increment()
    }

    return <div>
        <div style={{ color: color }}>Clicks count: {count}</div>
        <button ref={buttonRef} onClick={buttonClick}>Click me</button>
    </div>
}
