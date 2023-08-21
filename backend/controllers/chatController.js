const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
// console.log('User - ' + req.user.id)
// console.log('Contact - ' + req.body.id)

//* desc GET chats
//* route GET /api/chats
//* access Private
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ users: req.user.id })
  res.status(200).json(chats)
})

//* desc CREATE chat
//* route POST /api/chats
//* access Private
const createChat = asyncHandler(async (req, res) => {
  /// CONSTS
  const contact = await User.findById(req.body.id)
  /// CHECKS
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }
  /// ACTIONS
  if (contact) {
    // Check if a chat already exists between the two users
    const existingChat = await Chat.findOne({
      users: { $all: [req.user.id, req.body.id] }
    })
    if (existingChat) {
      res.status(400)
      throw new Error('Chat already exists between the users')
    }
    // Create new chat
    const chat = await Chat.create({
      users: [req.user.id, req.body.id]
    })
    res.status(200).json(chat)
  } else {
    res.status(401)
    throw new Error('Contact is not found')
  }
})

//* desc DELETE chat
//* route POST /api/chats/:id
//* access Private
const deleteChat = asyncHandler(async (req, res) => {
  const chatToDelete = await Chat.findById(req.params.id)
  if (chatToDelete) {
    ///Delete chat data from MongoDB
    await chatToDelete.deleteOne()
    res.status(200).json({ id: req.params.id })
  } else {
    res.status(401)
    throw new Error('Chat is not found')
  }
})


module.exports = {
  getChats,
  createChat,
  deleteChat,
}