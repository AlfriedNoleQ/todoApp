import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../features/todosSlice'

const Header = () => {
    const [title, setTitle] = useState('')

    const dispatch = useDispatch()

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleAddTodo = (e) => {
        if (e.key === 'Enter' && title) {
            dispatch(addTodo(title))
            setTitle('')
        }
    }

    return (
        <>
            <header className="header">
                <h1>todos</h1>
                <input 
                    className="new-todo" 
                    placeholder="What needs to be done?" 
                    onChange={changeTitle}
                    onKeyPress={handleAddTodo}
                    value={title}
                    autoFocus
                />
            </header>
        </>
  )
}

export default Header