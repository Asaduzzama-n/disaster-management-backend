import { User } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IWhereClause } from './user.interface'
import { IGenericResponse } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { uploadToCloudinary } from '../../../utils/cloudinary'

const getAllUser = async (
  options: any,
): Promise<IGenericResponse<User[]> | null> => {
  const { sortBy, sortOrder, searchTerm, limit, page } = options

  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0

  const take = parseInt(limit) || 10

  const whereClause: IWhereClause = {}

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

  return await prisma.$transaction(async tx => {
    const result = await tx.user.findMany({
      skip,
      take,
      orderBy:
        sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
      where: whereClause,
    })

    const total = result.length

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
