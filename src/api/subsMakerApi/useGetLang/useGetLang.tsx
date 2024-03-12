import { useEffect } from 'react'
import { useAtom } from 'jotai'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import useReadData from '../../basicApi/useReadData'
import { API_COLLECTION, DEFAULT_DOC } from '../../apiConstants'

const useGetLang = () => {
  const [, setLangSupport] = useAtom(langSupportAtom)

  const readData = useReadData()

  const langData: string[] = readData.data?.lang

  useEffect(() => {
    langData && setLangSupport(langData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langData])

  const getLangIsLoading = readData.isLoading

  const getLang = async () => {
    readData.foo(API_COLLECTION.settings, DEFAULT_DOC.lang)
  }

  return { getLang, getLangIsLoading }
}

export default useGetLang
