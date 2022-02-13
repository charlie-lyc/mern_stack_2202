// console.log('Hello World!')

const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

/** Use Body-Parser to Get Data from Request Body **/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
/***************************************************/


// app.get('/api/goals', (req, res) => {
//     // res.send('Get all goals')
//     // res.status(200).send('Get all goals')
//     res.status(200).json({ message: 'Get all goals' })
// })
/////////////////////////////////////////////////////
const goalsRouter = require('./routers/goalsRouter')
app.use('/api/goals', goalsRouter)


/***************************************************/
/** Error Handling **/
const { errorHandler } = require('./middleware/errorMiddleware')
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))