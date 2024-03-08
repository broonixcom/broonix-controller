import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Button, Divider, message } from 'antd'
import { IconPlaylistAdd } from '@tabler/icons-react'

import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import langSupportAtom from '@atoms/subsMakerAtoms/langSupportAtom'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import ModalX from '@components/ModalX'

import CurrentSubModal_SubInfo from '../CurrentSubModal_SubInfo'
import CurrentSubModal_BasePrice from '../CurrentSubModal_BasePrice'
import CurrentSubModal_Qty from '../CurrentSubModal_Qty'

import './CurrentSubModalStyles.scss'

const CurrentSubModal: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)
  const [subs, setSubs] = useAtom(subsAtom)
  const [langsSupport] = useAtom(langSupportAtom)

  if (!id) return

  const isAddBtnDisabled = () => {
    if (id === SUB_TYPE.place) {
      return false
    }
    if (!subs[id].qty?.length) {
      return true
    }
    return false
  }

  const handelAddSub = () => {
    const { sub } = currentSub

    if (!sub || !sub.subInfo || !sub.subMonths || !sub.pricesPerQty) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }
    if (id === SUB_TYPE.place && !sub?.pricePerMonth) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }

    const checksubInfo = Object.values(sub.subInfo).some(
      (val) => !val.subDescTxt || !val.subNameTxt || !val.subTotalTxt,
    )

    const checksubInfoFields =
      Object.values(sub.subInfo).length !== langsSupport.length

    if (checksubInfo || checksubInfoFields) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }

    const checkSubPrice =
      sub.pricesPerQty && Object.values(sub.pricesPerQty).some((val) => !val)

    const checkSubPriceFields =
      Object.values(sub.pricesPerQty).length !== subs[id].qty?.length

    if (id !== SUB_TYPE.place && (checkSubPrice || checkSubPriceFields)) {
      return messageApi.error(t('SubsMakerPage.AddNewSubError'))
    }

    setSubs({
      ...subs,
      [id]: {
        ...subs[id],
        subs: [...subs[id].subs, sub],
      },
    })
    setCurrentSub({ ...currentSub, isModalOpen: false })
  }

  return (
    <div className="CurrentSubModal-body">
      {contextHolder}
      <Divider />
      <p>{t('SubsMakerPage.Subscritions')}</p>
      <Button
        disabled={isAddBtnDisabled()}
        onClick={() => setCurrentSub({ ...currentSub, isModalOpen: true })}
        icon={<IconPlaylistAdd />}
        className="CurrentSubModal-body-addBtn"
      >
        {t('Button.Add')}
      </Button>

      <ModalX
        open={currentSub.isModalOpen}
        title={t(
          currentSub.sub
            ? 'SubsMakerPage.EditSubModalTitle'
            : 'SubsMakerPage.CreateSubModalTitle',
        )}
        onOk={handelAddSub}
        okText={t('Button.Add')}
        onCancel={() => setCurrentSub({ ...currentSub, isModalOpen: false })}
        cancelText={t('Button.Cancel')}
      >
        <div className="CurrentSubModal-body-modal">
          <CurrentSubModal_SubInfo />
          <CurrentSubModal_BasePrice />
          <CurrentSubModal_Qty />
        </div>
      </ModalX>
    </div>
  )
}

export default CurrentSubModal
