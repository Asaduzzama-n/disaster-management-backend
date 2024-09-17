export type IPaginationOptions = {
  page?: string | undefined
  limit?: string | undefined
  sortBy?: string
  searchTerm?: string
  sortOrder?: 'asc' | 'desc'
}

export type IGenericResponse<T> = {
  meta: {
    total: number
    page: number
    limit: number
  }
  data: T
}
