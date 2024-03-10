import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import useUpdateData from '@api/basicApi/useUpdateData'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import { API_COLLECTION, RES_CODE } from '@api/apiConstants'
import { ISub } from '@atoms/subsMakerAtoms/subsAtom/subsAtomTypes'

const useUpdateLang = () => {
  const { id } = useParams()

  const [subs, setSubs] = useAtom(subsAtom)

  const updateData = useUpdateData()

  useEffect(() => {
    id && updateData.status === RES_CODE.ok && setSubs({ ...subs, original: subs[id] })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData.status])

  const updateSubsIsLoading = updateData.isLoading
  const updateSubsStatus = updateData.status

  const updateSubs = (subs: { qty?: number[]; subs: ISub[] }) => {
    id && updateData.foo(API_COLLECTION.subscriptions, id, subs)
  }

  return { updateSubs, updateSubsIsLoading, updateSubsStatus }
}

export default useUpdateLang
