import { ThemeProvider, Box, Typography, Container } from '@mui/material';
import MainTheme from '../components/Theme'

function Main() {
  return (
    <ThemeProvider theme={MainTheme}>
      <Container maxWidth="md">
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
      </Container>
    </ThemeProvider>
  )
}

export default Main