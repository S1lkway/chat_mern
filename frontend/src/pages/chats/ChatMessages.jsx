import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
// import { getMessages } from '../../features/messages/messagesSlice';
import { addMessage } from '../../features/messages/messagesSlice';
//- MUI
import { Box, TextField, Typography, Paper } from '@mui/material';

function ChatMessages() {
  const dispatch = useDispatch()
  //* CONSTS FOR DATA
  const { user } = useSelector((state) => state.auth)
  const messagesData = useSelector((state) => state.messages)
  // console.log(messagesData)
  const chatData = messagesData.messages.chatData
  // console.log(chatData)
  const messages = messagesData.messages.messages
  // console.log(messages)
  const [formData, setFormData] = useState('')
  const text = formData
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    //Scroll container dows when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const onChange = (e) => {
    setFormData(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (text === '') {
      toast.error('Message is empty')
    } else {
      const newMessageData = {
        id: chatData._id,
        text: text
      }
      // console.log(newMessageData)
      dispatch(addMessage(newMessageData))
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
        height: '93vh',
        backgroundColor: '#e0e0e0'
      }}
    >
      <Box ref={messagesContainerRef} sx={{
        height: '86vh',
        overflowY: 'auto'
      }}>
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
                elevation={4}
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
              // alignItems: 'center', // vertical center
              justifyContent: 'center',   // horizontal center
              flexGrow: 1,                // full width
            }}
          >
            <Typography variant='h5' sx={{ pt: 51, fontWeight: 600, color: '#787878' }}>
              Write a message to start chat
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{
          position: 'absolute',
          height: '7vh',
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