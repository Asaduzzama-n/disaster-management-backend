import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import ApiError from '../../errors/ApiError'
import config from '../../config'
import { Prisma } from '@prisma/client'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handlePrismaValidationError from '../../errors/handlePrismaValidationError'
import handlePrismaClientError from '../../errors/handlePrismaClientError'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(`🚨 Inside global error handler 🪐`, error)

  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handlePrismaValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handlePrismaClientError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
