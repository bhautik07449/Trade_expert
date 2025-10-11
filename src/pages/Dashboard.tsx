import React from 'react'
import ImageSlider from '../commonUI/image-slider'
import CardUi from '../commonUI/Card-Ui'
import SpotMarketTable from '../commonUI/spot-market'

export const Dashboard = () => {
  return (
    <>
      <ImageSlider />
      <SpotMarketTable />
      <CardUi title='All Season' label='Availability' />
      <CardUi title='Current' label='Season' />
      <CardUi title='Upcoming' label='Season' />
    </>
  )
}
