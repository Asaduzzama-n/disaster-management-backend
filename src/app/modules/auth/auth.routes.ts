import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from './auth.controller'
import { AuthValidation } from './authValidation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/sign-up',
  validateRequest(AuthValidation.createUserZodSchema),
  AuthController.createUser,
)

router.get('/user', AuthController.getUser)

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginZodSchema),
  AuthController.loginUser,
)
router.get('/refresh-token', AuthController.refreshToken)

export const AuthRoutes = router
