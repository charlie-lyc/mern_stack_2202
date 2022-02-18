const express = require('express')
const router = express.Router()


// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'Read all goals' })
// })
// router.post('/', (req, res) => {
//     res.status(201).json({ message: 'Create a goal' })
// })
// router.put('/:id', (req, res) => {
//     res.status(200).json({ message: `Update goal ${req.params.id}` })
// })
// router.delete('/:id', (req, res) => {
//     res.status(200).json({ message: `Delete goal ${req.params.id}` })
// })
////////////////////////////////////////////////////////////////////////
const { readGoals, createGoal, updateGoal, removeGoal } = require('../controllers/goalsController')

// router.get('/', readGoals)
// router.post('/', addGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', removeGoal)
/* OR */
// router.route('/').get(readGoals).post(createGoal)
// router.route('/:id').put(updateGoal).delete(removeGoal)
//////////////////////////////////////////////////////////

/** Private Access: Use Authentication Middleware **/
const protect = require('../middlewares/authMiddleware')

// router.get('/', protect, readGoals)
// router.post('/', protect, addGoal)
// router.put('/:id', protect, updateGoal)
// router.delete('/:id', protect, removeGoal)
/* OR */
// router.use('/', protect)
// router.use('/:id', protect)
// router.route('/').get(readGoals).post(createGoal)
// router.route('/:id').put(updateGoal).delete(removeGoal)
/* OR */
router.route('/').get(protect, readGoals).post(protect, createGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, removeGoal)


module.exports = router