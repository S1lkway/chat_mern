import { useRef, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SocketContext from '../../../utils/SocketContext'
// - Components
import AddMessageBar from './components/AddMessageBar'
import Message from './components/Message'
// - Redux
import { websocketMessage } from '../../../features/messages/messagesSlice'

function Messages(props) {
  /// Consts
  const socket = useContext(SocketContext);
  // const socket = props.socket
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { messages, chat, isLoadingMessages } = useSelector((state) => state.messagesList)
  const messagesContainerRef = useRef(null);

  /// Scroll container dows when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  /// Join and leaving chatroom when chat is changes
  useEffect(() => {
    if (!isLoadingMessages) {
      socket.emit('join chat', { userName: user.name, chatId: chat._id });
      return () => {
        socket.emit('leave chat', { userName: user.name, chatId: chat._id })
      }
    }
    // eslint-disable-next-line
  }, [chat])

  /// Put message from other members of chatroom in redux when get it from websocket
  useEffect(() => {
    socket.on("websocket message", (websocketMessageData) => {
      // console.log(websocketMessageData)
      dispatch(websocketMessage(websocketMessageData))
    })
    return () => {
      socket.off('websocket message');
    };
  })

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