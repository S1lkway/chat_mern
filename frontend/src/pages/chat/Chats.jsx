// import { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
// import io from 'socket.io-client';
// import SocketContext from '../../utils/SocketContext';
//- Components
import SideBar from './Sidebar/SideBar'
import Messages from './Messages/Messages'
// - Redux
// let socket;

function Chats() {
  // const socket = useContext(SocketContext);
  // const { user } = useSelector((state) => state.auth)
  const { chat } = useSelector((state) => state.messagesList)

  ///Socket.io connection
  // useEffect(() => {
  //   // socket = io('http://localhost:3000')
  //   socket?.emit('join private', user);
  //   // return () => {
  //   //   socket?.close()
  //   // }
  //   // eslint-disable-next-line
  // }, [])

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