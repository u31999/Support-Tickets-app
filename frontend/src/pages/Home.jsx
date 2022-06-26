import { Link } from "react-router-dom"
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What you need help with?</h1>
        <p>Please choose option below</p>
      </section> 

      <Link to='/new-ticket' 
      className="btn btn-reverse btn-block">
        <FaQuestionCircle /> New Ticket
      </Link> 
      <Link to='/tickets' 
      className="btn btn-reverse btn-block">
        <FaTicketAlt /> View my Tickets
      </Link> 
    </>
  )
}

export default Home
