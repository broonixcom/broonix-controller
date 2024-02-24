import { useState } from 'react'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { RES_CODE } from '@api/apiConstants'

import { ICreateDataVar, IPreparedNewData } from './useCreateDataTypes'

const useCreateData = () => {
  const [status, setStatus] = useState<number>()
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
      setStatus(RES_CODE.ok)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message)
      setStatus(RES_CODE.error)
    } finally {
      setLoading(false)
    }
  }

  return { foo, status, isLoading }
}

export default useCreateData
