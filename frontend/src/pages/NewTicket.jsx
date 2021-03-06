import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketsSlice'
import Spinner from '../component/Spinner'
import BackBtn from "../component/BackBtn"

function NewTicket() {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, 
      message} = useSelector((state) => state.tickets)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      if(isError) {
        toast.error(message)
      }

      if(isSuccess) {
        dispatch(reset())
        navigate('/')
        toast.success('Ticket Add Successfully')
      }

      dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product, description}))
    }

    if(isLoading) return <Spinner />

  return (
    <>
      <BackBtn url='/' />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
            <label htmlFor="name">Customer Name</label>
            <input type='text' className="form-control" 
            value={name} disabled />
            <input type='email' className="form-control" 
            value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="product">Product</label>
                <select name="product" 
                id="product" value={product}
                onChange={(e) => setProduct(e.target.value)}>
                    <option value='' disabled selected>Choose Product</option> 
                    <option value='iPhone' selected>iPhone</option>
                    <option value='Mackbook Pro'>Mackbook Pro</option>
                    <option value='iMac'>iMac</option>
                    <option value='iPad'>iPad</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description The issue</label>
                <textarea name="description" id="description"
                    className="form-control" placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-block">
                    Submit
                </button>
            </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
