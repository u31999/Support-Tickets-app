const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    text: {
        type: String,
        required: [true, 'Please add text']
    },
    isStaff: {
        type: Boolean,
        default: false
    },
    staffId: {
        type: String,
    },   

}, {
    timestamps: true
})

module.exports = moongose.model('Note', noteSchema)