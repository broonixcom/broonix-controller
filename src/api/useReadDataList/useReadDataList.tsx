import { useState } from 'react'
import {
  collection,
  query,
  startAfter,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
  orderBy,
  where,
} from 'firebase/firestore'

import { firebaseDB } from '@src/firebase'

import { IReadDataListVar } from './useReadDataListTypes'

const useReadDataList = () => {
  const [status, setStatus] = useState<boolean>()
  const [isLoading, setLoading] = useState(false)
  const [dataList, setDataList] = useState<DocumentData[]>()
  const [lastVisiableData, setLastVisiableData] =
    useState<QueryDocumentSnapshot<unknown, DocumentData>>()

  const foo: IReadDataListVar = async ({
    dataColl,
    sort = 'desc',
    pageLimit,
    search,
    lazyLoad,
  }) => {
    setStatus(undefined)
    setLoading(true)

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let preparedQuery: any[] = []

      if (search) {
        preparedQuery = [
          ...preparedQuery,
          where(search.field, '==', search.value),
        ]
      }
      if (lazyLoad) {
        preparedQuery = [...preparedQuery, startAfter(lastVisiableData)]
      }

      const documentSnapshots = await getDocs(
        query(
          collection(firebaseDB, dataColl),
          orderBy('createdAt', sort),
          limit(pageLimit),
          ...preparedQuery,
        ),
      )

      setLastVisiableData(
        documentSnapshots.docs[documentSnapshots.docs.length - 1],
      )

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any[] = []

      documentSnapshots.forEach((doc) => {
        data.push(doc.data())
      })

      setDataList(data)
      setStatus(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus(false)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { dataList, foo, status, isLoading }
}

export default useReadDataList
