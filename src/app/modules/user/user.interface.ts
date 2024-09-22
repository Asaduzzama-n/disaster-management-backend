export type IWhereClause = {
  role?: 'ADMIN' | 'VOLUNTEER'
  OR?: Array<{
    firstName?: {
      contains: string | undefined
      mode: 'insensitive'
    }
    address?: {
      contains: string | undefined
      mode: 'insensitive'
    }
    email?: {
      contains?: string | undefined
      mode: 'insensitive'
    }
  }>
}

export type IUser = {
  id: number
  email: string
  firstName: string
  lastName?: string | null
  phone?: string | null
  role: 'ADMIN' | 'VOLUNTEER'
  age?: string | null
  avatar?: string | null
  address?: string | null
  createdAt: Date
  updatedAt: Date
}
