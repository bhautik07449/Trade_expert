import React, { useEffect, useRef, useState } from 'react'
import ImageSlider from '../commonUI/ImageSlider'
import CardUi from '../commonUI/CardUi'
import SpotMarketTable from '../commonUI/spotMarket'
import InquiryDialog from '../component/Dialog/inquiry-dialog'
import OurView from '../component/Ourview'
import OurProcess from '../component/OurProcess'
import Values from '../component/Values'
import AboutTestimonial from './AboutTestimonial'
import Homeservice from '../service/home.service'

export const Dashboard = () => {
  const [product, setProduct] = useState([])
  const hasFetched = useRef(false)
  const [open, setOpen] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState<{
    name: string
    description?: string
    image?: string
  } | null>(null)

  const getProduct = async () => {
    try {
      const res = await Homeservice.getProductList()
      if (res) {
        setProduct(res?.data?.data)
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      getProduct()
      hasFetched.current = true
    }
  }, [])

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
        products={product}
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
        products={product}
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
        products={product}
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
