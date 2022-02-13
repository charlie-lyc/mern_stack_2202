const asyncHandler = require('express-async-handler')

/**
 * @desc Read goals
 * @route GET /api/goals
 * @access Public
 */
// const readGoals = async (req, res) => {
//     await res.status(200).json({ message: 'Get all goals' })
// }
///////////////////////////////////////////////////////////////
const readGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get all goals' })
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

    res.status(201).json({ message: 'Set a goal' })
})

/**
 * @desc Update a goal
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

/**
 * @desc Remove a goal
 * @route DELETE /api/goals/:id 
 * @access Private 
 */
const removeGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})


module.exports = {
    readGoals,
    setGoal,
    updateGoal,
    removeGoal
}