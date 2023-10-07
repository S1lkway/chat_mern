import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
//- Components
import Card from "./Card"
//- Redux
import { getChats, resetChats } from '../../../../features/chats/chatsSlice'
import { resetMessages } from "../../../../features/messages/messagesSlice"

function ChatList(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = props.socket

  const { user } = useSelector((state) => state.auth)
  const { chats, isLoading, isError, message } = useSelector((state) => state.chatList)

  /// Put message from other members of chatroom in redux when get it from websocket
  useEffect(() => {
    socket?.on("reset chatlist", (websocketData) => {
      // console.log(`Chat with ${websocketData.userData.name} (${websocketData.userData.email}) was ${websocketData.type}`)
      dispatch(getChats())
      dispatch(resetMessages())
      toast.error(`User ${websocketData.userData.email}) ${websocketData.type} chat`)
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
          <Card key={chat._id} chatId={chat._id} contactData={chat.users[0]} socket={socket} />
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