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

//* ADD MESSAGE
export const addMessage = createAsyncThunk(
  'messages/add',
  async (newMessageData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messagesService.addMessage(newMessageData, token)
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
      /// Get Chats
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
      /// Add Message
      .addCase(addMessage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages.messages.push(action.payload)
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetMessages } = messagesSlice.actions
export default messagesSlice.reducer