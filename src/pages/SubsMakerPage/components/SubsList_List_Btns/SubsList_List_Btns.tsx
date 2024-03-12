import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'
import { useParams } from 'react-router-dom'

import { Button, Tooltip } from 'antd'
import {
  IconArrowBigLeft,
  IconUfo,
  IconEdit,
  IconTrash,
  IconArrowBigRight,
  IconRocket,
} from '@tabler/icons-react'

import subsAtom from '@atoms/subsMakerAtoms/subsAtom'
import currentSubAtom from '@atoms/subsMakerAtoms/currentSubAtom'

import ModalX from '@components/ModalX'

import './SubsList_List_BtnsStyles.scss'
import { ISubsList_List_BtnsProps } from './SubsList_List_BtnsTypes'
import { MOVE_SUB } from './SubsList_List_BtnsConstants'

const SubsList_List_Btns: React.FC<ISubsList_List_BtnsProps> = ({
  index,
  sub,
}) => {
  const { t } = useTranslation()
  const { id } = useParams()

  const [subs, setSubs] = useAtom(subsAtom)
  const [, setCurentSub] = useAtom(currentSubAtom)

  const [isDeleteModalOpened, setDeleteModalOpen] = useState(false)

  if (!id) return

  const handleMove = (direction: string) => {
    const updatedSubs = structuredClone(subs[id].subs)
    const temp = updatedSubs[index]

    if (direction === MOVE_SUB.toTheLeft && index !== 0) {
      updatedSubs[index] = updatedSubs[index - 1]
      updatedSubs[index - 1] = temp
    }
    if (
      direction === MOVE_SUB.toTheRight &&
      index !== subs[id].subs.length - 1
    ) {
      updatedSubs[index] = updatedSubs[index + 1]
      updatedSubs[index + 1] = temp
    }
    setSubs({ ...subs, [id]: { ...subs[id], subs: updatedSubs } })
  }

  const handleSelectBaseSub = () => {
    const updatedSubs = structuredClone(subs[id].subs)
    updatedSubs.forEach((sub, i) =>
      i === index ? (sub.base = true) : (sub.base = false),
    )
    setSubs({ ...subs, [id]: { ...subs[id], subs: updatedSubs } })
  }

  const handleEditSub = () => {
    setCurentSub({
      isModalOpen: true,
      sub: sub,
      index,
    })
  }

  const handleMakeSubFocused = () => {
    const updatedSubs = structuredClone(subs[id].subs)
    updatedSubs.forEach((sub, i) =>
      i === index ? (sub.focus = true) : (sub.focus = false),
    )
    setSubs({ ...subs, [id]: { ...subs[id], subs: updatedSubs } })
  }

  const handleDeleteSub = () => {
    const updatedSubs = structuredClone(subs[id].subs)
    updatedSubs.splice(index, 1)
    setSubs({ ...subs, [id]: { ...subs[id], subs: updatedSubs } })
    setDeleteModalOpen(false)
  }

  return (
    <div className="SubsList_List_Btns-body">
      <Button
        icon={<IconArrowBigLeft />}
        onClick={() => handleMove(MOVE_SUB.toTheLeft)}
        disabled={index === 0}
      />

      <Tooltip placement="bottom" title={t('SubsMakerPage.TooltipMakeSubBase')}>
        <Button
          type={sub.base ? 'primary' : 'default'}
          icon={<IconUfo />}
          name={index.toString()}
          onClick={handleSelectBaseSub}
        />
      </Tooltip>
      <Button icon={<IconEdit />} onClick={handleEditSub} />
      <Tooltip
        placement="bottom"
        title={t('SubsMakerPage.TooltipMakeSubFocused')}
      >
        <Button icon={<IconRocket />} onClick={handleMakeSubFocused} />
      </Tooltip>
      <Button
        icon={<IconTrash />}
        className="SubsList_List_Btns-body-trashBtn"
        onClick={() => setDeleteModalOpen(true)}
      />
      <Button
        icon={<IconArrowBigRight />}
        onClick={() => handleMove(MOVE_SUB.toTheRight)}
        disabled={index === subs[id].subs.length - 1}
      />
      <ModalX
        title={t('SubsMakerPage.DeleteSubQuestion')}
        open={isDeleteModalOpened}
        okText={t('Button.Yes')}
        onOk={handleDeleteSub}
        cancelText={t('Button.No')}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  )
}

export default SubsList_List_Btns
