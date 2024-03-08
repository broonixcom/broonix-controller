import React, { useEffect } from 'react'
import { useAtom } from 'jotai'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import useGetLang from '@api/subsMakerApi/useGetLang'

import LangSupport_AddLang from '../LangSupport_AddLang'
import LangSupport_List from '../LangSupport_List'

import './LangSupportStyles.scss'

const LangSupport: React.FC = () => {
  const [langSupport] = useAtom(langSupportAtom)

  const { getLang } = useGetLang()

  useEffect(() => {
    !langSupport.length && getLang()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="LangSupport-body">
      <LangSupport_AddLang />
      <LangSupport_List />
    </div>
  )
}

export default LangSupport
