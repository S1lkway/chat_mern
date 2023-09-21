import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatsReducer from '../features/chats/chatsSlice'
import messagesReducer from '../features/messages/messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatList: chatsReducer,
    messagesList: messagesReducer,
  },
});
