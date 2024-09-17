import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { Task } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { TaskServices } from './task.services'

const createTask = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await TaskServices.createTask(payload)
  sendResponse<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task created successfully.',
    data: result,
  })
})

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const result = await TaskServices.getAllTasks()
  sendResponse<Task[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks retrieved successfully.',
    data: result,
  })
})

const getSingleTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await TaskServices.getSingleTask(Number(id))

  sendResponse<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task retrieved successfully.',
    data: result,
  })
})

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = req.body
  const result = await TaskServices.updateTask(Number(id), payload)

  sendResponse<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated successfully.',
    data: result,
  })
})

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await TaskServices.deleteTask(Number(id))

  sendResponse<Task>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted successfully.',
    data: result,
  })
})

export const TaskController = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
}
