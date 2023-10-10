import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../features/auth/authSlice'

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
      if (name.length < 5 || email.length < 5 || password.length < 5) {
        toast.error('Fields must contain at least 5 characters')
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
  }
  return (
    <div className="content grid_row">
      <section className='heading'>
        <h1>
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text" className='form-control'
              id="name"
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email" className='form-control'
              id="email"
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password" className='form-control'
              id="password"
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password" className='form-control'
              id="password2"
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Register