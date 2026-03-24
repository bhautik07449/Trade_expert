import { Box, Typography } from "@mui/material"
import CardUi from "../commonUI/CardUi"
import InquiryDialog from "../component/Dialog/inquiry-dialog"
import { useEffect, useRef, useState } from "react"
import Homeservice from "../service/home.service"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProductList() {
    const { slug } = useParams();
    const [product, setProduct] = useState([])

    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name: string
        description?: string
        image?: string
    } | null>(null)

    const getProduct = async () => {
        try {
            const res = await Homeservice.getProductByslug(slug)
            if (res) {
                setProduct(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
            toast.error("No products found for this category")
        }
    }

    useEffect(() => {
        setProduct([])
        getProduct()
    }, [slug])

    return (
        <>
            <Box sx={{ mb: 12 }}>
                {product?.length > 0 ?
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