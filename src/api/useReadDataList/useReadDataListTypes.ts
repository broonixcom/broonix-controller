export interface IReadDataListVar {
  (param: {
    dataColl: string
    pageLimit: number
    sort?: 'desc' | 'asc'
    lazyLoad?: boolean
    search?: {
      field: string
      value: string | number
    }
  }): Promise<void>
}
