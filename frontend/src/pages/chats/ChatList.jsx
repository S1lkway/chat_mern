import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
//- MUI
import { Box, Button, TextField, Typography } from '@mui/material';

function ChatList() {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  //*CONSTANTS FOR DATA
  const { chats } = useSelector((state) => state.chats)

  const startChat = (chatId) => {
    console.log(chatId)
  }

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        fullWidth
        // onSubmit={onSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 1
        }}
      >
        <TextField
          size='small'
          label="Search or start new chat"
          type="email"
          name="email"
          variant="outlined"
          color="primary"
          title="Type email to find a user and start a new chat"
          // margin="normal"
          // value={email}
          // onChange={onChange}
          sx={{ mt: 1, width: '100%' }}
        />
      </Box>
      <Box
        sx={{ mt: 1 }}
      >
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Button
              key={chat._id}
              id={chat._id}
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => startChat(chat._id)}
              sx={{ mt: 1 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%'
                }}
              >
                <Typography
                  title={`${chat.users[0].name}:  ${chat.users[0].email}`}
                  sx={{ textAlign: 'left', width: '100%' }}
                >
                  {chat.users[0].name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 10,
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  {chat.users[0].email}
                </Typography>
              </Box>
            </Button>
          ))
        ) : (
          <Typography
            variant='span'
            sx={{ textAlign: 'center', mt: 1, color: '#787878' }}
          >
            You don't have chats
          </Typography>
        )}
      </Box >

    </>
  )
}

export default ChatList