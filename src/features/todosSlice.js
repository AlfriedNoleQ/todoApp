import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isNotCheckedAll, filterByStatus } from "../helper/todosHelper"
import { toast } from 'react-toastify'
import todosServer from '../common/api/todosApi'

export const fetchAsyncTodos = createAsyncThunk(
    "todos/fetchAsyncTodos", 
    async () => {
        const response = await todosServer.getAll()
        return response.data
    })

export const addTodo = createAsyncThunk(
    'todos/addTodo', 
    async data => {
        console.log('add todo data: ', data)
        await todosServer.create(data)
        return data
    })

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo', 
    async todoId => {
        await todosServer.remove(todoId)
		return todoId
    })

export const editTodo = createAsyncThunk(
    'todos/editTodo', 
    async ({ todoId, data }) => {
        const response = await todosServer.update(todoId, data)
        console.log('createAsyncThunk response:', response.data)
        return response.data
    })

const initialState = {
    todoList: [],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL',
    fetchDataPending: null,
    addDataPending: null
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        toggleTodo: (state, action) => {
            const id = action.payload
            state.todoList = state.todoList.map(todo => {
                if(todo.id === id) todo.isCompleted = !todo.isCompleted
                return todo
            })
            state.isCheckedAll = !isNotCheckedAll(state.todoList)
            toast.info(`TOGGLE TODO ${id}`)
        },
        getTodoId: (state, action) => {
            state.todoEditingId = action.payload
        },
        cancelEditing: (state, action) => {
            state.todoEditingId = ''
            toast.info('CANCEL EDITING!')
        },
        // editTodo: (state, action) => {
        //     const todoId = state.todoList.findIndex(todo => todo.id === action.payload.id)
        //     if(todoId >= 0) {
        //         state.todoList[todoId].title = action.payload.title
        //     }
        //     console.log('extraReducers action payload: ', action.payload.title)
        //     state.todoEditingId = ''
        //     toast.success('UPDATE TODO SUCCESS!')
        // },
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
        }
    },
    extraReducers: {
        // Fetch data
        [fetchAsyncTodos.pending]: (state, action) => {
            console.log("Fetch Data Pending...");
            state.fetchDataPending = 'pending'
        },
        [fetchAsyncTodos.fulfilled]: (state, action) => {
            console.log("Fetched Successfully!");
            state.fetchDataPending = 'success'
            state.todoList = action.payload
            toast.success("FETCHED SUCCESS!")
        },
        [fetchAsyncTodos.rejected]: (state, action) => {
            state.fetchDataPending = 'rejected'
            toast.error("FETCHED ERROR!")
        },
        // Add todo
        [addTodo.pending]: (state) => {
            console.log("Add Todo Pending...");
            state.addDataPending = 'pending'
        },
        [addTodo.fulfilled]: (state, action) => {
            state.addDataPending = 'success'
            state.todoList.push(action.payload)
            toast.success('ADD NEW TODO SUCCESS!')
        },
        // Delete todo
        [deleteTodo.pending]: () => {
            console.log('Delete Todo Pending...')
        },
        [deleteTodo.fulfilled]: (state, action) => {
            console.log('Delete Todo Successfully')
            state.todoList = state.todoList.filter(todo => todo.id !== action.payload)
            toast.error(`TODO IS REMOVING!`)
        },
        // Update Todo
        [editTodo.pending]: () => {
            console.log('editTodo.pending: Updating...')
        },
        [editTodo.fulfilled]: (state, action) => {
            // const todoId = state.todoList.findIndex(todo => todo.id === action.payload.id)
            // if(todoId >= 0) {
            //     state.todoList[todoId].title = action.payload.title
            // }
            const todoId = action.payload.id
            state.todoList = state.todoList.map(todo => {
                if(todo.id === todoId) todo.title = action.payload.title
                return todo
            })
            state.todoEditingId = ''
            toast.success('UPDATE TODO SUCCESS!')
            console.log('extraReducers action payload: ', action.payload.title)
            state.todoEditingId = ''
            toast.success('UPDATE TODO SUCCESS!')
        },
        [editTodo.rejected]: (state, action) => {
            console.log('editTodo.rejected: Updating fail...')
            state.todoEditingId = ''
            toast.error(`UPDATE FAIL!`)
        }
    }
})

export const { 
    //addTodo, 
    toggleTodo, 
    // deleteTodo,
    getTodoId,
    //editTodo, 
    cancelEditing, 
    checkedAllTodo,
    setStatusFilter,
    clearCompleteTodo
} = todosSlice.actions

export default todosSlice.reducer