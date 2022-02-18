const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
    {
        /** For User Authentication **/
        user: {
            type: mongoose.Schema.Types.ObjectId, // Using 'ObjectId' of 'users' Collection from MongoDB
            required: true,
            ref: 'User'
        },
        /**************************************/
        text: {
            type: String,
            required: [true, 'Please add a text for setting goal'],
        }
    }, 
    {
        timestamps: true // Automatically Add 'createdAt' and 'updatedAt' fields to schema
    }
)

module.exports = mongoose.model('Goal', goalSchema)