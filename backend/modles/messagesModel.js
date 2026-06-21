import mongoose from "mongoose";

const messagSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    message: {
        type: Object,
    }
},
    {
        timestamps: true
    }
)

messagSchema.index({
    conversationId: 1,
    createdAt: 1
})


const messageModel = mongoose.model.Messages || mongoose.model('Messages', messagSchema)
export default messageModel