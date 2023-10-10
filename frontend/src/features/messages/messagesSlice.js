import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messagesService from './messagesService'


const initialState = {
  chat: null,
  messages: [],
  isError: false,
  isSuccess: false,
  isLoadingMessages: false,
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

//* ADD MESSAGE TO DATABASE
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

//* GET WEBSOCKET MESSAGE
export const websocketMessage = createAsyncThunk(
  'messages/websocket',
  async (websocketMessageData, thunkAPI) => {
    try {
      return websocketMessageData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


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
        state.isLoadingMessages = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoadingMessages = false
        state.isSuccess = true
        const { chatData, chatMessages } = action.payload;
        state.chat = chatData
        state.messages = chatMessages
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoadingMessages = false
        state.isError = true
        state.message = action.payload
      })
      /// Add Message
      .addCase(addMessage.pending, (state) => {
        state.isLoadingMessages = true
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.isLoadingMessages = false
        state.isSuccess = true
        state.messages.push(action.payload)
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.isLoadingMessages = false
        state.isError = true
        state.message = action.payload
      })
      /// Websocket Message
      .addCase(websocketMessage.pending, (state) => {
        state.isLoadingMessages = true
      })
      .addCase(websocketMessage.fulfilled, (state, action) => {
        state.isLoadingMessages = false
        state.isSuccess = true
        state.messages.push(action.payload)
      })
      .addCase(websocketMessage.rejected, (state, action) => {
        state.isLoadingMessages = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { resetMessages } = messagesSlice.actions
export default messagesSlice.reducer