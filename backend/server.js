const path = require('path')
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

// Routes
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/tickets', require('./routes/tiketRoute'))

// Serve front-end
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
    res.status(200).res.json({message: 'You are welcome'})
    })
}

app.use(errorHanller)

app.listen(PORT, 
    () => console.log(`Server running in port ${PORT}`))
