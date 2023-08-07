import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'

import { ThemeProvider, TextField, Button, Box, Typography, Container } from '@mui/material';
import MainTheme from '../components/Theme'


function Login() {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/profile')
    }

    /// Message after redirect if user is not authorized
    const prevUrl = location.state?.prevUrl
    if (prevUrl) {
      toast.error('User is not authorized')
      const { prevUrl, ...state } = location.state;
      navigate({ pathname: '/login', state });
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch, location])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }



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
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            sx={{
              width: '100%',
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              color="primary"
              margin="normal"
              value={email}
              onChange={onChange}
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              color="primary"
              margin="normal"
              value={password}
              onChange={onChange}
              sx={{ width: '100%', maxWidth: 400 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 2, maxWidth: 400 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login