import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Menu, MenuProps } from 'antd'
import {
  IconClockStar,
  IconReplace,
  IconMapPin,
  IconBuildingSkyscraper,
  IconMovie,
} from '@tabler/icons-react'

import { PATH } from '@components/Router/RouterConstants'

import { SUB_TYPE, INITIAL_STATE } from '../../SubsMakerPageConstants'

import './NavigationStyles.scss'
import { INavigationProps } from './NavigationTypes'

const Navigation: React.FC<INavigationProps> = ({
  isChanged,
  setSubsState,
  setChanged,
  setCurrentQtyState,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()

  const handleClickToMenu: MenuProps['onClick'] = (e) => {
    navigate(PATH.subsMaker + '/' + e.key)

    if (!isChanged) {
      setChanged(false)
      setCurrentQtyState(null)
      setSubsState(INITIAL_STATE)
    }
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
