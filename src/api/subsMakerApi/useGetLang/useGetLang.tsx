import { useEffect } from 'react'
import { useAtom } from 'jotai'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import useReadData from '../../basicApi/useReadData'
import { API_COLLECTION, DEFAULT_DOC } from '../../apiConstants'

const useGetLang = () => {
  const [, setLangSupport] = useAtom(langSupportAtom)

  const readData = useReadData()

  useEffect(() => {
    if (readData.data?.lang) {
      setLangSupport(readData.data.lang)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readData.data])

  const getLang = async () => {
    readData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang)
  }

  const getLangIsLoading = readData.isLoading

  return { getLang, getLangIsLoading }
}

export default useGetLang
