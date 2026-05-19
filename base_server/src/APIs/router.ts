import { Router } from 'express'
import controller from './controller'
import rateLimiter from '../middlewares/rateLimiter'
import todoRouter from './todo/router'

const router = Router()

router.route('/self').get(rateLimiter, controller.self)
router.route('/health').get(controller.health)
router.use('/todos', todoRouter)

export default router
