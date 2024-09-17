import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import prisma from '../../../shared/prisma'
import { Crisis } from '@prisma/client'
import { uploadMultipleToCloudinary } from '../../../utils/cloudinary'
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common'
import { IWhereClause } from './crisis.interface'

const createCrisis = async (files: any, payload: Crisis) => {
  const { approvedBy } = payload
  payload.approvedBy = Number(approvedBy)

  let imageArray: string[] = []
  let cloudinaryUrls: string[] | null = []

  if (!files || Object.keys(files).length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Crisis images are required.')
  }

  if (files && Object.keys(files).length > 0) {
    files.imageUrls.map((file: any) => imageArray.push(file.path))

    cloudinaryUrls = await uploadMultipleToCloudinary(
      imageArray,
      'crises',
      'raw',
    )
    if (!cloudinaryUrls) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to upload images.')
    }
  }
  const crisisData = { ...payload, imageUrls: cloudinaryUrls }

  const crisis = await prisma.crisis.create({ data: { ...crisisData } })

  return crisis
}

const getAllCrisis = async (
  options: IPaginationOptions,
): Promise<IGenericResponse<Crisis[]> | null> => {
  const { sortBy, sortOrder, limit, searchTerm, page, severity, status } =
    options

  const skip = Number(page) * Number(limit) - Number(limit) || 0
  const take = Number(limit) || 10

  const whereClause: IWhereClause = {}

  if (searchTerm) {
    whereClause.OR = [
      {
        title: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    ]
  }

  // Severity filtering
  if (severity) {
    whereClause.severity = severity
  }

  // Status filtering
  if (status) {
    whereClause.status = status
  }

  return await prisma.$transaction(async tx => {
    const result = await tx.crisis.findMany({
      skip,
      take,
      include: {
        admin: true,
      },
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
const getSingleCrisis = async (id: number) => {
  const result = await prisma.crisis.findUnique({ where: { id } })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis does not exists.')
  }
  return result
}
const updateCrisis = async (id: number, payload: Partial<Crisis>) => {
  const isExist = await prisma.crisis.findUnique({ where: { id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis does not exists.')
  }
  const result = await prisma.crisis.update({
    where: { id },
    data: { ...payload },
  })

  return result
}

const deleteCrisis = async (id: number): Promise<Crisis> => {
  const isExist = await prisma.crisis.findUnique({ where: { id } })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Crisis does not exist.')
  }
  const result = await prisma.crisis.delete({ where: { id } })
  return result
}

export const CrisisServices = {
  createCrisis,
  getAllCrisis,
  getSingleCrisis,
  updateCrisis,
  deleteCrisis,
}
