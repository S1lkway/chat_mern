import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from './utils/PrivateRoutes'
import { Container, ThemeProvider } from '@mui/material';
import MainTheme from './components/Theme';
//-Users
import Main from './pages/Main';
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
//- Chats
import Chats from './pages/chats/Chats';


function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={MainTheme}>
          <Container maxWidth='xl' disableGutters={true}>

            <Header />

            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

              <Route element={<PrivateRoutes />}>
                <Route path='/profile' element={<Profile />} />
                <Route path='/chats' element={<Chats />} />
              </Route>
            </Routes>

          </Container>
        </ThemeProvider>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
