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
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         if (e.which === '13' && title) {
        //             dispatch(addTodo({
        //                 id: new Date().valueOf(),
        //                 title,
        //                 isCompleted: false
        //             }))
        //             setTitle('')
        //         }
        //         resolve(true)
        //     }, 1000)
        // })
        if (e.key === 'Enter' && title) {
            dispatch(addTodo({
                id: new Date().valueOf(),
                title,
                isCompleted: false
            }))
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