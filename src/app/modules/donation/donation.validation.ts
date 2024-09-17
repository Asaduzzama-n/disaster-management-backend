import { z } from 'zod'

const createDonationZodSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
    donorName: z.string().nullable().optional(),
    donorEmail: z.string().email().nullable().optional(),
    message: z.string().nullable().optional(),
  }),
})

const updateDonationZodSchema = z.object({
  body: z.object({
    amount: z.number().positive().optional(),
    donorName: z.string().nullable().optional(),
    donorEmail: z.string().email().nullable().optional(),
    message: z.string().nullable().optional(),
  }),
})

export const DonationValidation = {
  createDonationZodSchema,
  updateDonationZodSchema,
}
