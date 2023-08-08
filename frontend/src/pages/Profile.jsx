import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { edit, reset } from '../features/auth/authSlice'
//-MUI
import { ThemeProvider, TextField, Button, Box, Typography, Container } from '@mui/material';
import MainTheme from '../components/Theme'

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //*CONSTANTS FOR DATA
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = formData

  //*RESET USER DATA IN REDUX AFTER SUBMIT
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success('Credentials changed')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //*EDIT formData BY CHANGING DATA IN FORM FIELDS
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  //*EDIT USER DATA BY SUBMIT
  const onSubmit = (e) => {
    e.preventDefault()
    ///Check passwords fields
    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      ///We send data from form to authSlice to register function and there to server by authService
      dispatch(edit(userData))
    }
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
            Profile
          </Typography>
          <Box
            component="form"
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
              label="Name"
              name="name"
              value={name}
              onChange={onChange}
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
              required
              inputProps={{ minLength: 5 }}
            />
            <TextField
              label="Confirm password"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              variant="outlined"
              color="primary"
              margin="normal"
              sx={{ width: '100%', maxWidth: 400 }}
              required
              inputProps={{ minLength: 5 }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 2, maxWidth: 400 }}>
              Save changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Profile