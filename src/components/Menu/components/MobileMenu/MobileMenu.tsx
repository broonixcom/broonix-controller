import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Select } from 'antd';

import { PATH } from '@components/Router/RouterConstants';

import { IMenuProps } from '../../MenuTypes';
import Logo from '../Logo';
import RightSideBtns from '../RightSideBtns';

import './MobileMenuStyles.scss';

const MobileMenu: React.FC<IMenuProps> = ({ menuItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const [currentPath, setCurrentPath] = useState(location.pathname)

    const options = menuItems.map((item) => ({ value: item.key, label: item.label }))

    const handleChange = (value: string) => {
        setCurrentPath(value)
        navigate(value)
    }

    return <div className='MobileMenu-body'>
        <Logo />
        <div className='MobileMenu-body-rightSideContainer'>
            <Select
                placeholder={t('MobileMenu.Placeholder')}
                style={{ width: 120 }}
                options={options}
                onChange={handleChange}
                value={location.pathname === PATH.profile ? undefined : currentPath}
            />
            <RightSideBtns />
        </div>
    </div>
}

export default MobileMenu;