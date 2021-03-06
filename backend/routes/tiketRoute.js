const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMidleware')

const noteRouter = require('./noteRoute')
router.use('/:ticketId/notes', noteRouter)

const {getTickets, createTicket, getTicket, 
    deleteTicket, updateTicket} = require('../controllers/tiketController')


router.route('/')
.get(protect, getTickets)
.post(protect, createTicket)

router.route('/:id')
.get(protect, getTicket)
.delete(protect, deleteTicket)
.put(protect, updateTicket)

module.exports = router