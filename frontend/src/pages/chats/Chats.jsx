import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatList from './ChatList';
import AddChat from './AddChat';
// import ChatMessages from './ChatMessages';
import { getChats } from '../../features/chats/chatsSlice'
//-MUI
import { Box, Button, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentIcon from '@mui/icons-material/Comment';

function Chats() {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  // Contacts part content
  const [chatsContent, setChatsContent] = useState('chatList')

  const changeChatsContent = (content) => {
    setChatsContent(content)
  }

  useEffect(() => {
    dispatch(getChats())
  }, [dispatch])

  return (

    <Box sx={{ display: 'flex', }}>
      {/* LEFT PART */}
      <Box sx={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', pt: 2, backgroundColor: 'grey' }}>
        <Box display="flex" justifyContent="center">
          <Button
            size="small"
            variant="contained"
            color={chatsContent === 'chatList' ? 'inherit' : 'primary'} // Используйте color='primary'
            onClick={() => changeChatsContent('addChat')}
            sx={{
              m: 0.5,
              flex: 1,
              textTransform: 'none',
            }}
          >
            <AddCommentIcon sx={{ mr: 0.5 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>New chat</Typography>
          </Button>

          <Button
            size="small"
            variant="contained"
            color={chatsContent === 'chatList' ? 'primary' : 'inherit'} // Используйте color='primary'
            onClick={() => changeChatsContent('chatList')}
            sx={{
              m: 0.5,
              flex: 1,
              textTransform: 'none',
            }}
          >
            <CommentIcon sx={{ mr: 0.5 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>Chat list</Typography>
          </Button>
        </Box>

        {/* Contants content */}
        {chatsContent === 'chatList' ? <ChatList /> : <AddChat />}
      </Box>

      {/* RIGHT PART */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center', // vertical center
          justifyContent: 'center',   // horizontal center
          flexGrow: 1,                // full width
        }}
      >
        <Typography variant='h5' sx={{ fontWeight: 600, color: '#787878' }}>
          You didn't pick any chat
        </Typography>
      </Box>
    </Box>
  )
}

export default Chats