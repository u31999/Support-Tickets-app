import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketsService from './ticketsService'

const initialState = {
    tickets: [],
    ticket: {},
    isErrer: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {

    }
})

export const {reset} = ticketSlice.actions

export default ticketSlice.reducer