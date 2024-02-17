import React from 'react'

import { Spin } from 'antd'

import { ILoaderProps } from './LoaderTypes'

import './LoaderStyles.scss'

const Loader: React.FC<ILoaderProps> = ({ isLoading }) => {
  if (!isLoading) return

  return (
    <div className="Loader-body">
      <Spin tip="Loading" size="large" />
    </div>
  )
}

export default Loader
