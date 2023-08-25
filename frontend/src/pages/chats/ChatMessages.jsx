import { useState } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import { getMessages } from '../../features/messages/messagesSlice';
//- MUI
import { Box, TextField, Typography, Paper } from '@mui/material';

function ChatMessages() {
  // const dispatch = useDispatch()
  //* CONSTS FOR DATA
  const { user } = useSelector((state) => state.auth)
  const messagesData = useSelector((state) => state.messages)
  // console.log(messagesData)
  const chatData = messagesData.messages.chatData
  // console.log(chatData)
  const messages = messagesData.messages.messages
  const [formData, setFormData] = useState('')
  const text = formData

  const onChange = (e) => {
    setFormData(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (text === '') {
      toast.error('Message is empty')
    } else {
      const newMessageData = {
        chatId: chatData._id,
        text: text
      }
      console.log(newMessageData)
      setFormData('')
    }
  }

  return (
    <Box
      sx={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderLeft: '1px solid white',
        borderRight: '1px solid #787878',
      }}
    >
      {messages.length > 0 ? (
        messages.map((message) => (
          <Box
            key={message._id}
            sx={{
              display: 'flex',
              justifyContent: message.user._id === user._id ? 'flex-end' : 'flex-start',
              m: 1,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: '8px 12px',
                maxWidth: '70%',
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center', // vertical center
            justifyContent: 'center',   // horizontal center
            flexGrow: 1,                // full width
          }}
        >
          <Typography variant='h5' sx={{ fontWeight: 600, color: '#787878' }}>
            Write a message to start chat
          </Typography>
        </Box>
      )}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          p: 1.5,
          backgroundColor: 'grey',
        }}
      >
        <TextField
          size="small"
          label="Add message"
          type="text"
          name="text"
          variant="outlined"
          color="primary"
          title="Add new message"
          value={text}
          onChange={onChange}
          sx={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  )
}

export default ChatMessages