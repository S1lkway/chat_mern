const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')
// console.log('User - ' + req.user.id)
// console.log('Contact - ' + req.body.id)

//* desc GET chats
//* route GET /api/chats
//* access Private
const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({ users: req.user.id }).populate({
    path: 'users',
    select: '_id name email',
    match: { _id: { $ne: req.user.id } } // Исключение текущего пользователя
  });
  res.status(200).json(chats)
})

//* desc get NEW chats
//* route POST /api/chats/newchats
//* access Private
const newChats = asyncHandler(async (req, res) => {
  /// Consts
  const searchEmail = req.body.email
  // console.log(searchEmail)
  const currentUserId = req.user._id;
  // console.log(req.user)

  /// Get a list of users who has chat with current user
  const chatListUsers = await Chat.aggregate([
    {
      $match: {
        users: currentUserId // Находим чаты, где участвует currentUserId
      }
    },
    {
      $unwind: '$users' // Разбиваем массив users на отдельные документы
      // По сути если есть 2 чата с двумя пользователями в users в каждом, то в ответе вместо 2 массивов с подмассивом users придут 4 массива, где в users будет по одной строчке вместо подмассива
    },
    {
      $match: {
        users: { $ne: currentUserId } // Исключаем currentUserId из результатов
        //Прошлая команда создала кучу массивов для каждого пользователя из users. Данной командой мы удаляем все массивы, в которых users = текущему пользователю
      }
    },
    {
      $group: {
        _id: '$users' // Группируем по пользователям (по id)
      }
    },
    {
      $project: {
        _id: 1// Проецируем только id пользователей
      }
    }
  ]);
  /// Get a list of users from DB current user doesn't have chats and email includes searchEmail
  const newChatsData = await User.find({
    $and: [
      { email: { $regex: new RegExp(searchEmail, "i") } }, // "i" - игнорирование регистра
      { _id: { $nin: [currentUserId, ...chatListUsers.map(user => user._id)] } } // Фильтр по id, исключая текущего пользователя и пользователей из chatListUsers
    ]
  });
  // console.log(newChatsData)

  res.status(200).json(newChatsData)
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
    res.status(200).json(req.body.id)
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
    ///Delete all messages that connected to current chat
    await Message.deleteMany({ chat: chatToDelete._id });
    ///Delete chat data from MongoDB
    await chatToDelete.deleteOne()
    res.status(200).json(req.params.id)
  } else {
    res.status(401)
    throw new Error('Chat is not found')
  }
})


module.exports = {
  getChats,
  newChats,
  createChat,
  deleteChat,
}