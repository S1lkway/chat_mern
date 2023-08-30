import axios from 'axios'

const API_URL = '/api/messages/'

//* GET ALL MESSAGES
const getMessages = async (chatId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + chatId, config)
  return response.data
}

//* ADD NEW MESSAGES
const addMessage = async (newMessageData, token) => {
  /// Make config
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  const response = await axios.post(API_URL, newMessageData, config)
  return response.data
}

//* DELETE MESSAGE
const deleteMessage = async (messageId, token) => { }


const messagesService = {
  getMessages,
  addMessage,
  deleteMessage,
}

export default messagesService