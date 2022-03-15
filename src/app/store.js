import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todosSlice'

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store