import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storge
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: null ? user : null,
    isError: false,
    isSuccess: false,
    isLoadding: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', 
    async (user, thunkApi) => {
        try{
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && 
                error.response.data &&
                error.response.data.message ) || error.message ||
                error.tiString()

                return thunkApi.rejectWithValue(message)
        }
    })

export const logIn = createAsyncThunk('auth/logIn', 
    async (user, thunkApi) => {
        console.log(user)
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadding = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoadding = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoadding = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoadding = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer