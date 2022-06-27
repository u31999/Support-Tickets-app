const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select product'],
        enum: ['iPhone', 'Mackbook Pro', 'iMak', 'iPad']
    },
    description: {
        type: String,
        required: [true, 'Please add a description for the issue']
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'open', 'closed'],
    }

}, {
    timestamps: true
})

module.exports = moongose.model('Ticket', ticketSchema)