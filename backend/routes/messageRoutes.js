const express = require('express')
const router = express.Router()
const {
  getMessages,
  addMessage,
  deleteMessage,
} = require('../controllers/messageController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', protect, getMessages)            // '/api/messages/:id'
router.post('/', protect, addMessage)            // '/api/messages'
router.delete('/:id', protect, deleteMessage)    // '/api/messages/:id'

module.exports = router