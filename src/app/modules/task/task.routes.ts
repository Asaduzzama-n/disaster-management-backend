import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { TaskValidation } from './task.validation'
import { TaskController } from './task.controller'

const router = express.Router()

router.get('/:id', TaskController.getSingleTask)
router.delete('/:id', TaskController.deleteTask)

router.post(
  '/',
  validateRequest(TaskValidation.createTaskZodSchema),
  TaskController.createTask,
)

router.patch(
  '/:id',
  validateRequest(TaskValidation.updateTaskZodSchema),
  TaskController.updateTask,
)

router.get('/', TaskController.getAllTasks)

export const TaskRoutes = router
