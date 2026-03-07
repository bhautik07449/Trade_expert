import { Box } from "@mui/material"
import CardUi from "../commonUI/CardUi"
import InquiryDialog from "../component/Dialog/inquiry-dialog"
import { useState } from "react"

export default function ProductList() {
    const [open, setOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name: string
        description?: string
        image?: string
    } | null>(null)

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
                    products={[]}
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
                    products={[]}
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
                    products={[]}
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