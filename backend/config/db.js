const mongoose = require('mongoose')

// const connectDB = () => {
//     try {
//         mongoose.connect(process.env.MONGODB_URI, () => {
//             console.log(`MongoDB Connected: ${mongoose.connection.host}`.cyan.underline.bold)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
/* OR */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        /* Development */
        // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        /* Development */
        // console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB