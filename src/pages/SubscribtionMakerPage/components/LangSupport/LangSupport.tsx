import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Popover } from 'antd'
import { IconTrash } from '@tabler/icons-react'

import './LangSupportStyles.scss'
import { ILangSupportProps } from './LangSupportTypes'

const LangSupport: React.FC<ILangSupportProps> = ({
  supportedLang,
  setSupportedLang,
}) => {
  const { t } = useTranslation()

  return (
    <div className="LangSupport-body">
      <p>{t('SubscribtionMakerPage.LangSupport')}</p>

      <Button type="primary">{t('Button.Add')}</Button>
      <div className="LangSupport-body-langList">
        {supportedLang?.map((lang, i) => (
          <Popover
            key={'LANG' + i}
            placement="bottom"
            content={
              <Button
                type="text"
                icon={<IconTrash />}
                className="LangSupport-body-langList-deleteBtn"
              />
            }
          >
            <Button className="LangSupport-body-langList-btn">{lang}</Button>{' '}
          </Popover>
        ))}
      </div>
    </div>
  )
}

export default LangSupport
