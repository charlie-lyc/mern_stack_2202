const express = require('express')
const router = express.Router()

const { 
    registerUser, 
    loginUser, 
    getMe, 
    // logoutUser,
    // removeMe,
    // updateMe
} = require('../controllers/usersController')

/** Public Access **/
router.post('/', registerUser)
router.post('/login', loginUser)

/** Private Access: Use Authentication Middleware **/
const protect = require('../middlewares/authMiddleware')

// router.post('/logout', protect, logoutUser)
// router.get('/me', protect, getMe)
// router.put('/me', protect, updateMe)
// router.delete('/me', protect, removeMe)
/* OR */
// router.use('/logout', protect)
// router.use('/me', protect)
// router.route('/logout').post(logoutUser)
// router.route('/me').get(getMe).put(updateMe).delete(removeMe)
/* OR */
router.route('/me').get(protect, getMe)
// router.route('/logout').get(protect, logoutUser)
// router.route('/me').put(protect, updateMe).delete(protect, removeMe)


module.exports = router