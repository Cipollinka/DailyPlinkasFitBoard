import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import settingsReducer from './slices/settingsSlice';
import tasksReducer from './slices/tasksSlice';
import todoReducer from './slices/todoSlice';
import teamsReducer from './slices/teamsSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['settings', 'tasks', 'todos', 'teams'],
};

const rootReducer = combineReducers({
    settings: settingsReducer,
    tasks: tasksReducer,
    todos: todoReducer,
    teams: teamsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
