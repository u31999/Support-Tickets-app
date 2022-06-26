import {useState} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch}  from 'react-redux'
import {register} from '../features/auth/authSlice'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, 
    message} = useSelector(state => state.auth)

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