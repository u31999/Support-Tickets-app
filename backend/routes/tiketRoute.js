const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMidleware')

const {getTickets, createTicket} = require('../controllers/tiketController')

router.route('/')
.get(protect, getTickets)
.post(protect, createTicket)

module.exports = router