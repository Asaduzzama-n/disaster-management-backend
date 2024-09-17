import { CrisisSeverity, CrisisStatus } from '@prisma/client'

export type IPaginationOptions = {
  page?: string | undefined
  limit?: string | undefined
  sortBy?: string
  searchTerm?: string
  sortOrder?: 'asc' | 'desc'
  severity?: CrisisSeverity
  status?: CrisisStatus
}

export type IGenericResponse<T> = {
  meta: {
    total: number
    page: number
    limit: number
  }
  data: T
}
