import useUpdateData from '../useUpdateData'
import { API_COLLECTION, DEFAULT_DOC } from '../apiConstants'

const useUpdateLang = () => {
  const updateData = useUpdateData()
  const updateLangStatus = updateData.status
  const updateLangIsLoading = updateData.isLoading

  const updateLang = (newLang: string[]) => {
    updateData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang, {
      lang: newLang,
    })
  }

  return { updateLang, updateLangStatus, updateLangIsLoading }
}

export default useUpdateLang
