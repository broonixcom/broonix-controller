import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Button, Divider, message, Form, Drawer } from 'antd'
import { IconPlaylistAdd } from '@tabler/icons-react'

import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'
import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import { SUB_FIELD } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import CurrentSub_SubInfo from '../CurrentSub_SubInfo'
import CurrentSub_BasePrice from '../CurrentSub_BasePrice'
import CurrentSub_Qty from '../CurrentSub_Qty'
import CurrentSub_FooterBtns from '../CurrentSub_FooterBtns'

import './CurrentSubStyles.scss'

const CurrentSub: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [messageApi, contextHolder] = message.useMessage()

  const [currentSub, setCurrentSub] = useAtom(currentSubAtom)
  const [subs, setSubs] = useAtom(subsAtom)

  const [isItNew, setItNew] = useState<boolean>()

  useEffect(() => {
    currentSub.isModalOpen && currentSub.sub ? setItNew(false) : setItNew(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSub.isModalOpen])

  if (!id) return

  const isAddBtnDisabled = () => {
    if (!subs[id].qty?.length) {
      return true
    }
    return false
  }

  const handleAddSub = (value: any) => {
    const newSub: any = {
      [SUB_FIELD.subInfo]: {},
      [SUB_FIELD.subMonths]: 0,
      [SUB_FIELD.pricesPerQty]: {},
    }
    const valueKeys = Object.keys(value)

    valueKeys.forEach((key) => {
      if (
        key.includes(SUB_FIELD.subNameTxt) ||
        key.includes(SUB_FIELD.subDescTxt) ||
        key.includes(SUB_FIELD.subTotalTxt)
      ) {
        const splitedKey = key.split('_')
        const subInfoKey = splitedKey[1]
        const subInfoValue = newSub[SUB_FIELD.subInfo][subInfoKey]

        newSub[SUB_FIELD.subInfo] = {
          ...newSub[SUB_FIELD.subInfo],
          [subInfoKey]: {
            ...(subInfoValue || {}),
            [splitedKey[0]]: value[key],
          },
        }
      }

      if (key === SUB_FIELD.pricePerMonth || key === SUB_FIELD.subMonths) {
        newSub[key] = Number(value[key])
      }

      if (!isNaN(Number(key)) && id) {
        newSub[SUB_FIELD.pricesPerQty] = {
          ...newSub[SUB_FIELD.pricesPerQty],
          [key]: Number(value[key]),
        }
      }
    })

    if (isItNew) {
      setSubs({
        ...subs,
        [id]: {
          ...subs[id],
          subs: subs[id].subs ? [...subs[id].subs, newSub] : [newSub],
        },
      })
    } else {
      const updatedSubs = structuredClone(subs[id].subs)
      updatedSubs.splice(currentSub.index ?? 0, 1, newSub)

      setSubs({ ...subs, [id]: { ...subs[id], subs: updatedSubs } })
    }

    setCurrentSub({ isModalOpen: false })
  }

  const generateInitialValue = () => {
    const { sub } = currentSub

    if (sub && sub.subInfo) {
      const initialValue: any = {
        [SUB_FIELD.subMonths]: sub.subMonths,
        [SUB_FIELD.pricePerMonth]: sub.pricePerMonth,
        ...sub.pricesPerQty,
      }

      Object.keys(sub.subInfo).forEach((key) => {
        if (sub && sub.subInfo) {
          initialValue[`${SUB_FIELD.subNameTxt}_${key}`] =
            sub.subInfo[key].subNameTxt
          initialValue[`${SUB_FIELD.subDescTxt}_${key}`] =
            sub.subInfo[key].subDescTxt
          initialValue[`${SUB_FIELD.subTotalTxt}_${key}`] =
            sub.subInfo[key].subTotalTxt
        }
      })

      return initialValue
    }
  }

  const handleError = () => {
    messageApi.error(t('SubsMakerPage.AddNewSubError'))
  }

  return (
    <div className="CurrentSub-body">
      {contextHolder}
      <Divider />
      <p>{t('SubsMakerPage.Subscritions')}</p>
      <Button
        disabled={isAddBtnDisabled()}
        onClick={() => setCurrentSub({ ...currentSub, isModalOpen: true })}
        icon={<IconPlaylistAdd />}
        className="CurrentSub-body-addBtn"
      >
        {t('Button.Add')}
      </Button>
      <Drawer
        destroyOnClose={true}
        className="CurrentSub-body-drawer"
        open={currentSub.isModalOpen}
        title={t(
          currentSub.sub
            ? 'SubsMakerPage.EditSubModalTitle'
            : 'SubsMakerPage.CreateSubModalTitle',
        )}
      >
        <Form
          className="CurrentSub-body-drawer-form"
          onFinish={handleAddSub}
          onFinishFailed={handleError}
          initialValues={generateInitialValue()}
        >
          <div className="CurrentSub-body-drawer-form-inputs">
            <CurrentSub_SubInfo />
            <CurrentSub_BasePrice />
            <CurrentSub_Qty />
          </div>
          <CurrentSub_FooterBtns />
        </Form>
      </Drawer>
    </div>
  )
}

export default CurrentSub
