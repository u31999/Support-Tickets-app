const asyncHandler = require('express-async-handler')

// @desk Register a new user
// @ route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    // Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    res.send('Register rouer')
})

// @desk Login a user
// @ route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login router')
})

module.exports = {
    registerUser,
    loginUser
}