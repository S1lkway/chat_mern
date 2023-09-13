import { FaDeleteLeft } from "react-icons/fa6";

function Card() {

  const openChat = (id) => {
    console.log(id)
  }

  const deleteChat = (id) => {
    console.log(id)
  }
  return (
    <div className="card" title="Open chat">
      <div className="user-info" onClick={() => openChat(33)}>
        <span className="card_name">Имя пользователя</span>
        <span className="card_email"><i>example@example.com</i></span>
      </div>
      <div className="delete-button" title="Delete chat" onClick={() => deleteChat(22)}><FaDeleteLeft /></div>
    </div>
  )
}

export default Card