import useReadData from '../useReadData'
import { API_COLLECTION, DEFAULT_DOC } from '../apiConstants'

const useGetLang = () => {
  const readData = useReadData()
  const langData: string[] = readData.data?.lang
  const getLangIsLoading = readData.isLoading

  const getLang = () => {
    return readData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang)
  }

  return { getLang, getLangIsLoading, langData }
}

export default useGetLang
