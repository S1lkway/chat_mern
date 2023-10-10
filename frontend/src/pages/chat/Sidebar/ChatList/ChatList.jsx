import { useEffect, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import SocketContext from "../../../../utils/SocketContext"
//- Components
import Card from "./Card"
//- Redux
import { getChats, resetChats } from '../../../../features/chats/chatsSlice'
import { resetMessages } from "../../../../features/messages/messagesSlice"

function ChatList() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { chats, isLoading, isError, message } = useSelector((state) => state.chatList)
  const { chat } = useSelector((state) => state.messagesList)

  /// Put message from other members of chatroom in redux when get it from websocket
  useEffect(() => {
    socket?.on("reset chatlist", (websocketData) => {
      dispatch(getChats())
      if (chat?._id === websocketData.chatId) {
        dispatch(resetMessages())
      }
      toast.info(`User ${websocketData.userData.email}) ${websocketData.type} chat`)
    })
    return () => {
      socket?.off('reset chatlist');
    };
  })

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate('/login')
    }
    dispatch(getChats())
    return () => {
      dispatch(resetChats())
    }
  }, [user, navigate, isError, message, dispatch])
  return (

    <div className="chat_list">
      {chats?.length > 0 ? (
        chats?.map((chat) => (
          <Card key={chat._id} chatId={chat._id} contactData={chat.users[0]} />
        ))
      ) : (

        !isLoading &&
        <div className="empty_chat_list heading">
          <p>You don't have any chat</p>
        </div>
      )}
    </div>
  )
}

export default ChatList