import { FaUserPlus } from "react-icons/fa";

function NewChatCard(props) {
  const userData = props.userData

  const createChat = (id) => {
    console.log('Create chat with user ' + id)
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info">
        <span className="card_name">{userData.name}</span>
        <span className="card_email"><i>{userData.email}</i></span>
      </div>
      <div className="delete-button" title="Create chat" onClick={() => createChat(userData._id)}><FaUserPlus /></div>
    </div>
  )
}

export default NewChatCard