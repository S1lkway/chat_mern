import { useSelector } from "react-redux"
import NewChatCard from './NewChatCard'

function UserCard() {
  const { newChats } = useSelector((state) => state.chatList)

  return (
    <div className="user_cards">
      {newChats?.length > 0 ? (
        newChats?.map((userData) => (
          <NewChatCard key={userData._id} userData={userData} />
        ))
      ) : (
        <div className="heading newChatsCards">
          <p>Contacts for chats were not found</p>
          <span><i>This is the test app. Search "com" to find all available contacts in DataBase. You can register multiple accounts to search for a new chat.</i></span>

        </div>
      )}
    </div>
  )
}

export default UserCard