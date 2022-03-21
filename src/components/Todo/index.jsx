import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo, getTodoId, cancelEditing } from '../../features/todosSlice'

const Todo = (props) => {
    const { isCompleted, title, id } = props
    const editingId = useSelector((state) => state.todos.todoEditingId)
    const isEditing = editingId === id
    const [text, setText] = useState(title);
    
    const dispatch = useDispatch()

    const handleToggleTodo = id => {
        dispatch(toggleTodo(id))
    }

    const handleDeleteTodo = id => {
        dispatch(deleteTodo(id))
    }

    const getTodoEditingId = id => {
        dispatch(getTodoId(id))
        console.log('CurrentTodoId:', id)
    }

    const newTodo = {
        id,
        title: text,
        isCompleted
    }
    // console.log(newTodo)

    const handleEditTodo = (e) => {
        if (e.key === 'Enter' && text) {
            console.log('Component Data Update: ', newTodo)
            dispatch(editTodo(id, newTodo))
        }
    }

    return (
        <>
            <li 
                className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
            >
                {
                    !isEditing ?
                    <div className="view">
                        <input 
                            className="toggle" 
                            type="checkbox" 
                            checked={isCompleted}
                            onChange={() => handleToggleTodo(id)}
                        />

                        <label onDoubleClick={() => getTodoEditingId(id)} >
                            {text}
                        </label>

                        <button 
                            className="destroy"
                            onClick={() => handleDeleteTodo(id)}
                        >
                        </button>
                    </div> 
                    :
                    <input
                        className="edit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={handleEditTodo}
                        onBlur={() => dispatch(cancelEditing())}
                        autoFocus
                    />
                }
            </li>
        </>
    )
}

export default Todo