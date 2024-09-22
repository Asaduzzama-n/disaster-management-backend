import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IUser, IWhereClause } from './user.interface'
import { IGenericResponse } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { uploadToCloudinary } from '../../../utils/cloudinary'

const getAllUser = async (
  options: any,
): Promise<IGenericResponse<IUser[]> | null> => {
  const { sortBy, sortOrder, searchTerm, limit, page, role } = options

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0
  const take = parseInt(limit) || 10

  // Initialize the where clause
  const whereClause: IWhereClause = {}

  // Add search term condition
  if (searchTerm) {
    whereClause.OR = [
      {
        firstName: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        address: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    ]
  }

  // Add role filter condition
  if (role) {
    whereClause.role = role
  }

  return await prisma.$transaction(async tx => {
    // Fetch user data, excluding the password field
    const result = await tx.user.findMany({
      skip,
      take,

      orderBy:
        sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
      where: whereClause,

      select: {
        password: false,
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        age: true,
        avatar: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    // Get total count of users matching the filter
    const total = await tx.user.count({
      where: whereClause,
    })

    return {
      meta: {
        total,
        page: parseInt(page ?? '1'),
        limit: parseInt(limit || '20'),
      },
      data: result,
    }
  })
}

const getSingleUser = async (id: number): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { id } })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.')
  }

  return result
}

const updateUser = async (id: number, payload: Partial<User>, files: any) => {
  const isUserExist = await prisma.user.findUnique({ where: { id } })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists.')
  }

  const updatedUserData: Partial<User> = { ...payload }

  let updatedAvatar = null

  //upload file to cloudinary
  if (files && Object.keys(files).length > 0) {
    updatedAvatar = await uploadToCloudinary(
      files.avatar[0]?.path,
      'avatars',
      'raw',
    )
    if (!updatedAvatar) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload image.')
    }
    updatedUserData.avatar = updatedAvatar?.url
  }

  const result = await prisma.user.update({
    where: { id },
    data: { ...updatedUserData },
  })

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to update profile information.',
    )
  }

  return result
}

const deleteUser = async (id: number): Promise<User> => {
  const result = await prisma.user.delete({ where: { id } })
  return result
}

export const UserServices = {
  getAllUser,
  updateUser,
  getSingleUser,
  deleteUser,
}
