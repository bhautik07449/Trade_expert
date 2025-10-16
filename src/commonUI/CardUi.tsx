"use client"

import { useEffect, useRef, useState } from "react"
import { Box, Button, Card, CardContent, Container, Link, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";
import Title from "./labelTitle"

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
        description: "Premium mixed vegetables—broccoli, carrots, peas, and corn. Perfect for quick healthy meals.",
    },
    {
        id: 2,
        name: "White Onion Flakes",
        image: "/white-onion-flakes-in-wooden-bowl.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Dehydrated white onion flakes with intense flavor for seasoning and cooking.",
    },
    {
        id: 3,
        name: "Organic Spice Mix",
        image: "/organic-spice-mix-colorful-spices.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        description: "Authentic blend of organic spices sourced from premium farms.",
    },
    {
        id: 4,
        name: "Basmati Rice Premium",
        image: "/basmati-rice-grains-premium-quality.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Long grain basmati rice with aromatic fragrance—ideal for biryani.",
    },
    {
        id: 5,
        name: "Turmeric Powder",
        image: "/turmeric-powder-golden-yellow-spice.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        description: "Pure turmeric powder with high curcumin content.",
    },
    {
        id: 6,
        name: "Black Pepper Whole",
        image: "/black-pepper-whole-spice-premium.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        description: "Whole black peppercorns with bold aroma—perfect for fresh grinding.",
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
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        if (isPaused) return
        const interval = setInterval(() => {
            setCurrentStartIndex((prev) => {
                const next = prev + 1
                return next + visibleCards > products.length ? 0 : next
            })
        }, 2000)
        return () => clearInterval(interval)
    }, [visibleCards, isPaused])

    return (
        <Container maxWidth="xl" sx={{ padding: "0 !important" }}>
            <Title title={title} label={label} />

            <Box
                ref={containerRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                sx={{ overflow: "hidden", width: "100%" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        transition: "transform 0.5s ease-in-out",
                        width: `${products.length * (100 / visibleCards)}%`,
                        transform: `translateX(-${currentStartIndex * (100 / products.length)}%)`,
                    }}
                >
                    {products.map((product) => (
                        <Box key={product.id} sx={{ width: `${100 / products.length}%`, flexShrink: 0, px: 1 }}>
                            <Link
                                component={RouterLink}
                                to="/product-details"
                                underline="none"
                                sx={{
                                    color: "text.primary",
                                    "&:hover": { color: "primary.main" },
                                    fontWeight: 500,
                                }}
                            >
                                <Card
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        bgcolor: "white",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                        transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                        },
                                    }}
                                    onMouseEnter={() => setHoveredCard(product.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            bgcolor: "white",
                                            height: 220,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            p: 0,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={product.image}
                                            alt={product.name}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />

                                        {hoveredCard === product.id && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    bgcolor: "rgba(0,0,0,0.45)",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 1.5,
                                                    p: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ color: "white", fontWeight: 700, textAlign: "center", px: 2 }}
                                                >
                                                    {product.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "white",
                                                        opacity: 0.9,
                                                        textAlign: "center",
                                                        px: 2,
                                                        mb: 0.5,
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {product.description}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 1, width: "100%", px: 2 }}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ bgcolor: "#4CAF50", "&:hover": { bgcolor: "#45a049" }, textTransform: "none" }}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            onEnquire?.(product)
                                                        }}
                                                    >
                                                        Enquire Now
                                                    </Button>
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            borderColor: "white",
                                                            color: "white",
                                                            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" },
                                                            textTransform: "none",
                                                        }}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            onRequestSample?.(product)
                                                        }}
                                                    >
                                                        Request Sample
                                                    </Button>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1, bgcolor: "white", p: 3 }}>
                                        <Typography
                                            variant="h6"
                                            component="h3"
                                            sx={{ fontWeight: 600, color: "text.primary", textAlign: "center", fontSize: "1.05rem" }}
                                        >
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
