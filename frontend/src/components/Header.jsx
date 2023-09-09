// import { FaComments, FaBookOpen, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaUserEdit, FaGlobe } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  // ------------------------------------------------------------------ //

  return (
    <>
      {user ? (
        <>
          <div className="header">
            <Link to='/'>
              <h3>LiveChat</h3>
            </Link>
            <ul className='between'>
              <li>
                <Link to='/profile'>
                  <h4>Profile</h4>
                </Link>
              </li>
              <li>
                <button className='btn' onClick={onLogout}>
                  Logout
                </button>
              </li>
            </ul >
          </div>
          <div className="header">
            <h4>Pick contact to chat</h4>
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
                <h4>Login</h4>
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <h4>Register</h4>
              </Link>
            </li>
          </ul>



        </div>
      )}
    </>
  )
}

export default Header