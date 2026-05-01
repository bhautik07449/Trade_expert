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
  const [allProducts, setAllProducts] = useState([])
  const [currentProducts, setCurrentProducts] = useState([])
  const [upcomingProducts, setUpcomingProducts] = useState([])
  const hasFetched = useRef(false)
  const [open, setOpen] = useState(false)
  const [openEnquiry, setOpenEnquiry] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    name?: string
    description?: string
    images?: string
    id?: any
  } | null>(null)

  const getProducts = async () => {
    try {
      try {
        const resAll = await Homeservice.getProductList('all')
        if (resAll) setAllProducts(resAll?.data?.data || [])
      } catch (err) {
        console.log("Error fetching all products", err)
      }

      try {
        const resCurrent = await Homeservice.getProductList('Current')
        if (resCurrent) setCurrentProducts(resCurrent?.data?.data || [])
      } catch (err) {
        console.log("Error fetching current products", err)
      }

      try {
        const resUpcoming = await Homeservice.getProductList('Upcoming')
        if (resUpcoming) setUpcomingProducts(resUpcoming?.data?.data || [])
      } catch (err) {
        console.log("Error fetching upcoming products", err)
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      getProducts()
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
        products={allProducts}
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
        products={currentProducts}
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
        products={upcomingProducts}
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
