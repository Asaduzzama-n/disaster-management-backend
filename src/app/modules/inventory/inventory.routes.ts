import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { InventoryValidation } from './inventory.validation'
import { InventoryController } from './inventory.controller'

const router = express.Router()

router.get('/:id', InventoryController.getSingleInventory)
router.delete('/:id', InventoryController.deleteInventory)

router.post(
  '/',
  validateRequest(InventoryValidation.createInventoryZodSchema),
  InventoryController.createInventory,
)

router.patch(
  '/:id',
  validateRequest(InventoryValidation.updateInventoryZodSchema),
  InventoryController.updateInventory,
)

router.get('/', InventoryController.getAllInventories)

export const InventoryRoutes = router
