import React, { useEffect } from "react";
import Todo from "../Todo";
import Loading from "../Loading"
import { useSelector, useDispatch } from "react-redux";
import { checkedAllTodo, fetchAsyncTodos } from '../../features/todosSlice'
import {filterByStatus} from '../../helper/todosHelper'

const TodoLists = () => {
    const todoList = useSelector((state) => state.todos.todoList)
    const status = useSelector((state) => state.todos.status)
    const newTodoList = filterByStatus(todoList, status)
    const isCheckedAll = useSelector((state) => state.todos.isCheckedAll)
    const loading = useSelector((state) => state.todos.pending)

    const dispatch = useDispatch()

    const handleToggleAllTodo = () => {
        dispatch(checkedAllTodo())
    }

    useEffect(() => {
        dispatch(fetchAsyncTodos())
    }, [dispatch])

    return (
        <section className="main">
            <input 
                id="toggle-all" 
                className="toggle-all" 
                type="checkbox" 
                onClick={() => handleToggleAllTodo()}
                checked={isCheckedAll}
                readOnly
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {
                    loading === 'success' ? (
                            <>
                                {newTodoList && newTodoList.length > 0 && newTodoList?.map((todo, index) => (
                                        <Todo 
                                            key={index}
                                            title={todo.title}
                                            id={todo.id}
                                            isCompleted={todo.isCompleted}
                                        />
                                    )
                                )}
                            </>
                    ) : loading === 'pending' ? (
                        <div style={{textAlign: 'center'}}>
                            <Loading />
                        </div>
                    ) : (
                        <p style={{textAlign: 'center'}}>Something wrong...</p>
                    )
                }
            </ul>
        </section>
    );
};

export default TodoLists;
