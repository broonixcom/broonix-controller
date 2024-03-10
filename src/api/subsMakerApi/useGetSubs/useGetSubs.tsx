import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'

import useReadData from '@api/basicApi/useReadData'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import { API_COLLECTION } from '@api/apiConstants'

import { IGetSubsDataModal } from './useGetSubsModal'

const useGetSubs = () => {
  const { id } = useParams()

  const [subs, setSubs] = useAtom(subsAtom)

  const readData = useReadData()
  const subsData: IGetSubsDataModal = readData.data as IGetSubsDataModal
  const getSubsIsLoading = readData.isLoading

  useEffect(() => {
    subsData &&
      id &&
      setSubs({
        ...subs,
        [id]: subsData,
        original: subsData
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subsData])

  const getSubs = () => {
    id && readData.foo(API_COLLECTION.subscriptions, id)
  }

  return { getSubs, getSubsIsLoading }
}

export default useGetSubs
