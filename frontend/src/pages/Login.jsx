import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch}  from 'react-redux'
import {logIn, reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../component/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData

   const dispatch = useDispatch()
   const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, 
    message} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    const userData = {
      email,
      password
    }

    dispatch(logIn(userData))
  }

  if(isLoading) return <Spinner />

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to get support</p>
      </section>      
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='email' 
          className='form-control' 
          id='email'
          name='email'
          value={email}
          onChange={onChange}
          required
          placeholder='Enter your email' />
        </div>
        <div className='form-group'>
          <input type='password' 
          className='form-control' 
          id='password'
          name='password'
          value={password}
          onChange={onChange}
          required
          placeholder='Enter a password' />
        </div>
        <div className='form-group'>
          <button className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default Login
