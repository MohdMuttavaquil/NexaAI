import mongoose from "mongoose";

const titleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

titleSchema.index({
    userId: 1,
    createdAt: 1
})

const titleModel = mongoose.model.Conversation || mongoose.model('Conversation', titleSchema)
export default titleModel