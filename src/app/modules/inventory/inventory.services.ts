import { Inventory } from '@prisma/client'
import prisma from '../../../shared/prisma'
import { IPaginationOptions } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const createInventory = async (
  payload: Inventory,
): Promise<Inventory | null> => {
  const result = await prisma.inventory.create({ data: { ...payload } })
  return result
}

const getAllInventories = async (): Promise<Inventory[] | null> => {
  const result = await prisma.inventory.findMany({
    include: { user: true },
  })

  return result
}

const getSingleInventory = async (id: number): Promise<Inventory | null> => {
  const result = await prisma.inventory.findUnique({
    where: { id },
    include: { user: true },
  })
  if (!result)
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory does not exists.')
  return result
}

const updateInventory = async (
  id: number,
  payload: Partial<Inventory>,
): Promise<Inventory | null> => {
  const isExist = await prisma.inventory.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory does not exists.')

  const result = await prisma.inventory.update({
    where: { id },
    data: { ...payload },
  })

  return result
}

const deleteInventory = async (id: number): Promise<Inventory | null> => {
  const isExist = await prisma.inventory.findUnique({ where: { id } })
  if (!isExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Inventory does not exists.')

  const result = await prisma.inventory.delete({
    where: { id },
  })

  return result
}

export const InventoryServices = {
  createInventory,
  getAllInventories,
  getSingleInventory,
  updateInventory,
  deleteInventory,
}
