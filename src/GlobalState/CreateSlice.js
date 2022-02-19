import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./InitialState";

const watchSlice = createSlice({
    name: "watchSlice",
    initialState: InitialState,
    reducers: {
        userlogOut: (state, action) => {
            state.isUserLogin = action.payload;
        },
        isLogin: (state, action) => {
            state.isUserLogin = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setWatchItems: (state, action) => {
            state.items = action.payload
        }
    },
});

export const { isLogin, setCurrentUser, userlogOut, setWatchItems } = watchSlice.actions;

export const watchReducer = watchSlice.reducer;