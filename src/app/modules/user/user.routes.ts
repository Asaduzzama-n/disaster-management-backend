import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'
import { upload } from '../../middlewares/multerMiddleware'
import { UserValidation } from './user.validation'

const router = express.Router()

router.get('/:id', UserController.getSingleUser)
router.delete('/:id', UserController.deleteUser)

router.patch(
  '/profile/:id',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.updateUserZodSchema.parse(req.body)
    return UserController.updateUser(req, res, next)
  },
)

router.get('/', UserController.getAllUser)

export const UserRoutes = router
