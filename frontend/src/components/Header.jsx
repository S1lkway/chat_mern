import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaDeleteLeft } from "react-icons/fa6";
// - Redux
import { logout, reset } from '../features/auth/authSlice'
import { resetChats } from '../features/chats/chatsSlice'
import { resetMessages } from '../features/messages/messagesSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { chat } = useSelector((state) => state.messagesList)

  const cancelChat = () => {
    dispatch(resetMessages())
  }

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
          {chat != null ? (
            <div className="header">
              <h4><i>{chat.users[0].name}</i></h4>
              <div className="cancel-button" title="Cancel chat" onClick={() => cancelChat()}><FaDeleteLeft /></div>
            </div>
          ) : (
            null
          )}
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