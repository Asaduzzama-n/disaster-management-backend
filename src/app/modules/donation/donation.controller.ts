import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { Donation } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { DonationServices } from './donation.services'

const createDonation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await DonationServices.createDonation(payload)
  sendResponse<Donation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation created successfully.',
    data: result,
  })
})

const getAllDonations = catchAsync(async (req: Request, res: Response) => {
  const result = await DonationServices.getAllDonations()
  sendResponse<Donation[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donations retrieved successfully.',
    data: result,
  })
})

const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await DonationServices.getSingleDonation(Number(id))

  sendResponse<Donation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation retrieved successfully.',
    data: result,
  })
})

const updateDonation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = req.body
  const result = await DonationServices.updateDonation(Number(id), payload)

  sendResponse<Donation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation updated successfully.',
    data: result,
  })
})

const deleteDonation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await DonationServices.deleteDonation(Number(id))

  sendResponse<Donation>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation deleted successfully.',
    data: result,
  })
})

export const DonationController = {
  createDonation,
  getAllDonations,
  getSingleDonation,
  updateDonation,
  deleteDonation,
}
