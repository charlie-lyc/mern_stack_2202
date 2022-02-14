const asyncHandler = require('express-async-handler')
/** Use Mongo DB and Mongoose ODM **/
const Goal = require('../models/goalModel')

/**
 * @desc Read goals
 * @route GET /api/goals
 * @access Public
 */
// const readGoals = (req, res) => {
//     res.status(200).json({ message: 'Read all goals' })
// }
///////////////////////////////////////////////////////////////
// const readGoals = async (req, res) => {
//     // res.status(200).json({ message: 'Read all goals' })

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
///////////////////////////////////////////////////////////////
const readGoals = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Read all goals' })
    
    /** Use Mongo DB and Mongoose ODM **/
    const allGoals = await Goal.find()
    // res.status(200).json({ data: allGoals })
    /* Or */
    res.status(200).json(allGoals)
})


/**
 * @desc Set a goal
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler(async (req, res) => {
    /** Check to Get Data from Request Body **/
    // console.log(req.body)
    if (!req.body.text) {
        // res.status(400).json({ message: 'Please provide a goal' })
        // return
        /////////////////////////////////////////////////////////////
        /** Error Throwing **/
        res.status(400)
        throw new Error('Please provide a goal')
    }
    // res.status(201).json({ message: 'Set a goal' })

    /** Use Mongo DB and Mongoose ODM **/
    // const newGoal = await Goal.create({ text: req.body.text })
    /* Or */
    const newGoal = await Goal.create(req.body)
    res.status(201).json(newGoal)
})

/**
 * @desc Update a goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `Updated goal ${req.params.id}` })

    /** Use Mongo DB and Mongoose ODM **/
    const foundGoal = await Goal.findById(req.params.id)
    if (!foundGoal) {
        res.status(400)
        throw new Error(`Goal ${req.params.id} not found`)
    }
    // const updatedGoal = await Goal.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    /* Or */
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedGoal)
})

/**
 * @desc Remove a goal
 * @route DELETE /api/goals/:id 
 * @access Private 
 */
const removeGoal = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: `Removed goal ${req.params.id}` })

    /** Use Mongo DB and Mongoose ODM **/
    const foundGoal = await Goal.findById(req.params.id)
    if (!foundGoal) {
        res.status(400)
        throw new Error(`Goal ${req.params.id} not found`)
    }
    // const removedGoal = await foundGoal.remove()
    /* Or */ 
    const removedGoal = await Goal.findByIdAndRemove(req.params.id)
    res.status(200).json(removedGoal)
})


module.exports = {
    readGoals,
    setGoal,
    updateGoal,
    removeGoal
}