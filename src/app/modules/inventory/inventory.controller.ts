import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { Inventory } from '@prisma/client'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { InventoryServices } from './inventory.services'

const createInventory = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await InventoryServices.createInventory(payload)
  sendResponse<Inventory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory created successfully.',
    data: result,
  })
})

const getAllInventories = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryServices.getAllInventories()
  sendResponse<Inventory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventories retrieved successfully.',
    data: result,
  })
})

const getSingleInventory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await InventoryServices.getSingleInventory(Number(id))

  sendResponse<Inventory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory retrieved successfully.',
    data: result,
  })
})

const updateInventory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = req.body
  const result = await InventoryServices.updateInventory(Number(id), payload)

  sendResponse<Inventory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory updated successfully.',
    data: result,
  })
})

const deleteInventory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await InventoryServices.deleteInventory(Number(id))

  sendResponse<Inventory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory deleted successfully.',
    data: result,
  })
})

export const InventoryController = {
  createInventory,
  getAllInventories,
  getSingleInventory,
  updateInventory,
  deleteInventory,
}
