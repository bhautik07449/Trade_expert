import { Box, Typography } from "@mui/material"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"

export default function ProductListByCountry({ country }: { country?: string }) {
    const [open, setOpen] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)
    
    const getProducts = async () => {
        setLoading(true)
        try {
            try {
                const resAll = await Homeservice.getProductList('all')
                if (resAll) setAllProducts(resAll?.data?.data || [])
            } catch (err) {
                console.log("Error fetching all products", err)
            }

        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Box sx={{ px: { xs: 1, sm: 3, md: 7 }, pt: { xs: 6, md: 8 }, maxWidth: "1200px", mx: "auto" }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "secondary.main",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}
            >
                {country ? `${country} Priority Trade` : "Priority Trade"}
            </Typography>

            <Box sx={{ mb: 8 }}>
                <Box
                    sx={{
                        border: "2px solid #3E3126",
                        textAlign: "center",
                        py: 1.5,
                        mb: 6,
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        color: "#3E3126",
                        borderRadius: 1,
                    }}
                >
                    Agri & Food
                </Box>

                <CardUi
                    label=''
                    onEnquire={(product: any) => {
                        setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                        setOpenEnquiry(true)
                    }}
                    onRequestSample={(product: any) => {
                        setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                        setOpen(true)
                    }}
                    products={allProducts}
                    loading={loading}
                    visiblecard={3}
                />
            </Box>

            <Box sx={{ mb: 8 }}>
                <Box
                    sx={{
                        border: "2px solid #3E3126",
                        textAlign: "center",
                        py: 1.5,
                        mb: 6,
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        color: "#3E3126",
                        borderRadius: 1,
                    }}
                >
                    Electronics
                </Box>

                <CardUi
                    label=''
                    onEnquire={(product: any) => {
                        setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                        setOpenEnquiry(true)
                    }}
                    onRequestSample={(product: any) => {
                        setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                        setOpen(true)
                    }}
                    products={allProducts}
                    loading={loading}
                    visiblecard={3}
                />
            </Box>

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