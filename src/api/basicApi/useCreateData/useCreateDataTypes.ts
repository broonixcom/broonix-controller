import { FieldValue } from 'firebase/firestore'

export interface ICreateDataVar {
  (
    collection: string,
    dataID: string,
    data: { [key: string]: any },
  ): Promise<void>
}

export interface IPreparedNewData {
  [key: string]: any
  id: string
  createdAt: FieldValue
  updatedAt: null
}
