import { useState } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { IUpdatedDataVar, IPreparedUpdatedData } from './useUpdateDataTypes'

const useUpdateData = () => {
  const [status, setStatus] = useState<boolean>()
  const [isLoading, setLoading] = useState(false)

  const foo: IUpdatedDataVar = async (collection, dataID, data) => {
    setStatus(undefined)
    setLoading(true)

    try {
      const preparedUpdatedData: IPreparedUpdatedData = {
        ...data,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(doc(firebaseDB, collection, dataID), preparedUpdatedData)
      setStatus(true)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus(false)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { foo, status, isLoading }
}

export default useUpdateData
