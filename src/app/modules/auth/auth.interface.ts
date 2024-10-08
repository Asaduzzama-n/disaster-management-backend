import { User } from '@prisma/client'

export type IUserLoginResponse = {
  userData: User | null
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}
