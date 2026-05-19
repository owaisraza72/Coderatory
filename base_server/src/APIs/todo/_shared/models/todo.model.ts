import mongoose from 'mongoose'

export interface ITodo {
    title: string
    description: string
    completed: boolean
    userId: string
}

const todoSchema = new mongoose.Schema<ITodo>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 100
        },
        completed: {
            type: Boolean,
            default: false,
            required: true
        },
        userId: {
            type: String,
            required: true,
            index: true
        }
    },
    { timestamps: true }
)

export default mongoose.model<ITodo>('Todo', todoSchema)

