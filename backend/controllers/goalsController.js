const asyncHandler = require('express-async-handler')
/** Use Mongo DB and Mongoose ODM **/
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


/**
 * @desc Read all goals
 * @route GET /api/goals
 * @access Private
 */
// const findGoals = (req, res) => {
//     res.status(200).json({ message: 'Read all goals' })
// }
/////////////////////////////////////////////////////////////
// const findGoals = async (req, res) => {
//     // res.status(200).json({ message: 'Read all goals' })
//     //////////////////////////////////////////////////////
//     /** Use Mongo DB and Mongoose ODM **/
//     try {
//         const allGoals = await Goal.find()
//         // res.status(200).json({ data: allGoals })
//         /* Or */
//         res.status(200).json(allGoals)
//     } catch (error) {
//         console.log(error)
//     }
// }
/////////////////////////////////////////////////////////////
const readGoals = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Read all goals' })
    ///////////////////////////////////////////////////////

    /** Use Mongo DB and Mongoose ODM **/
    // const allGoals = await Goal.find()
    ///////////////////////////////////////////////////////
    /** And Use Authentication Middleware **/
    const allGoals = await Goal.find({ 
            user: req.user.id // OR req.user._id
        })

    //////////////////////////////////////////////
    if (!allGoals) {
        res.status(500)
        throw new Error('Failed in getting goals')
    }
    const allGoalsWithoutUser = allGoals.map(goal => ({
        id: goal.id,  
        text: goal.text,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt
    }))
    res.status(200).json(allGoalsWithoutUser)
})


/**
 * @desc Create new goal
 * @route POST /api/goals
 * @access Private
 */
const createGoal = asyncHandler(async (req, res) => {
    /** Check to Get Data from Request Body **/
    // console.log(req.body)
    if (!req.body.text) {
        // return res.status(400).json({ message: 'Please provide a goal' })
        ////////////////////////////////////////////////////////////////////
        /** Error Throwing **/
        res.status(400)
        throw new Error('Please provide a goal')
    }
    // res.status(201).json({ message: 'Create a goal' })
    ////////////////////////////////////////////////////////////

    /** Use Mongo DB and Mongoose ODM **/
    // const newGoal = await Goal.create({ text: req.body.text})
    /* OR */
    // const newGoal = await Goal.create(req.body)
    ////////////////////////////////////////////////////////////
    /** And Use Authentication Middleware **/
    const newGoal = await Goal.create({
            user: req.user.id, // OR req.user._id
            text: req.body.text
        })

    ////////////////////////////////////////////////
    if (!newGoal) {
        res.status(500)
        throw new Error('Failed in creating a goal')
    }
    res.status(201).json({
        id: newGoal.id,
        text: newGoal.text,
        createdAt: newGoal.createdAt,
        updatedAt: newGoal.updatedAt
    })
})


/**
 * @desc Delete a goal
 * @route DELETE /api/goals/:id 
 * @access Private 
 */
const removeGoal = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `Delete a goal ${req.params.id}` })
    //////////////////////////////////////////////////////////////////////
    
    /** Use Mongo DB and Mongoose ODM **/
    const foundGoal = await Goal.findById(req.params.id)
    if (!foundGoal) {
        res.status(400)
        throw new Error(`Goal id ${req.params.id} not found`)
    }
    // const removedGoal = await foundGoal.remove()
    /* OR */ 
    // const removedGoal = await Goal.findByIdAndRemove(req.params.id)
    //////////////////////////////////////////////////////////////////
    /** And Use Authentication Middleware **/
    // console.log(typeof(foundGoal.user)) // object <= type: mongoose.Schema.Types.ObjectId from User Model
    // console.log(typeof(req.user.id))   // string
    if (foundGoal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const deletedGoal = await Goal.findOneAndDelete({ 
        _id: req.params.id, 
        user: req.user.id // OR req.user._id 
    })

    /////////////////////////////////////////////////
    if (!deletedGoal) {
        res.status(500)
        throw new Error('Failed in removing a goal')
    }
    res.status(200).json({ id: deletedGoal.id })
})


/**
 * @desc Update a goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    /** Check to Get Data from Request Body **/
    // console.log(req.body)
    if (!req.body.text) {
        // return res.status(400).json({ message: 'Please provide a goal' })
        ////////////////////////////////////////////////////////////////////
        /** Error Throwing **/
        res.status(400)
        throw new Error('Please provide a goal')
    }
    // res.status(200).json({ message: `Update a goal ${req.params.id}` })
    //////////////////////////////////////////////////////////////////////
    
    /** Use Mongo DB and Mongoose ODM **/
    const foundGoal = await Goal.findById(req.params.id)
    if (!foundGoal) {
        res.status(400)
        throw new Error(`Goal id ${req.params.id} not found`)
    }
    // const updatedGoal = await Goal.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }) // ALSO ALLOWED { _id: req.params.id }
    /* OR */
    // const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    ///////////////////////////////////////////////////////////////////////////////////////////
    /** And Use Authentication Middleware **/
    // console.log(typeof(foundGoal.user)) // object <= type: mongoose.Schema.Types.ObjectId from User Model
    // console.log(typeof(req.user.id))   // string
    if (foundGoal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findOneAndUpdate(
        { 
            _id: req.params.id, 
            user: req.user.id // OR req.user._id 
        },
        req.body,
        { new: true}
    )

    ////////////////////////////////////////////////
    if (!updatedGoal) {
        res.status(500)
        throw new Error('Failed in updating a goal')
    }
    res.status(200).json({
        id: updatedGoal.id,
        text: updatedGoal.text,
        createdAt: updatedGoal.createdAt,
        updatedAt: updatedGoal.updatedAt
    })
})


module.exports = {
    readGoals,
    createGoal,
    removeGoal,
    updateGoal
}