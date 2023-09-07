import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'

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
      navigate('/chats')
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
    <div className="content grid_row">
      <section className='heading'>
        <h1>
          Login
        </h1>
        <p>Enter email and password to login</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>

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
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>
    </div>
  )
}

export default Login