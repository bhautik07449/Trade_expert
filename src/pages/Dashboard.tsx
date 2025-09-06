import React from 'react'
import ImageSlider from '../CommonUI/image-slider'
import CardUi from '../CommonUI/Card-Ui'
import SpotMarketTable from '../CommonUI/spot-market'

export const Dashboard = () => {
  return (
    <>
      <ImageSlider />
      <SpotMarketTable />
      <CardUi />
    </>
  )
}
