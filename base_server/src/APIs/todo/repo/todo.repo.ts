import TodoModel, { ITodo } from '../_shared/models/todo.model'

const createTodo = async (payload: Pick<ITodo, 'title' | 'description' | 'completed' | 'userId'>) => {
    const todo = await TodoModel.create(payload)
    return todo
}

const getTodosByUserId = async (userId: string) => {
    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 })
    return todos
}

const getTodoById = async (todoId: string, userId: string) => {
    const todo = await TodoModel.findOne({ _id: todoId, userId })
    return todo
}

const updateTodo = async (todoId: string, userId: string, updates: Partial<Pick<ITodo, 'title' | 'description' | 'completed'>>) => {
    const todo = await TodoModel.findOneAndUpdate(
        { _id: todoId, userId },
        updates,
        { new: true, runValidators: true }
    )
    return todo
}

const deleteTodo = async (todoId: string, userId: string) => {
    const todo = await TodoModel.findOneAndDelete({ _id: todoId, userId })
    return todo
}

export default {
    createTodo,
    getTodosByUserId,
    getTodoById,
    updateTodo,
    deleteTodo
}
