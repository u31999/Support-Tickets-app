const express = require('express')
const dotenv = require('dotenv').config()
const coonectDB = require('./config/db')
const colors = require('colors')
const PORT = process.env.PORT || 8000
const {errorHanller} = require('../backend/middleware/errorMidlleware')


const app = express()
coonectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).res.json({message: 'You are welcome'})
})


// Routes
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/tickets', require('./routes/tiketRoute'))
app.use(errorHanller)

app.listen(PORT, 
    () => console.log(`Server running in port ${PORT}`))
