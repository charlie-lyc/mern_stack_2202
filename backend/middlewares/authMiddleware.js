const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    /** Check If Token Exists: Headers - Authorization - Bearer <token> **/
    const auth = req.headers.authorization // OR req.header('Authorization')
    // console.log(auth) // undefined OR 'Bearer <token>'
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(401)
        throw new Error('No token, authorization denied')
    }
    /** Verify Token **/
    const token = auth.split(' ')[1] // req.headers.authorization.split(' ')[1] OR req.header('Authorization').split(' ')[1]
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await User.findById(decoded.id).select('-password') // Exclude 'password' Field
    // console.log(foundUser)
    if (!foundUser) {
        res.status(401)
        throw new Error('Invalid token, user not found')
    }
    /** Add Verified User to Request */
    // console.log(req.user) // undefined
    req.user = foundUser
    // console.log(req.user.id)  // string
    // console.log(req.user._id) // new ObjectId()
    next()
})

module.exports = protect