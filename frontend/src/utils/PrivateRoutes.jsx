import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function PrivateRoutes() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (user != null) {
    const token = user.token
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      const prevUrl = location.pathname;
      return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
    }
    return <Outlet />
  } else {

    const prevUrl = location.pathname;
    return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
  }

}

export default PrivateRoutes