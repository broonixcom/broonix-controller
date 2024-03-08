import { useAtom } from 'jotai'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import useUpdateData from '../../basicApi/useUpdateData'
import { API_COLLECTION, DEFAULT_DOC } from '../../apiConstants'

const useUpdateLang = () => {
  const [, setLangSupport] = useAtom(langSupportAtom)

  const updateData = useUpdateData()
  const updateLangIsLoading = updateData.isLoading
  const updateLangStatus = updateData.status

  const updateLang = (newLang: string[]) => {
    updateData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang, {
      lang: newLang,
    })

    setLangSupport(newLang)
  }

  return { updateLang, updateLangIsLoading, updateLangStatus }
}

export default useUpdateLang
