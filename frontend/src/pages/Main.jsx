import { Box, Typography } from '@mui/material';

function Main() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}
    >
      <Typography variant="h3" color="primary">
        Welcome to LiveChat
      </Typography>
      <Typography variant="h5"
        sx={{
          mt: 8,
          whiteSpace: 'pre-wrap',
          textAlign: 'center'
        }}>
        1. Create account<br />
        2. Find your friends<br />
        3. Connect and start chatting!
      </Typography>
    </Box>
  )
}

export default Main