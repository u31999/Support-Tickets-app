import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoadding: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', 
    async (user, thunkApi) => {
        console.log(user)
    })

export const logIn = createAsyncThunk('auth/logIn', 
    async (user, thunkApi) => {
        console.log(user)
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
})

export default authSlice.reducer