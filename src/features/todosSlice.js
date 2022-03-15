import { createSlice } from '@reduxjs/toolkit'
import { isNotCheckedAll, filterByStatus } from "../helper/todosHelper"
import { toast } from 'react-toastify'

const initialState = {
    todoList: localStorage.getItem('todos') 
    ? JSON.parse(localStorage.getItem('todos'))
    : [],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL'
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = action.payload
            state.todoList.push(newTodo)
            toast.success('ADD NEW TODO SUCCESS!')
            localStorage.setItem('todos', JSON.stringify(state.todoList))
        },
        toggleTodo: (state, action) => {
            const todoId = action.payload
            state.todoList = state.todoList.map(todo => {
                if(todo.id === todoId) todo.isCompleted = !todo.isCompleted
                return todo
            })
            state.isCheckedAll = !isNotCheckedAll(state.todoList)
            toast.info(`TOGGLE TODO ${todoId}`)
            localStorage.setItem('todos', JSON.stringify(state.todoList))
        },
        deleteTodo: (state, action) => {
            const todoId = action.payload
            state.todoList = state.todoList.filter(todo => todo.id !== todoId)
            toast.error(`TODO ${todoId} IS REMOVING!`)
            localStorage.setItem('todos', JSON.stringify(state.todoList))
        },
        getTodoId: (state, action) => {
            state.todoEditingId = action.payload
        },
        editTodo: (state, action) => {
            const todoId = action.payload.id
            state.todoList = state.todoList.map(todo => {
                if(todo.id === todoId) todo.title = action.payload.title
                return todo
            })
            state.todoEditingId = ''
            toast.success('UPDATE TODO SUCCESS!')
            localStorage.setItem('todos', JSON.stringify(state.todoList))
        },
        checkedAllTodo: (state, action) => {
            state.todoList = state.todoList.map(todo => {
                todo.isCompleted = !state.isCheckedAll
                return todo
            })
            state.isCheckedAll = !state.isCheckedAll
            toast.info('CHECK ALL TODOS!')
        },
        setStatusFilter: (state, action) => {
            state.status = action.payload
        },
        clearCompleteTodo: (state, action) => {
            state.todoList = filterByStatus(state.todoList, 'ACTIVE')
            toast.error(`ALL COMPLETED TODO IS REMOVING!`)
            localStorage.setItem('todos', JSON.stringify(state.todoList))
        }
    }
})

export const { 
    addTodo, 
    toggleTodo, 
    deleteTodo,
    getTodoId,
    editTodo, 
    checkedAllTodo,
    setStatusFilter,
    clearCompleteTodo
} = todosSlice.actions

export default todosSlice.reducer