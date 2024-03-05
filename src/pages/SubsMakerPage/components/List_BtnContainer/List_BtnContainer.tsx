import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Modal, Tooltip } from 'antd'
import {
  IconArrowBigLeft,
  IconUfo,
  IconEdit,
  IconTrash,
  IconArrowBigRight,
  IconFocus2,
} from '@tabler/icons-react'

import { MOVE_SUB } from '../List/ListConstants'

import './List_BtnContainerStyles.scss'
import { IList_BtnContainerProps } from './List_BtnContainerTypes'

const List_BtnContainer: React.FC<IList_BtnContainerProps> = ({
  subsState,
  setSubsState,
  currentSub,
  i,
  setChanged,
  setSubForEdit,
  setCreateModalOpen,
  setCreateModalRender,
}) => {
  const { t } = useTranslation()

  const { subs } = subsState

  const [isModalOpened, setModalOpen] = useState(false)
  const [isModalRendered, setModalRender] = useState(false)

  const handleSelectBaseSub = (index: number) => {
    subs.forEach((sub, i) =>
      i === index ? (sub.base = true) : (sub.base = false),
    )
    setSubsState({ ...subsState, subs })
    setChanged(true)
  }

  const handleMakeSubFocused = (index: number) => {
    subs.forEach((sub, i) =>
      i === index ? (sub.focus = true) : (sub.focus = false),
    )
    setSubsState({ ...subsState, subs })
    setChanged(true)
  }

  const handleMove = (direction: string, index: number) => {
    if (direction === MOVE_SUB.toTheLeft && index !== 0) {
      const temp = subs[index]
      subs[index] = subs[index - 1]
      subs[index - 1] = temp
      setSubsState({ ...subsState, subs })
      setChanged(true)
    }
    if (direction === MOVE_SUB.toTheRight && index !== subs.length - 1) {
      const temp = subs[index]
      subs[index] = subs[index + 1]
      subs[index + 1] = temp
      setSubsState({ ...subsState, subs })
      setChanged(true)
    }
  }

  const handleEditSub = () => {
    setSubForEdit(i)
    setCreateModalRender(true)
    setCreateModalOpen(true)
  }

  const handleOpenDeleteModal = () => {
    setModalRender(true)
    setModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setModalOpen(false)
  }

  const handleDeleteAfterClose = () => {
    setModalRender(false)
  }

  const handleDelete = () => {
    subs.splice(i, 1)
    setSubsState({ ...subsState, subs })
    setChanged(true)
  }

  return (
    <div className="List_BtnContainer-body">
      <Button
        icon={<IconArrowBigLeft stroke="1" />}
        onClick={() => handleMove(MOVE_SUB.toTheLeft, i)}
      />
      <Tooltip placement="bottom" title={t('SubsMakerPage.TooltipMakeSubBase')}>
        <Button
          type={currentSub.base ? 'primary' : 'default'}
          icon={<IconUfo stroke="1" />}
          name={`${i}`}
          onClick={() => handleSelectBaseSub(i)}
        />
      </Tooltip>
      <Tooltip
        placement="bottom"
        title={t('SubsMakerPage.TooltipMakeSubFocused')}
      >
        <Button
          icon={<IconFocus2 stroke="1" />}
          onClick={() => handleMakeSubFocused(i)}
        />
      </Tooltip>
      <Button icon={<IconEdit stroke="1" />} onClick={handleEditSub} />
      <Button
        icon={<IconTrash stroke="1" />}
        className="List_BtnContainer-body-trashBtn"
        onClick={handleOpenDeleteModal}
      />
      <Button
        icon={<IconArrowBigRight stroke="1" />}
        onClick={() => handleMove(MOVE_SUB.toTheRight, i)}
      />
      {isModalRendered && (
        <Modal
          title={t('SubsMakerPage.DeleteModalQuestion')}
          open={isModalOpened}
          okText={t('Button.Yes')}
          onOk={handleDelete}
          cancelText={t('Button.No')}
          onCancel={handleCloseDeleteModal}
          afterClose={handleDeleteAfterClose}
        />
      )}
    </div>
  )
}

export default List_BtnContainer
