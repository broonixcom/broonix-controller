import React from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs, Input } from 'antd'

import './CreationModal_SubInfoStyles.scss'
import { ICreationModal_SubInfoProps } from './CreationModal_SubInfoTypes'

const CreationModal_SubInfo: React.FC<ICreationModal_SubInfoProps> = ({
  supportedLang,
  localSub,
  setLocalSub,
  setLocalChanged,
}) => {
  const { t } = useTranslation()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubInfo = (e: any) => {
    setLocalChanged(true)

    const lang = e.target.getAttribute('lang')
    const field: 'subName' | 'subDesc' | 'subTotal' =
      e.target.getAttribute('name')
    const value = e.target.value

    setLocalSub({
      ...localSub,
      subInfo: {
        ...localSub.subInfo,
        [lang]: {
          ...localSub.subInfo?.[lang],
          [field]: value,
        },
      },
    })
  }

  return (
    <Tabs
      className="CreationModal_SubInfo-body"
      items={supportedLang.map((lang, i) => ({
        key: lang + i,
        label: lang,
        children: (
          <div key={lang + i}>
            <p>
              {t('SubsMakerPage.SubcriptionName')} {lang}
            </p>
            <Input
              className="CreationModal_SubInfo-body-marginBottom"
              name="subName"
              lang={lang}
              onChange={handleSubInfo}
              value={localSub.subInfo?.[lang]?.subName}
            />
            <p>
              {t('SubsMakerPage.SubcriptionDescription')} {lang}
            </p>
            <Input
              className="CreationModal_SubInfo-body-marginBottom"
              name="subDesc"
              lang={lang}
              onChange={handleSubInfo}
              value={localSub.subInfo?.[lang]?.subDesc}
            />
            <p>
              {t('SubsMakerPage.TotalPriceText')} {lang}
            </p>
            <Input
              className="CreationModal_SubInfo-body-marginBottom"
              name="subTotal"
              lang={lang}
              onChange={handleSubInfo}
              value={localSub.subInfo?.[lang]?.subTotal}
            />
          </div>
        ),
      }))}
    />
  )
}

export default CreationModal_SubInfo
