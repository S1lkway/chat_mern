import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { resetChats } from '../features/chats/chatsSlice'
import { resetMessages } from '../features/messages/messagesSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { messages } = useSelector((state) => state.messagesList)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(resetChats())
    dispatch(resetMessages())
    navigate('/')
  }

  // ------------------------------------------------------------------ //

  return (
    <>
      {user ? (
        <>
          <div className="header">
            <Link to='/chats'>
              <h3>Chats</h3>
            </Link>
            <ul className='between'>
              <li>
                <Link to='/profile'>
                  <h4><i>Profile</i></h4>
                </Link>
              </li>
              <li>
                <button className='btn' onClick={onLogout}>
                  <i>Logout</i>
                </button>
              </li>
            </ul >
          </div>
          <div className="header">
            {messages.chatData ? (
              <h4>{messages.chatData.users[0].name}</h4>
            ) : (
              <h4>Pick contact to start chat</h4>
            )}

          </div>
        </>
      ) : (
        <div className="header grid_row">
          <Link to='/'>
            <h3>LiveChat</h3>
          </Link>
          <ul className='between'>
            <li>
              <Link to='/login'>
                <h4><i>Login</i></h4>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <h4><i>Register</i></h4>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Header