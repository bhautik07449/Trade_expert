import { Box, Typography } from "@mui/material"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import SEO from "../../component/SEO"

export default function ProductList() {
    const { slug } = useParams();
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

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
            <Box sx={{ py: { xs: 4, md: 8 }, mb: { xs: 6, md: 8 }, boxSizing: "border-box", width: "100%" }}>
                {loading || product?.length > 0 ?
                    <CardUi
                        title='All'
                        label='Product'
                        products={product}
                        loading={loading}
                    />
                    : (
                        <Box sx={{ maxWidth: "600px", mx: "auto", mt: 6, p: 4, textAlign: "center", bgcolor: "white", borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #f0f0f0" }}>
                            <Typography variant="h6" color="text.secondary" fontWeight={600}>
                                No products found for this category
                            </Typography>
                            <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                                Please check back later or browse other available categories from the menu.
                            </Typography>
                        </Box>
                    )}
            </Box>
        </>
    )
}