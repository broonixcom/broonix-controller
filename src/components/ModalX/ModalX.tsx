import React, { useState, useEffect } from 'react'

import { Modal, ModalProps } from 'antd'

const ModalX: React.FC<ModalProps> = (props) => {
  const { open, afterClose } = props

  const [isModalRendered, setModalRendered] = useState(false)

  useEffect(() => {
    if (open) setModalRendered(true)
  }, [open])

  const handleAfterClose = () => {
    afterClose && afterClose()
    setModalRendered(false)
  }

  if (!isModalRendered) return

  return (
    <Modal {...props} afterClose={handleAfterClose}>
      {props.children}
    </Modal>
  )
}

export default ModalX
