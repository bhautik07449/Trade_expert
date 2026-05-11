import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import ImageSlider from "../../commonUI/ImageSlider"
import CategoryTab from "../../component/Home/CaterogyTab"
import CardUi from "../../commonUI/CardUi"
import Homeservice from "../../service/home.service"
import { useEffect, useState } from "react"
import Analytical from "../../component/Home/Analytical"

export default function CountryPage() {
    const { country } = useParams()
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
        <Box>
            <ImageSlider />
            <CategoryTab />

            <Box sx={{ my: 4, px: { xs: 1, sm: 3, md: 7 } }}>
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
                    Priority Trade
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
                            color: "#3E3126"
                        }}
                    >
                        agri & food
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
                            color: "#3E3126"
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
                    />
                </Box>
            </Box>

            <Analytical />

        </Box >
    )
}