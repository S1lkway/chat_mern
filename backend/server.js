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

//*  ROUTES  
// routes for registration, edit user and authorization
app.use('/api/users', require('./routes/userRoutes'))
// routes to get, create and delete chats
app.use('/api/chats', require('./routes/chatRoutes'))
// routes to get, add and delete messages
app.use('/api/messages', require('./routes/messageRoutes'))

/* Provides a basic error handling mechanism in Express that sends a JSON response with an error message and, optionally, the stack trace */
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.yellow.underline))


//* WEBSOCKET IO
//* We are making a new WebSocket server
const io = require("socket.io")(server, {
  //If connected user doesn't do anything 60 seconds he is disconnect
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

//* It's sockets(methods) of websocket connection
io.on("connection", (socket) => {
  //When someone connected we will see it on console
  console.log(`Connected to ${socket}`);
});

