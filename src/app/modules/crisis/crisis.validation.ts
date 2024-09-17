import { z } from 'zod'

const CrisisSeverity = z.enum(['Low', 'Medium', 'High', 'Critical'])
const CrisisStatus = z.enum(['PENDING', 'APPROVED', 'RESOLVED'])

// Zod validation schema for Crisis model
const createCrisisZodSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrls: z.array(z.string().url('Invalid image URL format')).optional(),
  locations: z.array(z.string().min(1, 'Location cannot be empty')),
  severity: CrisisSeverity,
  status: CrisisStatus,
  requiredHelp: z.string().min(1, 'Required help description is needed'),
  approvedBy: z.string(),
})

// Zod validation schema for Crisis model
const updateCrisisZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    imageUrls: z.array(z.string().url('Invalid image URL format')).optional(),
    locations: z
      .array(z.string().min(1, 'Location cannot be empty'))
      .optional(),
    severity: CrisisSeverity.optional(),
    status: CrisisStatus.optional(),
    requiredHelp: z
      .string()
      .min(1, 'Required help description is needed')
      .optional(),
    approvedBy: z.string().optional(),
  }),
})

export const CrisisValidation = {
  createCrisisZodSchema,
  updateCrisisZodSchema,
}
