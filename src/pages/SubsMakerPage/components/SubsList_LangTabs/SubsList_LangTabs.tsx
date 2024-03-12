import React from 'react'
import { useAtom } from 'jotai'

import { Tabs } from 'antd'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'

import './SubsList_LangTabsStyles.scss'
import { ISubsList_LangTabsProps } from './SubsList_LangTabsTypes'

const SubsList_LangTabs: React.FC<ISubsList_LangTabsProps> = ({
  selectedLang,
  setSelectedLang,
}) => {
  const [langSupport] = useAtom(langSupportAtom)

  const handleSelect = (key: string) => {
    setSelectedLang(key)
  }

  return (
    <div className="SubsList_LangTabs-body">
      <Tabs
        onChange={handleSelect}
        items={langSupport?.map((lang) => ({ key: lang, label: lang }))}
        activeKey={selectedLang}
      />
    </div>
  )
}

export default SubsList_LangTabs
