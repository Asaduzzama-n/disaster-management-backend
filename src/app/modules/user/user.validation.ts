import { z } from 'zod'

const updateUserZodSchema = z.object({
  id: z.number().int().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
  age: z.string().min(1).optional(),
  avatar: z.string().optional(),
  address: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  tasks: z.array(z.any()).optional(),
  crisis: z.array(z.any()).optional(),
  inventories: z.array(z.any()).optional(),
})

export const UserValidation = {
  updateUserZodSchema,
}
