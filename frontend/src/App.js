import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from './utils/PrivateRoutes'
//-Users
import Main from './pages/Main';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'


function App() {
  return (
    <>
      <Router>
        <div className='container'>

          <Header />

          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route element={<PrivateRoutes />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>

        </div>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
