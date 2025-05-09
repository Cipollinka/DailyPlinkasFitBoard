import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'teamsData';

export const loadTeams = createAsyncThunk('teams/load', async () => {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
});

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        collections: [],
        loaded: false,
    },
    reducers: {
        addCollection: (state, action) => {
            state.collections.unshift({ name: action.payload, people: [] });
        },
        deleteCollection: (state, action) => {
            state.collections.splice(action.payload, 1);
        },
        addPerson: (state, action) => {
            const col = state.collections.find(c => c.name === action.payload.collectionName);
            if (col) {col.people.push(action.payload.person);}
        },
        updatePerson: (state, action) => {
            const col = state.collections.find(c => c.name === action.payload.collectionName);
            if (col && col.people[action.payload.index]) {
                col.people[action.payload.index] = action.payload.person;
            }
        },
        removePerson: (state, action) => {
            const col = state.collections.find(c => c.name === action.payload.collectionName);
            if (col) {col.people.splice(action.payload.index, 1);}
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadTeams.fulfilled, (state, action) => {
                state.collections = action.payload;
                state.loaded = true;
            })
            .addMatcher(
                action =>
                    action.type.startsWith('teams/') &&
                    !action.type.endsWith('/load'),
                state => {
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.collections));
                }
            );
    },
});

export const {
    addCollection,
    deleteCollection,
    addPerson,
    updatePerson,
    removePerson,
} = teamsSlice.actions;
export default teamsSlice.reducer;
