/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { Button, Modal, Divider, message } from 'antd'
import { IconPlaylistAdd } from '@tabler/icons-react'

import { SUB_TYPE } from '../..//SubsMakerPageConstants'
import { ISub } from '../../SubsMakerPageTypes'
import CreationModal_SubInfo from '../CreationModal_SubInfo'
import CreationModal_BasePrice from '../CreationModal_BasePrice'
import CreationModal_Qty from '../CreationModal_Qty'

import './CreationModalStyles.scss'
import { ICreationModalProps } from './CreationModalTypes'

const CreationModal: React.FC<ICreationModalProps> = ({
  subsState,
  setSubsState,
  setChanged,
  subForEdit,
  setSubForEdit,
  isCreateModalOpened,
  setCreateModalOpen,
  isCreateModalRendered,
  setCreateModalRender,
}) => {
  const { t } = useTranslation()
  const params = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const { supportedLang, qty, subs } = subsState

  const [localSub, setLocalSub] = useState<ISub>({} as ISub)
  const [localIsChanged, setLocalChanged] = useState(false)

  useEffect(() => {
    if (subForEdit || subForEdit === 0) {
      setLocalSub(subs[subForEdit])
    } else {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateModalOpened, qty, supportedLang])

  const isAddBtnDisabled = () => {
    if (!supportedLang.length) {
      return true
    }
    if (params.id === SUB_TYPE.place) {
      return false
    }
    if (!qty.length) {
      return true
    }
    return false
  }

  const handleOpenModal = () => {
    setCreateModalRender(true)
    setCreateModalOpen(true)
  }

  const handleCloseModal = () => {
    setCreateModalOpen(false)
    setSubForEdit(undefined)
  }

  const handleAfterCloseModal = () => {
    setCreateModalRender(false)
    setLocalSub({} as ISub)
  }

  const handelAddSub = () => {
    const langCheck = Object.values(localSub.subInfo).some(
      ({ subDesc, subName }) => !subDesc || !subName,
    )
    const pricesCheck =
      params.id !== SUB_TYPE.place &&
      localSub.pricesPerQty &&
      Object.values(localSub.pricesPerQty).some((val) => !val)

    if (langCheck || !localSub.subMonths) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }
    if (pricesCheck && params.id !== SUB_TYPE.place) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }
    if (subForEdit || subForEdit === 0) {
      subs.splice(subForEdit, 1, localSub)
      setSubsState({ ...subsState, subs })
      setChanged(true)
      setCreateModalOpen(false)
      setLocalChanged(false)
    } else {
      setSubsState({ ...subsState, subs: [...subs, localSub] })
      setChanged(true)
      setCreateModalOpen(false)
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
      {isCreateModalRendered && (
        <Modal
          open={isCreateModalOpened}
          title={t(
            subForEdit || subForEdit === 0
              ? 'SubsMakerPage.EditSubModalTitle'
              : 'SubsMakerPage.CreateSubModalTitle',
          )}
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
              {...{ qty, localSub, setLocalSub, setLocalChanged }}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CreationModal
