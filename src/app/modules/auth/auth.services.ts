import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { passwordHelpers } from '../../../utils/password'
import { IRefreshTokenResponse, IUserLoginResponse } from './auth.interface'
import { jwtHelpers } from '../../../helpers/jwt'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createUser = async (data: User) => {
  const { email } = data

  const isUserExist = await prisma.user.findUnique({ where: { email } })

  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists')
  }

  const hashedPassword = await passwordHelpers.hashPassword(data?.password)

  const userData = {
    ...data,
    password: hashedPassword,
  }

  const createdUser = await prisma.user.create({
    data: userData,
  })

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }

  return createdUser
}

const loginUser = async (
  email: string,
  password: string,
): Promise<IUserLoginResponse | null> => {
  const isUserExist = await prisma.user.findUnique({ where: { email } })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.')
  }

  const passwordMatched = await passwordHelpers.isPasswordMatched(
    password,
    isUserExist?.password,
  )

  if (!passwordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access.')
  }

  const accessToken = jwtHelpers.createToken(
    {
      email: email,
      role: isUserExist?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    {
      email: email,
      role: isUserExist?.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  const userData = await prisma.user.findUnique({ where: { email } })

  return {
    userData,
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (
  token: string,
): Promise<IRefreshTokenResponse | null> => {
  let verifiedToken = null

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.')
  }

  const { email } = verifiedToken

  const isUserExist = await prisma.user.findUnique({ where: { email } })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.')
  }

  const newAccessToken = jwtHelpers.createToken(
    { email: isUserExist.email, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  return { accessToken: newAccessToken }
}

const getUser = async (bearerToken: string) => {
  let verifiedToken = null

  try {
    verifiedToken = jwtHelpers.verifyToken(
      bearerToken,
      config.jwt.secret as Secret,
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid accessToken Token')
  }

  const { email } = verifiedToken

  const userData = await prisma.user.findUnique({
    where: { email },
    select: {
      password: false,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      age: true,
      phone: true,
    },
  })

  return {
    userData,
  }
}

export const AuthServices = {
  createUser,
  loginUser,
  refreshToken,
  getUser,
}
