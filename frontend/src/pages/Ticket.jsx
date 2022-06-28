import { useSelector, useDispatch } from "react-redux"
import { getSingleTicket, closeTicket } from '../features/tickets/ticketsSlice'
import {getNotes, createNote} from '../features/notes/notesSlice'
import BackBtn from "../component/BackBtn"
import Spinner from "../component/Spinner"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import NoteItem from "../component/NoteItem"
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'

const customeStyle = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root')

function Ticket() {
    const [modelIsOpen, setModelIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, 
        isError, message} = useSelector((state) => state.tickets)
    
        const {notes, 
          isLoading: notesIsLoading} = useSelector((state) => state.notes)

    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {ticketId} = useParams()

    useEffect(()=> {
        if(isError) {
            toast.error(message)
        }

        dispatch(getSingleTicket(ticketId))
        dispatch(getNotes(ticketId))

        //eslint-disable-next-line
    }, [isError, message, ticketId])

    const onTicketClose = () => {
      dispatch(closeTicket(ticketId))
      toast.success('Ticket Close')
      navigate('/tickets')
    }

    const openModel = () => setModelIsOpen(true)
    const closenModel = () => setModelIsOpen(false)

    const onNoteSubmit = (e) => {
      e.preventDefault()
      dispatch(createNote({noteText, ticketId}))
      closenModel()
    }

    if(isLoading || notesIsLoading) return <Spinner />
    if(isError) return <h3>Somthing is wrong</h3>
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackBtn url='/tickets' />
        <h2>
        Ticket ID : {ticket._id}
        <span className={`status status-${ticket.status}`}>
            {ticket.status}
        </span>
        </h2>
          <hr />
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Prouduct: {ticket.product}</h3>
          <hr />
        <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn"
        onClick={openModel}><FaPlus /></button>
      )}

      <Modal isOpen={modelIsOpen} onRequestClose={closenModel}
      style={customeStyle} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closenModel}>
        X</button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea name="noteText" id='noteText'
            className="form-control"
            placeholder="Note Text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)} 
            rows='10'></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} 
        className='btn btn-block btn-danger'>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket
