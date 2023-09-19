const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

//* desc GET messages
//* route GET /api/messages
//* access Private
const getMessages = asyncHandler(async (req, res) => {
  /// CONSTS
  const chatData = await Chat.findById(req.params.id).populate({
    path: 'users',
    select: '_id name email',
    match: { _id: { $ne: req.user.id } } // Исключение текущего пользователя
  });
  /// ACTIONS
  const messages = await Message.find({ chat: chatData._id }).populate({
    path: 'user',
    select: '_id name email',
  });
  res.status(200).json({ chatData: chatData, chatMessages: messages })
})

//* desc ADD message
//* route POST /api/messages
//* access Private
const addMessage = asyncHandler(async (req, res) => {
  /// CONSTS
  try {
    const chat = await Chat.findById(req.body.id)
  } catch (error) {
    res.status(401)
    throw new Error('Chat is not found')
  }
  /// CHECKS
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }
  /// ACTIONS
  // Create new message for chat
  const message = await Message.create({
    user: req.user.id,    // User id
    chat: req.body.id,    // Chat id
    text: req.body.text,  // Chat text
  })
  await message.populate({
    path: 'user',
    select: '_id name email',
  })
  res.status(200).json(message)
})

//* desc DELETE message
//* route DELETE /api/messages/:id
//* access Private
const deleteMessage = asyncHandler(async (req, res) => {
  /// CONSTS
  const message = await Message.findById(req.params.id)
  /// CHECKS
  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User is not found')
  }
  // Make sure the logged user matches the message user
  if (message.user._id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('The message belongs to another user')
  }
  /// ACTIONS
  if (message) {
    // Delete message data from MongoDB
    await message.deleteOne()
    res.status(200).json({ id: req.params.id })
  } else {
    res.status(401)
    throw new Error('Message is not found')
  }

})



module.exports = {
  getMessages,
  addMessage,
  deleteMessage,
}