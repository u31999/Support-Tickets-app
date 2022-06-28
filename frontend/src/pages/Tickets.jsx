import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getUserTickets, reset} from '../features/tickets/ticketsSlice'
import Spinner from "../component/Spinner"
import BackBtn from "../component/BackBtn"
import TicketItem from "../component/TicketItem"

function Tickets() {
  const {tickets, iseLoading, 
    isSuccess} = useSelector((state) => state.tickets)

  const dispatch = useDispatch()

  useEffect(()=> {
    return () => {
      if(isSuccess){
        dispatch(reset())
      }
     }
  }, [dispatch])

  useEffect(()=> {
    dispatch(getUserTickets())
  }, [dispatch])

  if(iseLoading) return <Spinner />

  return (
    <>
      <BackBtn url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket)=> (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
