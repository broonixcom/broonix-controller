import { useState } from 'react'
import { doc, getDoc, DocumentData } from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { IReadDataVar } from './useReadDataTypes'

const useReadData = () => {
  const [status, setStatus] = useState<boolean>()
  const [data, setData] = useState<DocumentData>()
  const [isLoading, setLoading] = useState(false)

  const foo: IReadDataVar = async (collection, dataID) => {
    setData(undefined)
    setStatus(undefined)
    setLoading(true)

    try {
      const dataSnap = await getDoc(doc(firebaseDB, collection, dataID))
      dataSnap.exists() && setData(dataSnap.data())
    } catch (error: any) {
      setStatus(false)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, foo, status, isLoading }
}

export default useReadData
