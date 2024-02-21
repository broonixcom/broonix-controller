import { useState } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { ICreateDataVar, IPreparedNewData } from './useCreateDataTypes'

const useCreateData = () => {
  const [status, setStatus] = useState<boolean>()
  const [isLoading, setLoading] = useState(false)

  const foo: ICreateDataVar = async (collection, dataID, data) => {
    setStatus(undefined)
    setLoading(true)

    try {
      const preparedNewData: IPreparedNewData = {
        ...data,
        id: dataID,
        createdAt: serverTimestamp(),
        updatedAt: null,
      }

      await setDoc(doc(firebaseDB, collection, dataID), preparedNewData)
      setStatus(true)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message)
      setStatus(false)
    } finally {
      setLoading(false)
    }
  }

  return { foo, status, isLoading }
}

export default useCreateData
