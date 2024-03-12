import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import useUpdateData from '../../basicApi/useUpdateData'
import { API_COLLECTION, DEFAULT_DOC, RES_CODE } from '../../apiConstants'

const useUpdateLang = () => {
  const [, setLangSupport] = useAtom(langSupportAtom)

  const [internalLang, setInternalLang] = useState<string[]>()

  const updateData = useUpdateData()
  const updateLangIsLoading = updateData.isLoading
  const updateLangStatus = updateData.status

  useEffect(() => {
    if (updateLangStatus === RES_CODE.ok && internalLang) setLangSupport(internalLang)
    if (updateLangStatus === RES_CODE.error) setInternalLang(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateLangStatus])


  const updateLang = async (newLang: string[]) => {
    await updateData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang, {
      lang: newLang,
    })
    setInternalLang(newLang)
  }

  return { updateLang, updateLangIsLoading, updateLangStatus }
}

export default useUpdateLang
