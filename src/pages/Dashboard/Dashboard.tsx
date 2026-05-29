import { useEffect, useRef, useState } from 'react'
import ImageSlider from '../../commonUI/ImageSlider'
import CardUi from '../../commonUI/CardUi'
import SpotMarketTable from '../../commonUI/spotMarket'
import OurView from '../../component/Ourview'
import OurProcess from '../../component/OurProcess'
import Values from '../../component/Values'
import AboutTestimonial from '../About/AboutTestimonial'
import Homeservice from '../../service/home.service'
import SEO from '../../component/SEO'

export const Dashboard = () => {
  const [allProducts, setAllProducts] = useState([])
  const [currentProducts, setCurrentProducts] = useState([])
  const [upcomingProducts, setUpcomingProducts] = useState([])
  const hasFetched = useRef(false)
  const [loading, setLoading] = useState(true)
  const [slides, setSlides] = useState<any[]>([])
  const [imageLoading, setImageLoading] = useState(true)

  const getSlide = async () => {
    try {
      const res = await Homeservice.getBanner()
      if (res) {
        setImageLoading(false)
        setSlides(res?.data?.data)
      }
    } catch (error: any) {
      setImageLoading(false)
      console.log(error?.response?.data?.message || error.message)
    }
  }

  const getProducts = async () => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasFetched.current) {
      getProducts()
      hasFetched.current = true
    }

    getSlide()
  }, [])

  return (
    <>
      <SEO
        title="Tradexpert - B2B Marketplace for Traders"
        description="Join Tradexpert, the leading B2B marketplace for spot markets, current, and upcoming seasonal products. Connect with verified suppliers and buyers."
        keywords="B2B, marketplace, spot market, wholesale, trade, suppliers, buyers"
      />
      <ImageSlider slides={slides} loading={imageLoading} />
      <SpotMarketTable />
      <CardUi
        title='All Season'
        label='Availability'
        products={allProducts}
        loading={loading}
      />

      <CardUi
        title='Current'
        label='Season'
        products={currentProducts}
        loading={loading}
      />

      <CardUi
        title='Upcoming'
        label='Season'
        products={upcomingProducts}
        loading={loading}
      />
      <OurView />
      <OurProcess />
      <Values />
      <AboutTestimonial />
    </>
  )
}
