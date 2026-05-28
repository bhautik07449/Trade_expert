import { useEffect, useState } from "react"
import {
    Box,
    Button,
    Card,
    CardContent,
    Link,
    Typography,
    IconButton,
    Skeleton,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import Title from "./labelTitle"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { getImageUrl } from "../utils/imageUtils"

type Product = {
    id: number
    name: string
    images: string[]
    category: string
    categoryColor: string
    description: string
}

export default function CardUi({
    title,
    label,
    onEnquire,
    onRequestSample,
    products,
    visiblecard = 4,
    loading = false
}: {
    title?: string
    label?: string
    onEnquire?: (product: Product) => void
    onRequestSample?: (product: Product) => void
    products: Product[]
    visiblecard?: number
    loading?: boolean
}) {
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(visiblecard)

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth
            if (width < 600) setVisibleCards(1)
            else if (width < 900) setVisibleCards(2)
            else if (width < 1200) setVisibleCards(3)
            else setVisibleCards(visiblecard)
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [visiblecard])

    const handleNext = () => {
        if (currentStartIndex + visibleCards < products.length) {
            setCurrentStartIndex(currentStartIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex(currentStartIndex - 1)
        }
    }

    return (
        <Box sx={{ width: "100%", maxWidth: "1400px", mx: "auto", boxSizing: "border-box" }}>
            {title && label && (
                <Title title={title} label={label} />
            )}

            <Box sx={{ position: "relative", overflow: "hidden" }}>
                {!loading && (
                    <IconButton
                        sx={{
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 3,
                            bgcolor: "#f5f5f5",
                            "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={handlePrev}
                    >
                        <ChevronLeft />
                    </IconButton>
                )}

                {!loading && (
                    <IconButton
                        sx={{
                            position: "absolute",
                            right: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 3,
                            bgcolor: "#f5f5f5",
                            "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
                        onClick={handleNext}
                    >
                        <ChevronRight />
                    </IconButton>
                )}

                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        width: loading ? "100%" : `${(products.length / visibleCards) * 100}%`,
                        transform: loading ? "none" : `translateX(-${(currentStartIndex * 100) / products.length}%)`,
                    }}
                >
                    {loading ? (
                        Array.from(new Array(visibleCards)).map((_, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: `${100 / visibleCards}%`,
                                    flexShrink: 0,
                                    px: 1,
                                }}
                            >
                                <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                                    <Skeleton variant="rectangular" height={220} />
                                    <CardContent>
                                        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%', mx: 'auto' }} />
                                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                            <Skeleton variant="rectangular" height={36} sx={{ flex: 1, borderRadius: 1 }} />
                                            <Skeleton variant="rectangular" height={36} sx={{ flex: 1, borderRadius: 1 }} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    ) : (
                        products?.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    width: `${100 / products.length}%`,
                                    flexShrink: 0,
                                    px: 1,
                                }}
                            >
                                <Link component={RouterLink} to={`/product-details/${product?.id}`} underline="none">
                                    <Card
                                        sx={{
                                            borderRadius: 3,
                                            overflow: "hidden",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={getImageUrl(product?.images[0])}
                                            alt={product?.name}
                                            sx={{ width: "100%", height: 220, objectFit: "contain", bgcolor: "#f5f5f5" }}
                                        />

                                        <CardContent>
                                            <Typography align="center" fontWeight={600}>
                                                {product.name}
                                            </Typography>

                                            <Box sx={{
                                                display: "flex",
                                                gap: 2,
                                            }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    sx={{ mt: 2, fontSize: "12px" }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        onEnquire && onEnquire(product)
                                                    }}
                                                >
                                                    Enquire now
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    fullWidth
                                                    sx={{ mt: 2, fontSize: "12px" }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        onRequestSample && onRequestSample(product)
                                                    }}
                                                >
                                                    request sample
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    )
}