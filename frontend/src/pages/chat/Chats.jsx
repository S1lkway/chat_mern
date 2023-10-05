import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
//- Components
import SideBar from './Sidebar/SideBar'
import Messages from './Messages/Messages'
// - Redux
let socket;

function Chats() {


  const { chat } = useSelector((state) => state.messagesList)

  ///Socket.io connection
  useEffect(() => {
    socket = io('http://localhost:3000')
    return () => {
      socket?.close()
    }
  }, [])

  return (
    <>
      <SideBar socket={socket} />

      {chat?._id ? (
        <Messages socket={socket} />
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