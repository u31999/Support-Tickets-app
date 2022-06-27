const asyncHandler = require('express-async-handler')

const User = require('../models/usersModels')
const Ticket = require('../models/TicketModels')

// @desk Get user  tikets
// @route Get /api/tikets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using id and JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tikets = await Ticket.find({user: req.user.id})

   res.status(200).json(tikets)
})

// @desk Get user single  tikets
// @route Get /api/tikets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using id and JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tiket = await Ticket.findById(req.params.id)

    if(!tiket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(tiket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }


   res.status(200).json(tiket)
})

// @desk delete user single  tikets
// @route Delete /api/tikets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using id and JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tiket = await Ticket.findById(req.params.id)

    if(!tiket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(tiket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await tiket.remove()
   res.status(200).json({success: true})
})

// @desk Update user single  tikets
// @route update /api/tikets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get user using id and JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tiket = await Ticket.findById(req.params.id)

    if(!tiket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(tiket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, 
        req.body, { new: true })

   res.status(200).json(updateTicket)
})

// @desk user  tiket
// @route POST /api/tikets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if(!product || !description) {
        res.status(400)
        throw new Error('Please add product and discription')
    }

    // Get user using id and JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tikets = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

   res.status(201).json(tikets)
})

module.exports = {
     getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}
