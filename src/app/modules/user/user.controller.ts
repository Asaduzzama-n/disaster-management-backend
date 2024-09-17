import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { User } from '@prisma/client'
import httpStatus from 'http-status'
import { UserServices } from './user.services'
import { IGenericResponse } from '../../../interfaces/common'

export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const options = req.query
  const result = await UserServices.getAllUser(options)

  sendResponse<IGenericResponse<User[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully.',
    data: result,
  })
})

export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await UserServices.getSingleUser(parseInt(id))

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully.',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const files = req.files
  const id = req.params.id
  const { ...updateUserData } = req.body

  const result = await UserServices.updateUser(
    Number(id),
    updateUserData,
    files,
  )

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully!',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = await UserServices.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

export const UserController = {
  getAllUser,
  updateUser,
  deleteUser,
  getSingleUser,
}
