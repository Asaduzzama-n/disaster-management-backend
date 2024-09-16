import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from './auth.controller'
import { AuthValidation } from './authValidation'
import validateRequest from '../../middlewares/validateRequest'
import { upload } from '../../middlewares/multerMiddleware'

const router = express.Router()

router.post(
  '/sign-up',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
)

router.post(
  '/sign-in',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser,
)
router.get('/refresh-token', AuthController.refreshToken)
router.delete('/:id', AuthController.deleteUser)

router.patch(
  '/profile/:id',
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = AuthValidation.updateUserZodSchema.parse(req.body)
    return AuthController.updateUser(req, res, next)
  },
)

export const AuthRoutes = router
