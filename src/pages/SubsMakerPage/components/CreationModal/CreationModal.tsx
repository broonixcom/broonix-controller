/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Modal, Divider, message } from 'antd'
import { IconPlaylistAdd } from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import { ISub } from '../../SubsMakerPageTypes'
import CreationModal_SubInfo from '../CreationModal_SubInfo'
import CreationModal_BasePrice from '../CreationModal_BasePrice'
import CreationModal_Qty from '../CreationModal_Qty'

import './CreationModalStyles.scss'
import { ICreationModalProps } from './CreationModalTypes'

const CreationModal: React.FC<ICreationModalProps> = ({
  nav,
  subsState,
  setSubsState,
  setChanged,
}) => {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()

  const { supportedLang, qty, subs } = subsState

  const [isModalOpened, setModalOpen] = useState(false)
  const [isModalRendered, setModalRender] = useState(false)
  const [localSub, setLocalSub] = useState<ISub>({} as ISub)
  const [localIsChanged, setLocalChanged] = useState(false)

  useEffect(() => {

    const defaultPricePerEmp = qty.reduce((obj: any, emp: number) => {
      obj[emp] = undefined
      return obj
    }, {})

    const defaultSubInfo = supportedLang.reduce((obj: any, lang: string) => {
      obj[lang] = {
        subName: '',
        subDesc: '',
      }
      return obj
    }, {})
    
    setLocalSub({
      ...localSub,
      pricesPerQty: defaultPricePerEmp,
      subInfo: defaultSubInfo,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpened, qty, supportedLang])

  const isAddBtnDisabled = () => {
    if (!supportedLang.length) {
      return true
    }
    if (nav === PATH.subsMakerPlace) {
      return false
    }
    if (!qty.length) {
      return true
    }
    return false
  }

  const handleOpenModal = () => {
    setModalOpen(true)
    setModalRender(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleAfterCloseModal = () => {
    setModalRender(false)
    setLocalSub({} as ISub)
  }

  const handelAddSub = () => {
    const langCheck = Object.values(localSub.subInfo).some(
      ({ subDesc, subName }) => !subDesc || !subName,
    )
    const pricesCheck =
      nav !== PATH.subsMakerPlace &&
      Object.values(localSub.pricesPerQty).some((val) => !val)

    if (langCheck || !localSub.subMonths || !localSub.subNoDiscount) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }
    if (pricesCheck && nav !== PATH.subsMakerPlace) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    } else {
      setSubsState({ ...subsState, subs: [...subs, localSub] })
      setChanged(true)
      setModalOpen(false)
      setLocalChanged(false)
    }
  }

  return (
    <div className="CreationModal-body">
      {contextHolder}
      <Divider />
      <p>{t('SubsMakerPage.Subscritions')}</p>
      <Button
        disabled={isAddBtnDisabled()}
        onClick={handleOpenModal}
        icon={<IconPlaylistAdd />}
        className="CreationModal-body-addBtn"
      >
        {t('Button.Add')}
      </Button>
      {isModalRendered && (
        <Modal
          open={isModalOpened}
          title={t('SubsMakerPage.ModalTitle')}
          onOk={handelAddSub}
          okText={t('Button.Add')}
          okButtonProps={{
            disabled: !localIsChanged,
          }}
          onCancel={handleCloseModal}
          afterClose={handleAfterCloseModal}
          cancelText={t('Button.Cancel')}
        >
          <div className="CreationModal-body-modal">
            <CreationModal_SubInfo
              {...{ supportedLang, localSub, setLocalSub, setLocalChanged }}
            />
            <CreationModal_BasePrice
              {...{ localSub, setLocalSub, setLocalChanged }}
            />
            <CreationModal_Qty
              {...{ nav, qty, localSub, setLocalSub, setLocalChanged }}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CreationModal
