import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'

import { Divider } from 'antd'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import useGetLang from '@api/subsMakerApi/useGetLang'

import LangSupport_AddLang from '../LangSupport_AddLang'
import LangSupport_List from '../LangSupport_List'

import './LangSupportStyles.scss'

const LangSupport: React.FC = () => {
  const { t } = useTranslation()

  const [langSupport] = useAtom(langSupportAtom)

  const { getLang } = useGetLang()

  useEffect(() => {
    !langSupport?.length && getLang()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="LangSupport-body">
      <p>{t('SubsMakerPage.LangSupportSubTitle')}</p>
      <LangSupport_AddLang />
      <LangSupport_List />
      <Divider className="LangSupport-body-divider" />
    </div>
  )
}

export default LangSupport
