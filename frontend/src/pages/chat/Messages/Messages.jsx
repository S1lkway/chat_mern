import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'
// - Redux
// import { getMessages } from '../../../features/messages/messagesSlice'

function Messages(props) {
  const socket = props.socket
  // const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { messages, chat, isLoading } = useSelector((state) => state.messagesList)
  const messagesContainerRef = useRef(null);
  const [showMessages, setShowMessages] = useState([])

  useEffect(() => {
    //Scroll container dows when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [showMessages]);

  useEffect(() => {
    if (!isLoading) {
      socket.emit('join chat', { userName: user.name, chatId: chat._id });

      return () => {
        socket.emit('leave chat', { userName: user.name, chatId: chat._id })
      }
    }

    // eslint-disable-next-line
  }, [chat])

  useEffect(() => {
    if (!isLoading) {
      setShowMessages(messages)
    }
    // eslint-disable-next-line
  }, [messages])


  return (
    <>
      <div ref={messagesContainerRef} className="messages_area">

        {showMessages?.length > 0 ? (
          showMessages?.map((message, index) => (
            <Message key={index} messageData={message} />
          ))
        ) : (

          <div className="heading">
            <p>Write first message to start chat</p>
          </div>
        )}
      </div>
      <AddMessageBar socket={socket} />
    </>
  )
}

export default Messages