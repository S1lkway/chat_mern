import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatsService from './chatsService'

const initialState = {
  chats: [],
  newChats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//* GET MY CHATS
export const getChats = createAsyncThunk(
  'chats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatsService.getChats(token)
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

//* GET NEW CHATS
export const newChats = createAsyncThunk(
  'chats/newchats',
  async (searchData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatsService.newChats(searchData, token)
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

//*CHATS SLICE
export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    resetChats: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /// getChats
      .addCase(getChats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = action.payload
      })
      .addCase(getChats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      /// newChats
      .addCase(newChats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(newChats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.newChats = action.payload
      })
      .addCase(newChats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetChats } = chatsSlice.actions
export default chatsSlice.reducer