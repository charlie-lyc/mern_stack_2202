// console.log('Hello World!')

const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')


/** Connect to MongoDB **/
const connectDB = require('./config/db')
connectDB()
/**************************************/

const port = process.env.PORT || 5000
const app = express()

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


/** Error Handling **/
const errorHandler = require('./middlewares/errorMiddleware')
app.use(errorHandler)
/***************************************************************/

app.listen(port, () => console.log(`Server started on port ${port}`.blue.underline))