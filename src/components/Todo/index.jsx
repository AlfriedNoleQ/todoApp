import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo, getTodoId } from '../../features/todosSlice'

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
        console.log(id)
    }

    const newTodo = {
        id,
        title: text,
        isCompleted
    }

    const handleEditTodo = (e) => {
        if (e.key === 'Enter' && text) {
            console.log(newTodo)
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
                        autoFocus
                    />
                }
            </li>
        </>
    )
}

export default Todo