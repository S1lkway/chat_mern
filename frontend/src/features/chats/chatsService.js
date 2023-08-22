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

const chatsService = {
  getChats,

}

export default chatsService