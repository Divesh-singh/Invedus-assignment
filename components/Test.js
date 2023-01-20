import {useEffect, useState, } from 'react';

const TestFunction =() =>{
    const [counter, setCounter] = useState(0)

    useEffect=()=>{
        
    }

    const handleSubmit =()=>{
        setCounter(counter+1)
    }


    return(<>
    <button onClick={handleSubmit} > click to update</button>
    <p>
        you clicked the button {counter} times
    </p>
    </>)
}

export default TestFunction;