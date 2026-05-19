import responseMessage from '../../constant/responseMessage'
import todoRepository from './repo/todo.repo'
import { CustomError } from '../../utils/errors'
import { IUpdateTodoRequest } from './types/todo.types'

const createTodo = async (userId: string, title: string, description: string) => {
    if (!title || typeof title !== 'string') {
        throw new CustomError('Todo title is required', 422)
    }

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
        throw new CustomError('Todo title is required', 422)
    }

    if (!description || typeof description !== 'string') {
        throw new CustomError('Todo description is required', 422)
    }

    const trimmedDescription = description.trim()
    if (trimmedDescription.length < 5) {
        throw new CustomError('Todo description must be at least 5 characters', 422)
    }

    if (trimmedDescription.length > 100) {
        throw new CustomError('Todo description must be at most 100 characters', 422)
    }

    return await todoRepository.createTodo({
        title: trimmedTitle,
        description: trimmedDescription,
        completed: false,
        userId
    })
}

const getAllTodos = async (userId: string) => {
    return await todoRepository.getTodosByUserId(userId)
}

const getTodoById = async (todoId: string, userId: string) => {
    if (!todoId) {
        throw new CustomError('Todo ID is required', 422)
    }

    const todo = await todoRepository.getTodoById(todoId, userId)
    if (!todo) {
        throw new CustomError(responseMessage.NOT_FOUND('Todo'), 404)
    }

    return todo
}

const updateTodo = async (todoId: string, userId: string, updates: IUpdateTodoRequest) => {
    if (!todoId) {
        throw new CustomError('Todo ID is required', 422)
    }

    if (updates.title === undefined && updates.description === undefined && updates.completed === undefined) {
        throw new CustomError('At least one field (title, description, or completed) must be provided', 422)
    }

    const normalizedUpdates: Partial<{ title: string; description: string; completed: boolean }> = {}

    if (updates.title !== undefined) {
        if (typeof updates.title !== 'string') {
            throw new CustomError('Todo title must be a string', 422)
        }

        const trimmedTitle = updates.title.trim()
        if (!trimmedTitle) {
            throw new CustomError('Todo title is required', 422)
        }

        normalizedUpdates.title = trimmedTitle
    }

    if (updates.description !== undefined) {
        if (typeof updates.description !== 'string') {
            throw new CustomError('Todo description must be a string', 422)
        }

        const trimmedDescription = updates.description.trim()
        if (trimmedDescription.length < 5) {
            throw new CustomError('Todo description must be at least 5 characters', 422)
        }

        if (trimmedDescription.length > 100) {
            throw new CustomError('Todo description must be at most 100 characters', 422)
        }

        normalizedUpdates.description = trimmedDescription
    }

    if (updates.completed !== undefined) {
        if (typeof updates.completed !== 'boolean') {
            throw new CustomError('Todo completed must be a boolean', 422)
        }

        normalizedUpdates.completed = updates.completed
    }

    const updatedTodo = await todoRepository.updateTodo(todoId, userId, normalizedUpdates)
    if (!updatedTodo) {
        throw new CustomError(responseMessage.NOT_FOUND('Todo'), 404)
    }

    return updatedTodo
}

const deleteTodo = async (todoId: string, userId: string) => {
    if (!todoId) {
        throw new CustomError('Todo ID is required', 422)
    }

    const deletedTodo = await todoRepository.deleteTodo(todoId, userId)
    if (!deletedTodo) {
        throw new CustomError(responseMessage.NOT_FOUND('Todo'), 404)
    }

    return deletedTodo
}

export default {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}
