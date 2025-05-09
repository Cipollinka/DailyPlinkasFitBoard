import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTodos = createAsyncThunk('todos/load', async () => {
    const json = await AsyncStorage.getItem('todos');
    return json ? JSON.parse(json) : [];
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loaded: false,
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.unshift(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {todo.completed = !todo.completed;}
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        clearCompleted: state => {
            state.items = state.items.filter(t => !t.completed);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadTodos.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loaded = true;
            })
            .addMatcher(
                action =>
                    [
                        todoSlice.actions.addTodo.type,
                        todoSlice.actions.toggleTodo.type,
                        todoSlice.actions.deleteTodo.type,
                        todoSlice.actions.clearCompleted.type,
                    ].includes(action.type),
                state => {
                    AsyncStorage.setItem('todos', JSON.stringify(state.items));
                }
            );
    },
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
