import axios from 'axios'

const API_URL = '/api/chats/'

//* GET ALL CHATS
const getChats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//* GET NEW CHATS
const newChats = async (searchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL + 'newchats', searchData, config)
  return response.data
}

//* GET NEW CHATS
const createChat = async (chatData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, chatData, config)
  return response.data
}

const chatsService = {
  getChats,
  newChats,
  createChat
}

export default chatsService