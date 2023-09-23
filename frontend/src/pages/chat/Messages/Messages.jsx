import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'

// import WebSocket from '../components/WebSocket'
// - Redux
// import { getMessages } from '../../../features/messages/messagesSlice'

function Messages(props) {
  const socket = props.socket
  // const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { messages, chat } = useSelector((state) => state.messagesList)
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    //Scroll container dows when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.emit('join chat', { userName: user.name, chatId: chat._id });
    return () => {
      socket.emit('leave chat', { userName: user.name, chatId: chat._id })
    }
    // eslint-disable-next-line
  }, [chat])


  return (
    <>
      <div ref={messagesContainerRef} className="messages_area">

        {messages?.length > 0 ? (
          messages?.map((message, index) => (
            <Message key={index} messageData={message} />
          ))
        ) : (

          <div className="heading">
            <p>Write first message to start chat</p>
          </div>
        )}
      </div>
      <AddMessageBar />
    </>
  )
}

export default Messages