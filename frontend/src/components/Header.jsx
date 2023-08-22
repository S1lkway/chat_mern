import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { resetChats } from '../features/chats/chatsSlice'
//-MUI
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';


function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  // const chatUser = false

  // Open/Close menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetChats())
    dispatch(reset())
    handleClose()
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        {user ? (
          <Box sx={{ display: 'flex' }}>
            <Toolbar sx={{ justifyContent: 'space-between', width: '35%', borderRight: '1px solid white' }}>
              <Box>
                <IconButton
                  size="small"
                  aria-label="main"
                  color="inherit"
                  onClick={() => navigate('/chats')}
                >
                  <ForumIcon sx={{ fontSize: 28, mr: 1 }} /> Chat
                </IconButton>
              </Box>

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
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>

            </Toolbar>
            <Toolbar>
              <Typography variant='overline'>
                Pick contact to chat
              </Typography>
            </Toolbar>
          </Box>
        ) : (
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              size="Medium"
              aria-label="main"
              color="inherit"
              onClick={() => navigate('/')}
            >
              LiveChat
            </IconButton>
            <div>
              {/* Login and Register buttons */}
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
          </Toolbar>
        )}
      </AppBar>
    </Box >
  );
}

export default Header