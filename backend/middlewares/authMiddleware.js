const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    /** Check If Token Exists: Headers - Authorization - Bearer <token> **/
    let token = req.headers.authorization // OR req.header('Authorization')
    // console.log(token) // 'Bearer <token>' OR undefined
    if (!token) {
        res.status(401)
        throw new Error('No token, authorization denied')
    }
    /** Verify Token **/
    token = token.split(' ')[1] // req.headers.authorization.split(' ')[1] OR req.header('Authorization').split(' ')[1]
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await User.findById(decoded.id).select('-password') // Exclude 'password' field
    // console.log(foundUser)
    if (!foundUser) {
        res.status(401)
        throw new Error('Invalid token, authorization denied')
    }
    /** Add Verified User to Request */
    // console.log(req.user) // undefined
    req.user = foundUser
    next()
})

module.exports = protect