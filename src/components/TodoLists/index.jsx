import React from "react";
import Todo from "../Todo";
import { useSelector, useDispatch } from "react-redux";
import { checkedAllTodo } from '../../features/todosSlice'
import {filterByStatus} from '../../helper/todosHelper'

const TodoLists = () => {
    const todoList = useSelector((state) => state.todos.todoList)
    const status = useSelector((state) => state.todos.status)
    const newTodoList = filterByStatus(todoList, status)
    const isCheckedAll = useSelector((state) => state.todos.isCheckedAll)

    const dispatch = useDispatch()

    const handleToggleAllTodo = () => {
        dispatch(checkedAllTodo())
    }

    return (
        <section className="main">
            <input 
                id="toggle-all" 
                className="toggle-all" 
                type="checkbox" 
                onClick={() => handleToggleAllTodo()}
                checked={isCheckedAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {newTodoList && newTodoList.length > 0 && newTodoList.map(todo => (
                        <Todo 
                            key={todo.id}
                            title={todo.title}
                            id={todo.id}
                            isCompleted={todo.isCompleted}
                        />
                    )
                )}
            </ul>
        </section>
    );
};

export default TodoLists;
