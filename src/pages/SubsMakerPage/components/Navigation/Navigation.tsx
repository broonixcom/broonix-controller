import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useAtom } from 'jotai'

import { Menu, MenuProps } from 'antd'
import {
  IconClockStar,
  IconReplace,
  IconMapPin,
  IconBuildingSkyscraper,
  IconMovie,
} from '@tabler/icons-react'

import alarmAtom from '@atoms/subsMakerAtoms/alarmAtom'
import { SUB_TYPE } from '@atoms/subsMakerAtoms/subsAtom/subsAtomConstants'

import { PATH } from '@components/Router/RouterConstants'

import './NavigationStyles.scss'

const Navigation: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()

  const [, setAlarm] = useAtom(alarmAtom)

  const handleClickToMenu: MenuProps['onClick'] = (e) => {
    setAlarm(false)
    navigate(PATH.subsMaker + '/' + e.key)
  }

  const navItems = [
    {
      label: t('SubsMakerPage.ServiceNav'),
      key: SUB_TYPE.service,
      icon: <IconClockStar />,
    },
    {
      label: t('SubsMakerPage.RentalNav'),
      key: SUB_TYPE.rental,
      icon: <IconReplace />,
    },
    {
      label: t('SubsMakerPage.PlaceNav'),
      key: SUB_TYPE.place,
      icon: <IconMapPin />,
    },
    {
      label: t('SubsMakerPage.HotelNav'),
      key: SUB_TYPE.hotel,
      icon: <IconBuildingSkyscraper />,
    },
    {
      label: t('SubsMakerPage.CinemaNav'),
      key: SUB_TYPE.cinema,
      icon: <IconMovie />,
    },
  ]

  return (
    <div className="Navigation-body">
      <Menu
        mode="horizontal"
        items={navItems}
        selectedKeys={[params.id ?? SUB_TYPE.service]}
        onClick={handleClickToMenu}
      />
    </div>
  )
}

export default Navigation
