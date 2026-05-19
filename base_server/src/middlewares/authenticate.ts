import { NextFunction, Request, Response } from 'express'
import { IAuthenticateRequest, IDecryptedJwt } from '../types/types'
import jwt from '../utils/jwt'
import config from '../config/config'
import query from '../APIs/user/_shared/repo/user.repository'
import httpError from '../handlers/errorHandler/httpError'
import responseMessage from '../constant/responseMessage'
import asyncHandler from '../handlers/async'


export default asyncHandler(async (request: Request, _response: Response, next: NextFunction) => {
    try {
        const req = request as IAuthenticateRequest

        const { accessToken } = req.cookies as {
            accessToken: string | undefined
        }

        console.log("COOKIES:", req.cookies)

        if (!accessToken) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        const { userId } = jwt.verifyToken(
            accessToken,
            config.TOKENS.ACCESS.SECRET
        ) as IDecryptedJwt

        const user = await query.findUserById(userId)

        if (!user) {
            return httpError(next, new Error(responseMessage.UNAUTHORIZED), request, 401)
        }

        req.authenticatedUser = {
            ...user.toObject(),
            _id: user._id.toString()
        }

        return next()
    } catch (error) {
        return httpError(next, error, request, 500)
    }
})
