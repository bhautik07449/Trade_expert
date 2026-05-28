import { Box } from "@mui/material"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import HomePageservice from "../../service/homepages.service"

export default function ProductOverView({ category }: any) {
    const [allProducts, setAllProducts] = useState([])
    const [currentProducts, setCurrentProducts] = useState([])
    const [upcomingProducts, setUpcomingProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                try {
                    const resAll = await HomePageservice.getProductsByCategory(category, 'All')
                    if (resAll) setAllProducts(resAll?.data?.data || [])
                } catch (err) {
                    console.log("Error fetching all products", err)
                }

                try {
                    const resCurrent = await HomePageservice.getProductsByCategory(category, 'Current')
                    if (resCurrent) setCurrentProducts(resCurrent?.data?.data || [])
                } catch (err) {
                    console.log("Error fetching current products", err)
                }

                try {
                    const resUpcoming = await HomePageservice.getProductsByCategory(category, 'Upcoming')
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

        getProducts()
    }, [category])

    return (
        <Box sx={{ maxWidth: "1400px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 } }}>
            {allProducts?.length > 0 && (
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
            )}

            {currentProducts?.length > 0 && (
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
            )}

            {upcomingProducts?.length > 0 && (
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
            )}
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