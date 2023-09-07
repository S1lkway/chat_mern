import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from './utils/PrivateRoutes'
//-Users
import Main from './pages/user/Main'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Profile from './pages/user/Profile'
//- Chats
// import Chats from './pages/chats/Chats';


function App() {
  return (
    <div className='container'>
      <Router>

        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile />} />
            {/* <Route path='/chats' element={<Chats />} /> */}
          </Route>
        </Routes>
      </Router>

      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
