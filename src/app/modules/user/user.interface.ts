export type IWhereClause = {
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
