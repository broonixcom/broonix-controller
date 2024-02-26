import React, { useEffect, useState } from 'react'
import { useBlocker } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Modal } from 'antd'

import { IBlockerModalProps } from './BlockerModalTypes'

const BlockerModal: React.FC<IBlockerModalProps> = ({ verify, foo }) => {
  const { t } = useTranslation()

  const [isModalOpened, setModalOpened] = useState(false)
  const [isModalRendered, setModalRendered] = useState(false)

  const blocker = useBlocker(
    (path) => path.currentLocation !== path.nextLocation && verify,
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setModalRendered(true)
      setModalOpened(true)
    }
  }, [blocker.state])

  if (!isModalRendered) {
    return
  }

  const handleOk = () => {
    blocker.proceed && blocker.proceed()
    setModalOpened(false)
    foo && foo()
  }

  const handleCancel = () => {
    blocker.reset && blocker.reset()
    setModalOpened(false)
  }

  const handleAfterClose = () => {
    setModalRendered(false)
  }

  return (
    <Modal
      open={isModalOpened}
      title={t('SubsMakerPage.BlockerTitle')}
      okText={t('Button.Yes')}
      onOk={handleOk}
      cancelText={t('Button.No')}
      onCancel={handleCancel}
      afterClose={handleAfterClose}
    />
  )
}

export default BlockerModal
