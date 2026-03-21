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
import EnquiryDialog from '../component/Dialog/enquiry-dialog'
import QuotationDialog from '../component/Dialog/quote-dialog'

export const Dashboard = () => {
  const [product, setProduct] = useState([])
  const hasFetched = useRef(false)
  const [open, setOpen] = useState(false)
  const [openEnquiry, setOpenEnquiry] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    name?: string
    description?: string
    images?: string
    id?: any
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
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
          setOpenEnquiry(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
          setOpen(true)
        }}
        products={product}
      />

      <CardUi
        title='Current'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
          setOpenEnquiry(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
          setOpen(true)
        }}
        products={product}
      />

      <CardUi
        title='Upcoming'
        label='Season'
        onEnquire={(product) => {
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
          setOpenEnquiry(true)
        }}
        onRequestSample={(product) => {
          setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
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
        product={{
          name: selectedProduct?.name,
          description: selectedProduct?.description,
          images: selectedProduct?.images,
          id: selectedProduct?.id
        }}
      />

      <EnquiryDialog
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        product={{
          name: selectedProduct?.name,
          description: selectedProduct?.description,
          images: selectedProduct?.images,
          id: selectedProduct?.id
        }}
      />
    </>
  )
}
