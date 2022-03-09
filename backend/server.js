// console.log('Hello World!')

const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')


/** Connect to MongoDB **/
const connectDB = require('./config/db')
connectDB()
/**************************************/

const port = process.env.PORT || 5000
const app = express()

/**
 * Enable All CORS Request
 */
app.use(cors())

/** Use Body-Parser to Get Data from Request Body **/
app.use(express.json()) // for Parsing 'application/json'
app.use(express.urlencoded({ extended: false })) // for Parsing 'application/x-www-form-urlencoded'
/***************************************************/


/* GOALS */
// app.get('/api/goals', (req, res) => {
//     // res.send('Get all goals')
//     //////////////////////////////////////////////////
//     // res.status(200).send('Get all goals')
//     //////////////////////////////////////////////////
//     res.status(200).json({ message: 'Get all goals' })
// })
/////////////////////////////////////////////////////////
// const goalsRouter = require('./routers/goalsRouter')
// app.use('/api/goals', goalsRouter)
/////////////////////////////////////////////////////////
app.use('/api/goals', require('./routers/goalsRouter'))

/* USERS */
// const usersRouter = require('./routers/usersRouter')
// app.use('/api/users', usersRouter)
/////////////////////////////////////////////////////////
app.use('/api/users', require('./routers/usersRouter'))


/***************************************************************/
/* SERVE FRONTEND */
const path = require('path')
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => res.send('Please set NODE_ENV to production!'))
}
/***************************************************************/

/** Error Handling **/
const errorHandler = require('./middlewares/errorMiddleware')
app.use(errorHandler)
/***************************************************************/

app.listen(port, () => {
    /* Development */
    // console.log(`Server started on port ${port}`.blue.underline)
})