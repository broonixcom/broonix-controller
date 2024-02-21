/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValue } from 'firebase/firestore'

export interface IUpdatedDataVar {
  (
    collection: string,
    dataID: string,
    data: { [key: string]: any },
  ): Promise<void>
}

export interface IPreparedUpdatedData {
  [key: string]: any
  updatedAt: FieldValue
}
