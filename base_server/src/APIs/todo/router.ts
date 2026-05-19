import { Router } from 'express'
import todoController from './controller'
import authenticate from '../../middlewares/authenticate'

const router = Router()

router.route('/').post(authenticate, todoController.createTodo)
router.route('/').get(authenticate, todoController.getAllTodos)
router.route('/:id').get(authenticate, todoController.getTodoById)
router.route('/:id').patch(authenticate, todoController.updateTodo)
router.route('/:id').delete(authenticate, todoController.deleteTodo)

export default router
