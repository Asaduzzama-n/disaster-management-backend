import { Task } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IPaginationOptions } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createTask = async (payload: Task): Promise<Task | null> => {
  const result = await prisma.task.create({ data: { ...payload } })
  return result
}

const getAllTasks = async (): Promise<Task[] | null> => {
  const result = await prisma.task.findMany({
    include: { volunteer: true, crisis: true },
  })

  return result
}

const getSingleTask = async (id: number): Promise<Task | null> => {
  const result = await prisma.task.findUnique({
    where: { id },
    include: { volunteer: true, crisis: true },
  })
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Task does not exists.')
  return result
}

const updateTask = async (
  id: number,
  payload: Partial<Task>,
): Promise<Task | null> => {
  const isExist = await prisma.task.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Task does not exists.')

  const result = await prisma.task.update({
    where: { id },
    data: { ...payload },
  })

  return result
}

const deleteTask = async (id: number): Promise<Task | null> => {
  const isExist = await prisma.task.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Task does not exists.')

  const result = await prisma.task.delete({
    where: { id },
  })

  return result
}

export const TaskServices = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
}
