import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from './utils/PrivateRoutes'
import SocketContext from './utils/SocketContext';
import io from 'socket.io-client';
//-Users
import Main from './pages/user/Main'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Profile from './pages/user/Profile'
//- Chats
// import Chats from './pages/chats/Chats';
import Chats from './pages/chat/Chats'


function App() {
  const { user } = useSelector((state) => state.auth)
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user != null) {
      // Создаем подключение к WebSocket
      const newSocket = io('http://localhost:3000');
      newSocket?.emit('join private', user);

      // Устанавливаем сокет в состояние
      setSocket(newSocket);
    }


    // Закрываем сокет при размонтировании компонента
    // return () => {
    //   newSocket.close();
    // };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      <>
        <Router>

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
        </Router>

        <ToastContainer autoClose={1500} />
      </>
    </SocketContext.Provider>
  );
}

export default App;
