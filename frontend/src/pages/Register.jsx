import { ThemeProvider, TextField, Button, Box, Typography, Container } from '@mui/material';
import MainTheme from '../components/Theme'


function Register() {
  return (
    <ThemeProvider theme={MainTheme}>
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          <Typography variant="h4" color="primary">
            Registration
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              width: '100%',
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <TextField
              label="Confirm password"
              type="password"
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <Button variant="contained" color="primary" sx={{ width: '100%', mt: 2, maxWidth: 400 }}>
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register