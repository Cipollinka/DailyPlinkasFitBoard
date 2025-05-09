import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notificationsEnabled: false,
    hasSeenOnboarding: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setNotificationsEnabled(state, action) {
            state.notificationsEnabled = action.payload;
        },
        setHasSeenOnboarding(state, action) {
            state.hasSeenOnboarding = action.payload;
        },
    },
});

export const { setNotificationsEnabled, setHasSeenOnboarding } = settingsSlice.actions;
export default settingsSlice.reducer;
