import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//- Components
import Card from "./components/Card"
//- Redux
import { getChats, resetChats } from '../../../features/chats/chatsSlice'

function ChatList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { chats, isError, message } = useSelector((state) => state.chats)

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
          <Card key={chat._id} chatId={chat._id} userData={chat.users[0]} />
        ))
      ) : (
        <div className="empty_chat_list heading">
          <p>You don't have any chat</p>
        </div>
      )}
    </div>
  )
}

export default ChatList