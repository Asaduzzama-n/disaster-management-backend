import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthServices } from './auth.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import config from '../../../config'
import { IRefreshTokenResponse } from './auth.interface'
import { User } from '@prisma/client'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account created successfully.',
    data: result,
  })
})

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await AuthServices.loginUser(email, password)

  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successful.',
    data: others,
  })
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  console.log(refreshToken)

  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token fetched successfully!',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = await AuthServices.deleteUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const files = req.files
  const id = req.params.id
  const { ...updateUserData } = req.body

  const result = await AuthServices.updateUser(
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

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  deleteUser,
  updateUser,
}
