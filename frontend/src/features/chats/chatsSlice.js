import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import chatsService from './chatsService'

const initialState = {
  chats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//* GET ALL CHATS
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
  },
})

export const { resetChats } = chatsSlice.actions
export default chatsSlice.reducer