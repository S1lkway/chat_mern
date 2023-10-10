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
  'chats/getchats',
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

//* CREATE NEW CHAT
export const createChat = createAsyncThunk(
  'chats/create',
  async (chatData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatsService.createChat(chatData, token)
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

//* DELETE CHAT
export const deleteChat = createAsyncThunk(
  'chats/delete',
  async (chatId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await chatsService.deleteChat(chatId, token)
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
      /// createChat
      .addCase(createChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.newChats = state.newChats.filter(
          (contact) => contact._id !== action.payload
        )
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      /// deleteChat
      .addCase(deleteChat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.chats = state.chats.filter(
          (chat) => chat._id !== action.payload
        )
      })
      .addCase(deleteChat.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetChats } = chatsSlice.actions
export default chatsSlice.reducer