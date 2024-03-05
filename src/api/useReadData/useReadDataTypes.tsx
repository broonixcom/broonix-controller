import { DocumentData } from 'firebase/firestore'

export interface IReadDataVar {
  (
    collection: string,
    dataID: string,
  ): Promise<DocumentData | ErrorConstructor | undefined>
}
