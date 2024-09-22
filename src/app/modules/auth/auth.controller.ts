import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AuthServices } from './auth.services'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import config from '../../../config'
import { IRefreshTokenResponse } from './auth.interface'

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

const getUser = catchAsync(async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization']

  const result = await AuthServices.getUser(authHeader as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

export const AuthController = {
  getUser,
  createUser,
  loginUser,
  refreshToken,
}
