import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import ChatList from './ChatList';
import AddChat from './AddChat';
import Messages from './Messages';
//-MUI
import { Box, IconButton, Typography } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentIcon from '@mui/icons-material/Comment';

function Chats() {
  // const navigate = useNavigate()
  // Contacts part content
  const [chatsContent, setChatsContent] = useState('chatList')

  const changeChatsContent = (content) => {
    setChatsContent(content)
  }

  return (

    <Box sx={{ display: 'flex', }}>
      {/* LEFT PART */}
      <Box sx={{ flex: '0 0 35%', display: 'flex', flexDirection: 'column', position: 'relative', height: '93vh', p: 1.5 }}>
        <Box display="flex" justifyContent="center">
          <IconButton
            size="small"
            aria-label="main"
            color={chatsContent === 'chatList' ? "#333" : "inherit"}
            onClick={() => changeChatsContent('addChat')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
              },
            }}
          >
            <AddCommentIcon sx={{ mr: 1 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>New chat</Typography>
          </IconButton>

          <IconButton
            size="small"
            aria-label="main"
            color={chatsContent === 'chatList' ? "inherit" : "#333"}
            onClick={() => changeChatsContent('chatList')}
            sx={{
              flex: 1,
              '&:hover': {
                color: 'inherit',
                backgroundColor: 'transparent',
              },
            }}
          >
            <CommentIcon sx={{ mr: 1 }} />
            <Typography variant='caption' sx={{ fontWeight: 600 }}>Chat list</Typography>
          </IconButton>
        </Box>

        {/* Contants content */}
        {chatsContent === 'chatList' ? <ChatList /> : <AddChat />}
      </Box>

      {/* RIGHT PART */}
      <Messages />
    </Box>
  )
}

export default Chats