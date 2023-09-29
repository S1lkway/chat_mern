import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FaDeleteLeft } from "react-icons/fa6";
// - Redux
import { getMessages, resetMessages } from '../../../../features/messages/messagesSlice'
import { deleteChat } from '../../../../features/chats/chatsSlice';


function Card(props) {
  const dispatch = useDispatch()
  const { chat } = useSelector((state) => state.messagesList)
  const [currentChat, setCurrentChat] = useState('')
  const chatId = props.chatId
  const userData = props.userData

  useEffect(() => {
    setCurrentChat(chat?._id)
  }, [chat])


  const openChat = (id) => {
    dispatch(getMessages(id))
  }

  const removeChat = (id) => {
    dispatch(deleteChat(id))
    if (currentChat === id) {
      dispatch(resetMessages())
    }
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info" onClick={() => openChat(chatId)}>
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Delete chat" onClick={() => removeChat(chatId)}><FaDeleteLeft /></div>
    </div>
  )
}

export default Card