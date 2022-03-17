import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { isNotCheckedAll, filterByStatus } from "../helper/todosHelper"
import { toast } from 'react-toastify'
import todosApi from '../common/api/todosApi'

export const fetchAsyncTodos = createAsyncThunk(
    "todos/fetchAsyncTodos", 
    async () => {
        const response = await todosApi.get(`/todos`)
        return response.data
    })

export const addTodo = createAsyncThunk(
    'todos/addTodo', 
    async title => {
        const newTodo = {
            id: nanoid(),
            title,
            isCompleted: false
        }
    
        await todosApi.post('/todos', newTodo)
    
        return newTodo
    })

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo', 
    async todoId => {
        await todosApi.delete(`/todos/${todoId}`)
		return todoId
    })

// export const editTodo = createAsyncThunk(
//     'todos/editTodo', 
//     async (todoId, title) => {
//         await todosApi.put(`/todos/${todoId}`, title)
    
//         return title
//     })

const initialState = {
    todoList: [],
    todoEditingId: '',
    isCheckedAll: false,
    status: 'ALL',
    pending: null
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
            // localStorage.setItem('todos', JSON.stringify(state.todoList))
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
            // localStorage.setItem('todos', JSON.stringify(state.todoList))
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
            // localStorage.setItem('todos', JSON.stringify(state.todoList))
        }
    },
    extraReducers: {
        // Fetch data
        [fetchAsyncTodos.pending]: (state, action) => {
            console.log("Fetch Data Pending...");
            state.pending = 'pending'
        },
        [fetchAsyncTodos.fulfilled]: (state, action) => {
            console.log("Fetched Successfully!");
            state.pending = 'success'
            state.todoList = action.payload
            toast.success("FETCHED SUCCESS!")
        },
        [fetchAsyncTodos.rejected]: (state, action) => {
            state.pending = 'rejected'
            toast.error("FETCHED ERROR!")
        },
        // Add todo
        [addTodo.pending]: () => {
            console.log("Add Todo Pending...");
        },
        [addTodo.fulfilled]: (state, action) => {
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
        // [editTodo.pending]: () => {
        //     console.log('Updating...')
        // },
        // [editTodo.fulfilled]: (state, action) => {
        //     const { id, title } = action.payload
        //     state.todoList = state.todoList.map(todo => {
        //         if(todo.id === id) todo.title = title
        //         return todo
        //     })
        //     state.todoEditingId = ''
        //     toast.success('UPDATE TODO SUCCESS!')
        // }
    }
})

export const { 
    //addTodo, 
    toggleTodo, 
    // deleteTodo,
    getTodoId,
    editTodo, 
    checkedAllTodo,
    setStatusFilter,
    clearCompleteTodo
} = todosSlice.actions

export default todosSlice.reducer