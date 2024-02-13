import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Modal, Input, Divider } from 'antd'

import { ISubcribtionCreationModalProps } from './SubcribtionCreationModalTypes'

import './SubcribtionCreationModalStyles.scss'

const SubcribtionCreationModal: React.FC<ISubcribtionCreationModalProps> = ({
  empCounterState,
  subs,
  setSubs,
}) => {
  const { t } = useTranslation()

  const [isModalOpen, setModalOpen] = useState(false)
  const [isModalRendered, setModalRender] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
    setModalRender(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleAfterCloseModal = () => {
    setModalRender(false)
  }

  const handleInputBase = (e) => {
    subs &&
      setSubs({ ...subs, [e.target.getAttribute('name')]: e.target.value })
  }

  const handleInputPrices = () => {}

  return (
    <div className="SubcribtionCreationModal-body">
      <p> {t('SubscribtionMakerPage.AddNewSubscrition')}</p>
      <Button
        type="primary"
        disabled={!empCounterState?.length}
        onClick={handleOpenModal}
      >
        {t('Button.Add')}
      </Button>
      {isModalRendered && (
        <Modal
          open={isModalOpen}
          onCancel={handleCloseModal}
          afterClose={handleAfterCloseModal}
          title={t('SubscribtionMakerPage.ModalTitle')}
        >
          <div className="SubcribtionCreationModal-body-modal">
            <Input
              className="SubcribtionCreationModal-body-modal-marginBottom"
              placeholder={t('SubscribtionMakerPage.SubcriptionName')}
              name="subName"
              onChange={handleInputBase}
            />
            <Input
              className="SubcribtionCreationModal-body-modal-marginBottom"
              placeholder={t('SubscribtionMakerPage.SubcriptionDescription')}
              name="subDesc"
              onChange={handleInputBase}
            />
            <Input
              className="SubcribtionCreationModal-body-modal-marginBottom"
              placeholder={t('SubscribtionMakerPage.SubcriptionMonths')}
              type="number"
              name="subMonths"
              onChange={handleInputBase}
            />
            <Input
              className="SubcribtionCreationModal-body-modal-marginBottom"
              placeholder={t('SubscribtionMakerPage.PriceNoDiscount')}
              type="number"
              name="subNoDiscount"
              onChange={handleInputBase}
            />
            <Divider />
            <p className="SubcribtionCreationModal-body-modal-marginBottom">
              {t('SubscribtionMakerPage.PricePerEmployee')}
            </p>
            {empCounterState?.map((number) => (
              <Input
                key={'PRICE_PER_EMP' + number}
                className="SubcribtionCreationModal-body-modal-marginBottom"
                type="number"
                addonBefore={number}
                required
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}

export default SubcribtionCreationModal
