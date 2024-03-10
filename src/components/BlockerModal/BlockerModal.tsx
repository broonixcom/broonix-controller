import React, { useEffect, useState } from 'react'
import { useBlocker } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ModalX from '@components/ModalX'

import { IBlockerModalProps } from './BlockerModalTypes'

const BlockerModal: React.FC<IBlockerModalProps> = ({ verify, okFoo }) => {
  const { t } = useTranslation()

  const [isModalOpened, setModalOpened] = useState(false)

  const blocker = useBlocker(
    (path) => path.currentLocation !== path.nextLocation && !verify,
  )

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setModalOpened(true)
    }
  }, [blocker.state])

  if (!blocker.proceed || !blocker.reset) return

  const handleOk = () => {
    blocker.proceed()
    setModalOpened(false)
    okFoo && okFoo()
  }

  const handleCancel = () => {
    blocker.reset()
    setModalOpened(false)
  }

  return (
    <ModalX
      open={isModalOpened}
      title={t('SubsMakerPage.BlockerTitle')}
      okText={t('Button.Yes')}
      onOk={handleOk}
      cancelText={t('Button.No')}
      onCancel={handleCancel}
    />
  )
}

export default BlockerModal
