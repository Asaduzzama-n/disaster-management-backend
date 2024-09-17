import { Donation } from '@prisma/client'
import prisma from '../../../shared/prisma'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createDonation = async (payload: Donation): Promise<Donation | null> => {
  const result = await prisma.donation.create({ data: { ...payload } })
  return result
}

const getAllDonations = async (): Promise<Donation[] | null> => {
  const result = await prisma.donation.findMany({})

  return result
}

const getSingleDonation = async (id: number): Promise<Donation | null> => {
  const result = await prisma.donation.findUnique({
    where: { id },
  })
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation does not exists.')
  return result
}

const updateDonation = async (
  id: number,
  payload: Partial<Donation>,
): Promise<Donation | null> => {
  const isExist = await prisma.donation.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation does not exists.')

  const result = await prisma.donation.update({
    where: { id },
    data: { ...payload },
  })

  return result
}

const deleteDonation = async (id: number): Promise<Donation | null> => {
  const isExist = await prisma.donation.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation does not exists.')

  const result = await prisma.donation.delete({
    where: { id },
  })

  return result
}

export const DonationServices = {
  createDonation,
  getAllDonations,
  getSingleDonation,
  updateDonation,
  deleteDonation,
}
