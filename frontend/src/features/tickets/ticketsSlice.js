import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketsService from './ticketsService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Crete ticket
export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketsService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user tickets
export const getUserTickets = createAsyncThunk(
  'tickets/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketsService.getTickets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const {reset} = ticketSlice.actions

export default ticketSlice.reducer