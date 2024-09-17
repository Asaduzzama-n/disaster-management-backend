import { CrisisSeverity, CrisisStatus } from '@prisma/client'

export type IWhereClause = {
  severity?: CrisisSeverity
  status?: CrisisStatus
  OR?: Array<{
    title?: {
      contains: string | undefined
      mode: 'insensitive'
    }
    description?: {
      contains: string | undefined
      mode: 'insensitive'
    }
  }>
}
