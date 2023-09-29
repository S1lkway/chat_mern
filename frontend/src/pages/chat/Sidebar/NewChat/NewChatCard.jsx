import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
// - Redux
import { createChat } from "../../../../features/chats/chatsSlice";

function NewChatCard(props) {
  const dispatch = useDispatch()
  const userData = props.userData

  const createNewChat = (id) => {
    // console.log('Create chat with user ' + id)
    const chatData = { id: id }
    dispatch(createChat(chatData))
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info">
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Create chat" onClick={() => createNewChat(userData._id)}><FaUserPlus /></div>
    </div>
  )
}

export default NewChatCard