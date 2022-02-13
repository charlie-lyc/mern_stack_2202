const express = require('express')
const router = express.Router()


// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'Get all goals' })
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
const { readGoals, setGoal, updateGoal, removeGoal } = require('../controllers/goalsController')
// router.get('/', readGoals)
// router.post('/', setGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', removeGoal)
////////////////////////////////////////////////////////////////////////
router.route('/').get(readGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(removeGoal)


module.exports = router