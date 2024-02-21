import { useState } from 'react'

import { doc, deleteDoc } from 'firebase/firestore'
import { firebaseDB } from '@src/firebase'

import { IDeleteDataVar } from './useDeleteDataTypes'

const useDeleteData = () => {
  const [status, setStatus] = useState<boolean>()
  const [isLoading, setLoading] = useState(false)

  const foo: IDeleteDataVar = async (collection, dataID) => {
    setStatus(undefined)
    setLoading(true)

    try {
      await deleteDoc(doc(firebaseDB, collection, dataID))
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

export default useDeleteData
