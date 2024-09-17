import { z } from 'zod'

const UserRole = z.enum(['ADMIN', 'VOLUNTEER'])

const createUserZodSchema = z.object({
  body: z.object({
    id: z.number().int().optional(),
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    role: UserRole,
    password: z.string().min(8),
    age: z.number().int().min(1).optional(),
    avatar: z.string().optional(),
    address: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    tasks: z.array(z.any()).optional(),
    crisis: z.array(z.any()).optional(),
    inventories: z.array(z.any()).optional(),
  }),
})

const userLoginZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    password: z.string({ required_error: 'Password is required!' }),
  }),
})

export const AuthValidation = {
  createUserZodSchema,
  userLoginZodSchema,
}
