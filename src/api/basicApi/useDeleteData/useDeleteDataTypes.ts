export interface IDeleteDataVar {
  (collection: string, dataID: string): Promise<void>
}
