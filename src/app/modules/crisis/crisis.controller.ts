import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { CrisisServices } from './crisis.services'
import { Crisis } from '@prisma/client'
import { IGenericResponse } from '../../../interfaces/common'

const createCrisis = catchAsync(async (req: Request, res: Response) => {
  const files = req.files
  const { ...payload } = req.body
  const result = await CrisisServices.createCrisis(files, payload)
  sendResponse<Crisis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crisis created successfully.',
    data: result,
  })
})

const updateCrisis = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...payload } = req.body
  const result = await CrisisServices.updateCrisis(Number(id), payload)
  sendResponse<Crisis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crisis created successfully.',
    data: result,
  })
})

const getAllCrisis = catchAsync(async (req: Request, res: Response) => {
  const options = req.query
  const result = await CrisisServices.getAllCrisis(options)

  sendResponse<IGenericResponse<Crisis[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crisis retrieved successfully.',
    data: result,
  })
})

const getSingleCrisis = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CrisisServices.getSingleCrisis(parseInt(id))

  sendResponse<Crisis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crisis retrieved successfully.',
    data: result,
  })
})

const deleteCrisis = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CrisisServices.deleteCrisis(Number(id))
  sendResponse<Crisis>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Crisis deleted successfully.',
    data: result,
  })
})

export const CrisisController = {
  createCrisis,
  getAllCrisis,
  getSingleCrisis,
  updateCrisis,
  deleteCrisis,
}
