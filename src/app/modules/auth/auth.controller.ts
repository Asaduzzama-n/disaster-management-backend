import { NextFunction, Request, Response } from 'express'

const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.send('HELLO ALL IS OK!')
}

export const AuthController = {
  createUser,
}
