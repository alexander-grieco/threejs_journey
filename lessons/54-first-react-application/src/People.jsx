import { useState, useEffect } from 'react'

export default function People() {
    const [people, setPeople] = useState([])

    // make the fetching function asynchronous
    const getPeople = async () => {
        // New way
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)

        // // Old way
        // // Fetches endpoint
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json()) // process the promise returned from endpoint
        //     .then(result => setPeople(result)) // process the promise returned from the json function on the original response
    }

    useEffect(() => {
        getPeople()
    }, [])
    return <div>
        <h2>People</h2>
        <ul>
            {people.map(person =>
                <li key={person.id}>{person.name}</li>
            )}
        </ul>
    </div>
}
