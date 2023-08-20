const express = require('express')
const router = express.Router()
const {
  getChats,
  createChat,
  deleteChat,
} = require('../controllers/chatController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getChats)                // '/api/chats'
router.post('/', protect, createChat)             // '/api/chats'
router.delete('/:id', protect, deleteChat)        // '/api/chats/:id'

module.exports = router