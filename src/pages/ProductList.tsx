import { Box } from "@mui/material"
import CardUi from "../commonUI/CardUi"
import InquiryDialog from "../component/Dialog/inquiry-dialog"
import { useEffect, useRef, useState } from "react"
import Homeservice from "../service/home.service"

export default function ProductList() {
    const [product, setProduct] = useState([])
    const hasFetched = useRef(false)

    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name: string
        description?: string
        image?: string
    } | null>(null)

    const getProduct = async () => {
        try {
            const res = await Homeservice.getProductList()
            if (res) {
                setProduct(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (!hasFetched.current) {
            getProduct()
            hasFetched.current = true
        }
    }, [])

    return (
        <>
            <Box sx={{ mb: 12 }}>
                <CardUi
                    title='All Season'
                    label='Availability'
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

                <CardUi
                    title='Current'
                    label='Season'
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

                <CardUi
                    title='Upcoming'
                    label='Season'
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
            </Box>

            <InquiryDialog
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={(data) => {
                    console.log("[v0] Inquiry payload:", data)
                    alert("Inquiry submitted! Check console for payload.")
                }}
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