import { NextFunction, Request, Response } from 'express'
import httpResponse from '../../handlers/httpResponse'
import responseMessage from '../../constant/responseMessage'
import httpError from '../../handlers/errorHandler/httpError'
import asyncHandler from '../../handlers/async'
import { IAuthenticateRequest } from '../../types/types'
import { IUpdateTodoRequest } from './types/todo.types'
import todoService from './service'
import { CustomError } from '../../utils/errors'

interface ICreateTodoRequest {
    title: string
    description: string
}

const createTodo = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const { title, description } = req.body as ICreateTodoRequest
        const userId = req.authenticatedUser._id

        const createdTodo = await todoService.createTodo(userId, title, description)

        httpResponse(response, request, 201, responseMessage.SUCCESS, createdTodo)
    } catch (error) {
        if (error instanceof CustomError) {
            httpError(next, error, request, error.statusCode)
        } else {
            httpError(next, error, request, 500)
        }
    }
})

const getAllTodos = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const userId = req.authenticatedUser._id

        const todos = await todoService.getAllTodos(userId)

        httpResponse(response, request, 200, responseMessage.SUCCESS, todos)
    } catch (error) {
        if (error instanceof CustomError) {
            httpError(next, error, request, error.statusCode)
        } else {
            httpError(next, error, request, 500)
        }
    }
})

const getTodoById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const { id } = req.params
        const userId = req.authenticatedUser._id

        const todo = await todoService.getTodoById(id, userId)

        httpResponse(response, request, 200, responseMessage.SUCCESS, todo)
    } catch (error) {
        if (error instanceof CustomError) {
            httpError(next, error, request, error.statusCode)
        } else {
            httpError(next, error, request, 500)
        }
    }
})

const updateTodo = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const { id } = req.params
        const updates = req.body as IUpdateTodoRequest
        const userId = req.authenticatedUser._id

        const updatedTodo = await todoService.updateTodo(id, userId, updates)

        httpResponse(response, request, 200, responseMessage.SUCCESS, updatedTodo)
    } catch (error) {
        if (error instanceof CustomError) {
            httpError(next, error, request, error.statusCode)
        } else {
            httpError(next, error, request, 500)
        }
    }
})

const deleteTodo = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest
        const { id } = req.params
        const userId = req.authenticatedUser._id

        const deletedTodo = await todoService.deleteTodo(id, userId)

        httpResponse(response, request, 200, responseMessage.SUCCESS, deletedTodo)
    } catch (error) {
        if (error instanceof CustomError) {
            httpError(next, error, request, error.statusCode)
        } else {
            httpError(next, error, request, 500)
        }
    }
})

export default {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}
