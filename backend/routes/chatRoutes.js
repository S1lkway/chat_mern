const express = require('express')
const router = express.Router()
const {
  getChats,
  newChats,
  createChat,
  deleteChat,
} = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getChats)                // '/api/chats'
router.delete('/:id', protect, deleteChat)        // '/api/chats/:id'

router.post('/newchats', protect, newChats)       // '/api/chats/newchats'
router.post('/', protect, createChat)             // '/api/chats'

module.exports = router