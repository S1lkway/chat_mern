import { useDispatch } from 'react-redux'
import { FaDeleteLeft } from "react-icons/fa6";
// - Redux
import { getMessages } from '../../../../features/messages/messagesSlice'


function Card(props) {
  const dispatch = useDispatch()
  const chatId = props.chatId
  const userData = props.userData
  const openChat = (id) => {
    dispatch(getMessages(id))
    console.log('Open chat - ' + id)
  }

  const deleteChat = (id) => {
    console.log('Delete chat - ' + id)
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info" onClick={() => openChat(chatId)}>
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Delete chat" onClick={() => deleteChat(chatId)}><FaDeleteLeft /></div>
    </div>
  )
}

export default Card