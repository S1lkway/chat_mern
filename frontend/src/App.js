import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
//-Users
import Main from './pages/Main';
import Login from './pages/Login'
import Register from './pages/Register'
// import Profile from './pages/Profile'


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
          </Routes>

        </div>
      </Router>
    </>
  );
}

export default App;
