import { createSlice, nanoid } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [],
    reducers: {
        addTask: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare({ date, title, timeRange, duration }) {
                return {
                    payload: {
                        id: nanoid(),
                        date,
                        title,
                        timeRange,
                        duration,
                        completed: false,
                    },
                };
            },
        },
        toggleComplete(state, action) {
            const t = state.find(t => t.id === action.payload);
            if (t) {t.completed = !t.completed;}
        },
        deleteTasks(state, action) {
            return state.filter(t => !action.payload.includes(t.id));
        },
    },
});

export const { addTask, toggleComplete, deleteTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
