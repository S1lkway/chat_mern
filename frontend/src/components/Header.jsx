import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'
//-MUI
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, ThemeProvider } from '@mui/material';
import MainTheme from './Theme'


function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // Open/Close menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const onLogout = () => {
  //   dispatch(logout())
  //   dispatch(reset())
  //   navigate('/')
  // }

  return (
    <ThemeProvider theme={MainTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {user ? (
              <div>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              <IconButton
                size="Medium"
                aria-label="main"
                color="inherit"
                onClick={() => navigate('/')}
              >
                LiveChat
              </IconButton>
            )}
            {user ? (
              <div>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/logout">Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                {/* Кнопки для страниц авторизации и регистрации */}
                <IconButton
                  size="small"
                  aria-label="login"
                  color="inherit"
                  onClick={() => navigate('/login')}
                >
                  Login
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="register"
                  color="inherit"
                  onClick={() => navigate('/register')}
                >
                  Register
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Header