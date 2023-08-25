import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messagesService from './messagesService'

const initialState = {
  messages: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


//* GET ALL MESSAGES
export const getMessages = createAsyncThunk(
  'messages',
  async (chatId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.getMessages(chatId, token)
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



export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    resetMessages: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /// getChats
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetMessages } = messagesSlice.actions
export default messagesSlice.reducer