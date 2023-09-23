import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
// - Redux
import { logout, reset } from '../features/auth/authSlice'
import { resetChats } from '../features/chats/chatsSlice'
import { resetMessages } from '../features/messages/messagesSlice'

function PrivateRoutes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (user != null) {
    const token = user.token
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(logout())
      dispatch(reset())
      dispatch(resetChats())
      dispatch(resetMessages())
      navigate('/')
    }
    return <Outlet />
  } else {

    const prevUrl = location.pathname;
    return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
  }

}

export default PrivateRoutes