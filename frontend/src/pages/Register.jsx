import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
//-MUI
import { TextField, Button, Box, Typography, Container } from '@mui/material';


function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  ///Data from redux store
  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/chats')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      // We send data from form to authSlice to register function and there to server by authService
      dispatch(register(userData))
    }
  }


  return (
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
            value={formData.name}
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
            value={formData.email}
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
            value={formData.password}
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
            value={formData.password2}
            onChange={onChange}
            variant="outlined"
            color="primary"
            margin="normal"
            sx={{ width: '100%', maxWidth: 400 }}
            required
            inputProps={{ minLength: 5 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 2, maxWidth: 400 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Register