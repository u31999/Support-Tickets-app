import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch}  from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../component/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, 
    message, isError} = useSelector(state => state.auth)

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

    if(password !== password2) {
      toast.error("Password dosn't match")
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }

  }

  if(isLoading) return <Spinner />

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create Account</p>
      </section>      
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='text' 
          className='form-control' 
          id='name'
          name='name'
          value={name}
          onChange={onChange}
          required
          placeholder='Enter your name' />
        </div>
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
          <input type='password' 
          className='form-control' 
          id='password2'
          name='password2'
          value={password2}
          onChange={onChange}
          required
          placeholder='Confirm your password' />
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

export default Register
