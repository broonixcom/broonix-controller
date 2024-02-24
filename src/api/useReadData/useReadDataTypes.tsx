export interface IReadDataVar {
  (collection: string, dataID: string): Promise<void | ErrorConstructor>
}
