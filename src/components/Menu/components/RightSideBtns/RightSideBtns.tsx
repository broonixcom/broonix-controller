import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Dropdown, MenuProps, Space } from 'antd'
import { IconUserCircle } from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import './RightSideBtnsStyles.scss'

const RightSideBtns: React.FC = () => {
  const navigate = useNavigate()

  const [currentLang, setCurrentLang] = useState('RU')

  const langItems: MenuProps['items'] = [
    {
      label: 'RU',
      key: 'RU',
    },
    {
      label: 'EN',
      key: 'EN',
    },
  ]

  const handleClickProfile = () => {
    navigate(PATH.profile)
  }

  const handleClickLang: MenuProps['onClick'] = (e) => {
    setCurrentLang(e.key)
  }

  const langMenuProps = {
    items: langItems,
    onClick: handleClickLang,
  }

  return (
    <div className="RightSideBtns-body">
      <Button
        className="RightSideBtns-body-btn"
        icon={<IconUserCircle />}
        onClick={handleClickProfile}
        type="text"
      />
      <Dropdown menu={langMenuProps}>
        <Button className="RightSideBtns-body-btn" type="text">
          <Space>{currentLang}</Space>
        </Button>
      </Dropdown>
    </div>
  )
}

export default RightSideBtns
