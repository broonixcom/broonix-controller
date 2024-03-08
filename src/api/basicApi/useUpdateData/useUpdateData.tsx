import { useState } from 'react'
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { RES_CODE } from '@api/apiConstants'

import { IUpdatedDataVar, IPreparedUpdatedData } from './useUpdateDataTypes'

const useUpdateData = () => {
  const [status, setStatus] = useState<number>()
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
      setStatus(RES_CODE.ok)
    } catch (error: any) {
      setStatus(RES_CODE.error)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { foo, status, isLoading }
}

export default useUpdateData
