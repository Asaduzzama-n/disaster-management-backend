import { z } from 'zod'

const InventoryTypeEnum = z.enum(['RELIEF', 'EXPENSE'])

// Define the schema for the Inventory model
const createInventoryZodSchema = z.object({
  body: z.object({
    name: z.string(),
    type: InventoryTypeEnum,
    quantity: z.number().int().min(0),
    createdBy: z.number().int(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
})

// Define the schema for the Inventory model
const updateInventoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    type: InventoryTypeEnum.optional(),
    quantity: z.number().int().min(0).optional(),
    createdBy: z.number().int().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
})

export const InventoryValidation = {
  createInventoryZodSchema,
  updateInventoryZodSchema,
}
