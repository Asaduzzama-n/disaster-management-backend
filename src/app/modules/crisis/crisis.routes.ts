import express, { NextFunction, Request, Response } from 'express'
import { multipleImageUpload, upload } from '../../middlewares/multerMiddleware'
import { CrisisValidation } from './crisis.validation'
import { CrisisController } from './crisis.controller'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.get('/:id', CrisisController.getSingleCrisis)
router.delete('/:id', CrisisController.deleteCrisis)

router.post(
  '/',
  multipleImageUpload,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CrisisValidation.createCrisisZodSchema.parse(req.body)
    return CrisisController.createCrisis(req, res, next)
  },
)

router.patch(
  '/:id',
  validateRequest(CrisisValidation.updateCrisisZodSchema),
  CrisisController.updateCrisis,
)

router.get('/', CrisisController.getAllCrisis)

export const CrisisRoutes = router
