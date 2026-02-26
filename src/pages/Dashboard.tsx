import React from 'react'
import ImageSlider from '../commonUI/ImageSlider'
import CardUi from '../commonUI/CardUi'
import SpotMarketTable from '../commonUI/spotMarket'
import InquiryDialog from '../component/Dialog/inquiry-dialog'
import OurView from '../component/Ourview'
import OurProcess from '../component/OurProcess'
import Values from '../component/Values'
import AboutTestimonial from './AboutTestimonial'

export const Dashboard = () => {
  const [open, setOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<{
    name: string
    description?: string
    image?: string
  } | null>(null)

  return (
    <>
      <ImageSlider />
      <SpotMarketTable />
      <CardUi
        title='All Season'
        label='Availability'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />

      <CardUi
        title='Current'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />

      <CardUi
        title='Upcoming'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name })
          setOpen(true)
        }}
      />
      <OurView />
      <OurProcess />
      <Values />
      <AboutTestimonial />

      <InquiryDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("[v0] Inquiry payload:", data)
          alert("Inquiry submitted! Check console for payload.")
        }}
        product={{
          name: selectedProduct?.name || "Flavoured Khakhra",
          description:
            selectedProduct?.description ||
            "Khakhra is a thin cracker common in the Gujarati and Rajasthani cuisines of western India...",
        }}
      />
    </>
  )
}
