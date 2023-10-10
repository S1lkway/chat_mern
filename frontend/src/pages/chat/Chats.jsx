import { useSelector } from 'react-redux'
//- Components
import SideBar from './Sidebar/SideBar'
import Messages from './Messages/Messages'

function Chats() {

  const { chat } = useSelector((state) => state.messagesList)

  return (
    <>
      <SideBar />

      {chat?._id ? (
        <Messages />
      ) : (
        <div className='area_without_chat'>
          <div className='heading'>
            <p>Pick contact to start chat</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Chats