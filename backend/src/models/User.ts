import mongoose from "mongoose";
import { randomUUID } from "crypto";
const { Schema } = mongoose;

export const chatSchema = new Schema({
    id: {
        type: String,
        default: randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

export const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema]
})

// Defines a Mongoose Model named "User" using userSchema
export default mongoose.model("User", userSchema)