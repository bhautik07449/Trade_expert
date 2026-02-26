"use client"

import { useEffect, useRef, useState } from "react"
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Link,
    Typography,
    IconButton,
} from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as RouterLink } from "react-router-dom"
import Title from "./labelTitle"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

type Product = {
    id: number
    name: string
    image: string
    category: string
    categoryColor: string
    description: string
}

const products: Product[] = [
    {
        id: 1,
        name: "Frozen veg. & Mix veg.",
        image: "/frozen-vegetables-green-background.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        description: "Premium mixed vegetables—broccoli, carrots, peas, and corn.",
    },
    {
        id: 2,
        name: "White Onion Flakes",
        image: "/white-onion-flakes-in-wooden-bowl.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Dehydrated white onion flakes with intense flavor.",
    },
    {
        id: 3,
        name: "Organic Spice Mix",
        image: "/organic-spice-mix-colorful-spices.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        description: "Authentic blend of organic spices.",
    },
    {
        id: 4,
        name: "Basmati Rice Premium",
        image: "/basmati-rice-grains-premium-quality.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Long grain basmati rice with aromatic fragrance.",
    },
    {
        id: 5,
        name: "Turmeric Powder",
        image: "/turmeric-powder-golden-yellow-spice.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        description: "Pure turmeric powder with high curcumin.",
    },
    {
        id: 6,
        name: "Black Pepper Whole",
        image: "/black-pepper-whole-spice-premium.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Whole black peppercorns with bold aroma.",
    },
]

export default function CardUi({
    title,
    label,
    onEnquire,
    onRequestSample,
}: {
    title: string
    label: string
    onEnquire?: (product: Product) => void
    onRequestSample?: (product: Product) => void
}) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(4)

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth
            if (width < 600) setVisibleCards(1)
            else if (width < 900) setVisibleCards(2)
            else if (width < 1200) setVisibleCards(3)
            else setVisibleCards(4)
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [])

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
        <Container maxWidth="xl" sx={{ p: 0 }}>
            <Title title={title} label={label} />

            <Box sx={{ position: "relative", overflow: "hidden" }}>
                <IconButton
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 3,
                        bgcolor: "#f5f5f5",
                    }}
                    onClick={handlePrev}
                >
                    <ChevronLeft />
                </IconButton>

                <IconButton
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 3,
                        bgcolor: "#f5f5f5",
                    }}
                    onClick={handleNext}
                >
                    <ChevronRight />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        width: `${(products.length / visibleCards) * 100}%`,
                        transform: `translateX(-${(currentStartIndex * 100) / products.length}%)`,
                    }}
                >
                    {products.map((product) => (
                        <Box
                            key={product.id}
                            sx={{
                                width: `${100 / products.length}%`,
                                flexShrink: 0,
                                px: 1,
                            }}
                        >
                            <Link component={RouterLink} to="/product-details" underline="none">
                                <Card
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{ width: "100%", height: 220, objectFit: "cover" }}
                                    />

                                    <CardContent>
                                        <Typography align="center" fontWeight={600}>
                                            {product.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}