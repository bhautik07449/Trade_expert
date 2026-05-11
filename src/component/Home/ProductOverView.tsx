import { Box } from "@mui/material"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useRef, useState } from "react"
import Homeservice from "../../service/home.service"

export default function ProductOverView() {
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
    const [loading, setLoading] = useState(true)

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
    }, [])

    return (
        <Box>
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
                loading={loading}
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
                loading={loading}
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
                loading={loading}
            />

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
        </Box>
    )
}