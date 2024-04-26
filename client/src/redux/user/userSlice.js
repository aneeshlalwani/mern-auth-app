import { createSlice } from "@reduxjs/toolkit";

// DEFINED INITIAL STATES OF APP
const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

// CREATING SLICE
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) =>{
            state.loading = true; // This line should be updated
        },
        signInSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
    }
})

// Corrected export statements
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
