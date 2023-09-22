import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'
let socket;

// import WebSocket from '../components/WebSocket'
// - Redux
// import { getMessages } from '../../../features/messages/messagesSlice'

function Messages() {
  // const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { messages, chat, isLoading } = useSelector((state) => state.messagesList)

  useEffect(() => {
    if (!isLoading) {
      socket = io('http://localhost:3000')
      // let chatData = { userName: user.name, chatId: chat._id }
      socket.emit('join chat', { userName: user.name, chatId: chat._id });
    }

    return () => {
      // let chatData = { userName: user.name, chatId: chat._id }
      socket.emit('leave chat', { userName: user.name, chatId: chat._id })
      socket.disconnect()
    }
  }, [chat, user, isLoading])


  return (
    <>
      <div className="messages_area">

        {messages?.length > 0 ? (
          messages?.map((message, index) => (
            <Message key={index} messageData={message} />
          ))
        ) : (

          <div className="empty_messages_box heading">
            <p>Write first message to start chat</p>
          </div>
        )}
      </div>
      <AddMessageBar />
    </>
  )
}

export default Messages