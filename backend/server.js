const express = require('express')
const path = require('path');
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const app = express()


// //* PATH TO GET IMAGES FROM BACKEND TO FRONTEND
// /* We make absolute path to folder with files */
// const articleUploadsPath = path.join(__dirname, 'uploads', 'articleUploads');
// /* Set path on frontend that will use backend path in articleUploadsPath */
// app.use('/uploads/articleUploads', express.static(articleUploadsPath));


//* MIDDLEWARES
/* Used to parse incoming requests with JSON payloads */
app.use(express.json())
/* Used to parse incoming requests with URL-encoded payloads 
The extended option determines how the URL-encoded data is parsed. When set to false, the data is parsed using the querystring*/
app.use(express.urlencoded({ extended: false }))

app.use('/images', express.static('frontend/src/images'));

//*  ROUTES  
// routes for registration, edit user and authorization
app.use('/api/users', require('./routes/userRoutes'))
// routes to get, create and delete chats
app.use('/api/chats', require('./routes/chatRoutes'))
// routes to get, add and delete messages
app.use('/api/messages', require('./routes/messageRoutes'))

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

/* Provides a basic error handling mechanism in Express that sends a JSON response with an error message and, optionally, the stack trace */
app.use(errorHandler)

const server = app.listen(port, () => console.log(`Server started on port ${port}`.yellow.underline))


//* WEBSOCKET IO
//* We are making a new WebSocket server
const io = require("socket.io")(server, {
  //If connected user doesn't do anything 60 seconds he is disconnect
  pingTimeout: 900000,
  cors: {
    origin: "https://chat-mern-eb01.onrender.com",
    // credentials: true,
  },
});

//* It's sockets(methods) of websocket connection
io.on("connection", (socket) => {
  /// When someone connected we will see it on console
  // console.log('A user connected to socket.io');
  /// User joining to private chat
  socket.on("join private", (chatData) => {
    socket.join(chatData._id);
    // console.log(`User ${chatData.name} Joined Privat Chat: ` + chatData._id);
  });
  /// User joining a chat to get messages from other members of that chat live
  socket.on("join chat", (chatData) => {
    socket.join(chatData.chatId);
    // console.log(`User ${chatData.userName} Joined Chat: ` + chatData.chatId);
  });
  /// User leaving connected chat
  socket.on("leave chat", (chatData) => {
    socket.leave(chatData.chatId);
    // console.log(`${chatData.userName} Leaved Chat: ` + chatData.chatId);
  });

  /// Getting message from user in chat and send it to others members of this chat live
  socket.on("new message", (websocketMessageData) => {
    // console.log(`Got new message from ${websocketMessageData.user.name} to Chat: ${websocketMessageData.chat}`)
    socket.broadcast.to(websocketMessageData.chat).emit('websocket message', websocketMessageData);
  })

  /// User removes chat and reset chats of every connected users
  socket.on("reset chatlist", (websocketData) => {
    // console.log(`User ${websocketData.userData.email} ${websocketData.type} chat`)
    socket.broadcast.to(websocketData.contactData._id).emit('reset chatlist', websocketData);
  })

  /// Disconnect from socket io
  socket.on('disconnect', () => {
    // console.log('User disconnected from socket.io');
  });
});

