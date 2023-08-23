import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ChatList from './ChatList';
import AddChat from './AddChat';
import ChatMessages from './ChatMessages';
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
  const [openChat, setOpenChat] = useState({})
  // console.log(openChat)

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
        {chatsContent === 'chatList' ? <ChatList setOpenChat={setOpenChat} /> : <AddChat />}
      </Box>

      {/* RIGHT PART */}
      {Object.keys(openChat).length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', // Выравнивание по вертикали
            justifyContent: 'center', // Выравнивание по горизонтали
            flexGrow: 1, // Растянуть на всю доступную ширину
            // height: '93vh',
          }}
        >
          {Object.keys(openChat).length === 0 ? (
            <Typography variant='h5' sx={{ fontWeight: 600, color: '#787878' }}>
              You didn't pick any chat
            </Typography>
          ) : (
            <ChatMessages openChat={openChat} />
          )}
        </Box>
      ) : (
        <ChatMessages openChat={openChat} />
      )}

    </Box>
  )
}

export default Chats