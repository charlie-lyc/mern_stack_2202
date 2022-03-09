const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { readGoals } = require('./goalsController')


/******** Generate JWT ********/
const generateToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
    )
}
/*****************************/


/**
 * @desc Register new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    // res.status(201).json({ message: 'Register a user'})
    //////////////////////////////////////////////////////
    // console.log(req.body)

    /** Check If User Data Is Null **/
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please provide a name, email and password')
    }
    /** Check If User Exists: Email is Unique Field from User Model **/
    const foundUser = await User.findOne({ email })
    if (foundUser) {
        res.status(400)
        throw new Error('User already exists, email is in use')
    }
    /** Hash Password **/
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    /** Create new user **/
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (!newUser) {
        res.status(500)
        throw new Error('Failed in user registration')
    }
    res.status(201).json({ message: 'User registered'})
})


/**
 * @desc Authenticate user(Log in)
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Logged in'})
    ////////////////////////////////////////////////
    // console.log(req.body)

    /** Check If User Data Is Null **/
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide email and password')
    }
    /** Check Email **/
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
        res.status(400)
        throw new Error('Invalid email')
    }
    /** Check Password **/
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid password')
    }
    res.status(200).json({ 
        // id: foundUser.id
        name: foundUser.name,
        email: foundUser.email,
        token: generateToken(foundUser.id) // <= JWT
    })
    
})


/**
 * @desc Read user data
 * @route GET /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Read user data'})
    /////////////////////////////////////////////////////
    // console.log(req.user) // <= authMiddleware

    /** Use Authentication Middleware **/
    res.status(200).json({ 
        // id: req.user.id
        name: req.user.name,
        email: req.user.email,
    })
})


/**
 * @desc Log out
 * @route POST /api/users/logout
 * @access Private
 */
// const logoutUser = asyncHandler(async (req, res) => {
//     // res.status(200).json({ message: 'Logged out'})
//     /////////////////////////////////////////////////
//     // console.log(req.header('Authorization'))
//     // console.log(req.user)

//     /** Clear Token and User **/
//     // req.header('Authorization') = undefined // <= ReferenceError: Invalid left-hand side in assignment
//     req.headers.authorization = undefined
//     req.user = undefined
//     res.status(200).json({ message: 'User logged out'})
// })

/***********************************************************************/

/**
 * @desc Delete user
 * @route DELETE /api/users/me
 * @access Private 
 */
// const removeMe = asyncHandler(async (req, res) => {
//     // res.status(200).json({ message: 'Delete user' })
//     ///////////////////////////////////////////////////
//     // console.log(req.user) // <= authMiddleware
    
//     /** Use Authentication Middleware **/
//     const deletedUser = await User.findByIdAndDelete(req.user.id)
//     if (!deletedUser) {
//         res.status(500)
//         throw new Error('Failed in deleting user data')
//     }
//     res.status(200).json({ message: 'User deleted' })
// })


/**
 * @desc Update user data
 * @route PUT /api/users/me
 * @access Private
 */
// const updateMe = asyncHandler(async (req, res) => {
//     // res.status(200).json({ message: 'Update user data'})
//     ///////////////////////////////////////////////////////
//     // console.log(req.body)
//     // console.log(req.user) // <= authMiddleware

//     /** Check If User Data Is Null **/
//     const { name, email, password } = req.body
//     if (!name || !email || !password) {
//         res.status(400)
//         throw new Error('Please provide a name, email and password')
//     }
//     /** Check If Email Is in Use **/
//     const foundUser = await User.findOne({ email })
//     // console.log(typeof(foundUser.id)) // string
//     // console.log(typeof(req.user.id))  // string
//     if (foundUser.id !== req.user.id) {
//         res.status(400)
//         throw new Error('Email already in use')
//     }
//     /** Hash Password **/
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     /** Use Authentication Middleware **/
//     const updatedUser = await User.findByIdAndUpdate(
//         req.user.id, 
//         {
//             name,
//             email,
//             password: hashedPassword
//         }, 
//         { new: true }
//     )
//     if (!updatedUser) {
//         res.status(500)
//         throw new Error('Failed in updating user data')
//     }
//     res.status(200).json({
//         // id: updatedUser.id
//         name: updatedUser.name,
//         email: updatedUser.email
//     })
// })


module.exports = {
    registerUser,
    loginUser,
    getMe,
    // logoutUser,
    // removeMe,
    // updateMe,
}