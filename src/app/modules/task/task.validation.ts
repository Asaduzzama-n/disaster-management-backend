import { z } from 'zod'

const TaskStatus = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])

// Create Task validation schema
const createTaskZodSchema = z.object({
  body: z.object({
    description: z.string().min(1, 'Description is required'),
    location: z.string().min(1, 'Location is required'),
    assignedTo: z
      .number()
      .int()
      .positive('Assigned user must be a valid user ID'),
    crisisId: z.number().int().positive('Crisis ID must be valid'),
  }),
})

const updateTaskZodSchema = z.object({
  body: z.object({
    description: z.string().min(1, 'Description is required').optional(),
    location: z.string().min(1, 'Location is required').optional(),
    assignedTo: z
      .number()
      .int()
      .positive('Assigned user must be a valid user ID')
      .optional(),
    crisisId: z.number().int().positive('Crisis ID must be valid').optional(),
  }),
})

export const TaskValidation = {
  createTaskZodSchema,
  updateTaskZodSchema,
}
