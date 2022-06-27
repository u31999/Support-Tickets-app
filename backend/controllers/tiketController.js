const asyncHandler = require('express-async-handler')

const User = require('../models/usersModels')
const Ticket = require('../models/TicketModels')

// @desk Get user  tikets
// @route Get /api/tikets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
   res.status(200).json({message: 'Get tikets'})
})

// @desk user  tiket
// @route POST /api/tikets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
   res.status(200).json({message: 'Create tikets'})
})

module.exports = {
     getTickets,
    createTicket
}
