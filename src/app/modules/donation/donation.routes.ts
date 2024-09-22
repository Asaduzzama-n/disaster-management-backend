import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { DonationController } from './donation.controller'
import { DonationValidation } from './donation.validation'

const router = express.Router()

router.get('/:id', DonationController.getSingleDonation)
router.delete('/:id', DonationController.deleteDonation)

router.post(
  '/',
  validateRequest(DonationValidation.createDonationZodSchema),
  DonationController.createDonation,
)

router.patch(
  '/:id',
  validateRequest(DonationValidation.updateDonationZodSchema),
  DonationController.updateDonation,
)

router.get('/', DonationController.getAllDonations)

export const DonationRoutes = router
