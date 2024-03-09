import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { Divider, Input, Form } from 'antd'

import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import { SUB_FIELD } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import './CurrentSub_SubInfoStyles.scss'

const CurrentSub_SubInfo: React.FC = () => {
  const { t } = useTranslation()

  const [langSupport] = useAtom(langSupportAtom)

  return langSupport?.map((lang, index) => (
    <div key={lang + index} className="CurrentSub_SubInfo-body">
      <span>{lang}</span>
      <p>{t('SubsMakerPage.SubcriptionName')}</p>
      <Form.Item
        noStyle
        name={SUB_FIELD.subNameTxt + '_' + lang}
        rules={[{ required: true, message: t('SubsMakerPage.AddNewSubError') }]}
      >
        <Input />
      </Form.Item>
      <p>{t('SubsMakerPage.SubcriptionDescription')}</p>
      <Form.Item
        noStyle
        name={SUB_FIELD.subDescTxt + '_' + lang}
        rules={[{ required: true, message: t('SubsMakerPage.AddNewSubError') }]}
      >
        <Input />
      </Form.Item>
      <p>{t('SubsMakerPage.TotalPriceText')}</p>
      <Form.Item
        noStyle
        name={SUB_FIELD.subTotalTxt + '_' + lang}
        rules={[{ required: true, message: t('SubsMakerPage.AddNewSubError') }]}
      >
        <Input />
      </Form.Item>
      <Divider />
    </div>
  ))
}

export default CurrentSub_SubInfo
