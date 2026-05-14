import { Box, Typography } from "@mui/material"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"

export default function ProductListByCountry({ country }: { country?: string }) {
    const [open, setOpen] = useState(false)
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)

    console.log("allProducts", allProducts);

    const getProducts = async (country: string) => {
        setLoading(true)
        try {
            try {
                const resAll = await Homeservice.getProductBygroup(country)
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
        if (country) {
            getProducts(country)
        }
    }, [country])

    return (
        <Box sx={{ px: { xs: 1, sm: 3, md: 0 }, pt: { xs: 6, md: 8 }, maxWidth: "1200px", mx: "auto" }}>
            {allProducts.length > 0 && (
                allProducts?.map((pro, idx) => (
                    <>
                        <Typography
                            variant="h5"
                            key={idx}
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                color: "secondary.main",
                                textTransform: "uppercase",
                                letterSpacing: 1,
                            }}
                        >
                            {pro?.productname?.name}
                        </Typography>

                        {pro?.item?.map((item: any, idx: number) => (
                            <Box sx={{ mb: 8 }} key={idx}>
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
                                    {item?.category?.name}
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
                                    products={item?.product_data}
                                    loading={loading}
                                    visiblecard={3}
                                />
                            </Box>
                        ))}
                    </>
                ))
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