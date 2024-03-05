import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAtom } from 'jotai'

import { Button, Popover, Input } from 'antd'
import { IconTrash, IconPlaylistAdd } from '@tabler/icons-react'

import ModalX from '@components/ModalX'
import langSupportAtom from '@atoms/langSupportAtom'

import { ILangSupportUIProps } from './LangSupportTypes'

const LangSupportUI: React.FC<ILangSupportUIProps> = ({
  contextHolder,
  isAddNewLangOpen,
  newLangInput,
  isDeleteLangOpen,
  getLangIsLoading,
  updateLangIsLoading,
  handleOpenAddLang,
  handleChangeInputLang,
  handleCloseAddLang,
  handleAddLang,
  handleOpenDeleteLang,
  handleClosDeleteLang,
  handleDeleteLang,
}) => {
  const { t } = useTranslation()

  const [lang] = useAtom(langSupportAtom)

  return (
    <div className="LangSupport-body">
      {contextHolder}
      <p>{t('SettingsPage.LangSupportSubTitle')}</p>
      <Button
        className="LangSupport-body-addBtn"
        onClick={handleOpenAddLang}
        icon={<IconPlaylistAdd />}
        loading={getLangIsLoading}
        disabled={getLangIsLoading}
      >
        {t('Button.Add')}
      </Button>
      <div className="LangSupport-body-langList">
        {lang.map((langItem, i) => (
          <Popover
            key={'LANG' + i}
            placement="bottom"
            open={lang.length <= 1 ? false : undefined}
            content={
              <Button
                type="text"
                icon={<IconTrash />}
                className="LangSupport-body-langList-deleteBtn"
                onClick={() => handleOpenDeleteLang(langItem)}
                name={langItem}
              />
            }
          >
            <Button
              className="LangSupport-body-langList-btn"
              disabled={lang.length === 1}
            >
              {langItem}
            </Button>
          </Popover>
        ))}
      </div>
      <ModalX
        title={t('SettingsPage.AddLang')}
        open={isAddNewLangOpen}
        onOk={handleAddLang}
        okButtonProps={{
          disabled: !newLangInput,
          loading: updateLangIsLoading,
        }}
        okText={t('Button.Add')}
        onCancel={handleCloseAddLang}
        cancelText={t('Button.Cancel')}
      >
        <Input
          onChange={handleChangeInputLang}
          value={newLangInput}
          className="LangSupport-body-modalInput"
          placeholder={t('SettingsPage.AddLangPlaceholder')}
        />
      </ModalX>
      <ModalX
        className="LangSupport-body-deleteModal"
        title={t('SettingsPage.DeleteLangModalTitle')}
        open={isDeleteLangOpen}
        onOk={handleDeleteLang}
        okButtonProps={{ loading: updateLangIsLoading }}
        okText={t('Button.Yes')}
        onCancel={handleClosDeleteLang}
        cancelText={t('Button.No')}
      />
    </div>
  )
}

export default LangSupportUI
