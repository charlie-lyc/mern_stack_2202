const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name for user account']
        },
        email: {
            type: String,
            required: [true, 'Please add an email for user account'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password for user account']
        }
    },
    {
        timestamps: true // Automatically Add 'createdAt' and 'updatedAt' fields to schema
    }
)

module.exports = mongoose.model('User', userSchema)