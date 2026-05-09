import { Box, Typography } from "@mui/material"
import CardUi from "../../commonUI/CardUi"
import InquiryDialog from "../../component/Dialog/inquiry-dialog"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import SEO from "../../component/SEO"

export default function ProductList() {
    const { slug } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name: string
        description?: string
        image?: string
    } | null>(null)

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true)
            try {
                const res = await Homeservice.getProductByslug(slug)
                if (res) {
                    setProduct(res?.data?.data)
                }
            } catch (error) {
                console.log("error", error);
                toast.error("No products found for this category")
            } finally {
                setLoading(false)
            }
        }
        setProduct([])
        getProduct()
    }, [slug])

    return (
        <>
            <SEO 
                title={`${slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Products'} - Tradexpert`} 
                description={`Explore our wide range of ${slug ? slug.replace(/-/g, ' ') : ''} products. Connect with verified suppliers and buyers on Tradexpert.`}
            />
            <Box sx={{ mb: 12 }}>
                {loading || product?.length > 0 ?
                    <CardUi
                        title='All'
                        label='Product'
                        onEnquire={(product) => {
                            setSelectedProduct(product)
                            setOpen(true)
                        }}
                        onRequestSample={(product) => {
                            setSelectedProduct({ name: product.name })
                            setOpen(true)
                        }}
                        products={product}
                        loading={loading}
                    />
                    : <Typography sx={{ textAlign: "center", mt: 12 }}>No products found for this category</Typography>}
            </Box>

            <InquiryDialog
                open={open}
                onClose={() => setOpen(false)}
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