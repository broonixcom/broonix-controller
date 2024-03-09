import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { Form, Button } from 'antd'

import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'

import './CurrentSub_FooterBtnsStyles.scss'

const CurrentSub_FooterBtns: React.FC = () => {
  const { t } = useTranslation()

  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)

  return (
    <div className="CurrentSub_FooterBtns-body">
      <Form.Item>
        <Button
          className="CurrentSub_FooterBtns-body-cancelBtn"
          onClick={() => setCurrentSub({ isModalOpen: false })}
        >
          {t('Button.Cancel')}
        </Button>
        <Button htmlType="submit" type="primary">
          {t(currentSub.sub ? 'Button.Save' : 'Button.Add')}
        </Button>
      </Form.Item>
    </div>
  )
}

export default CurrentSub_FooterBtns
