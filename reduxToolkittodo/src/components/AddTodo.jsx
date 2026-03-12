import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


function AddTodo() {

    const [input, setInput] = useState('');
    const dispatch = useDispatch()



    return (
        <div>AddTodo</div>
    )
}

export default AddTodo