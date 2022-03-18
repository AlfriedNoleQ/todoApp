import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../../features/todosSlice'
import Loading from '../Loading'

const Header = () => {
    const [title, setTitle] = useState('')
    const addLoading = useSelector((state) => state.todos.addDataPending)

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
            <header className="header" style={{position: 'relative'}}>
                <h1>todos</h1>
                <input 
                    className="new-todo" 
                    placeholder="What needs to be done?" 
                    onChange={changeTitle}
                    onKeyPress={handleAddTodo}
                    value={title}
                    disabled={addLoading === 'pending'}
                    autoFocus
                />
                {
                    addLoading === 'pending' ? (
                        <div className="add-data-pending">
                            <Loading />
                        </div>
                    ) : (<></>)
                }
            </header>
        </>
  )
}

export default Header