import express, { Application } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import routes from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'

const app: Application = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/', routes)

app.use(globalErrorHandler)

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [
      {
        path: '',
        message: 'API not found',
      },
    ],
  })
})

export default app
