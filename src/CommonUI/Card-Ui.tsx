"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, Typography, Button, Chip, Box, Container, Rating, IconButton } from "@mui/material"
import { Favorite, Share, ShoppingCart } from "@mui/icons-material"
import Title from "./Title"

const products = [
    {
        id: 1,
        name: "Frozen veg. & Mix veg.",
        image: "/frozen-vegetables-green-background.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        price: "$12.99",
        originalPrice: "$15.99",
        rating: 4.5,
        reviews: 128,
        description:
            "Premium quality frozen mixed vegetables including broccoli, carrots, peas, and corn. Perfect for healthy meals.",
        features: ["Organic", "Fresh Frozen", "No Preservatives"],
        inStock: true,
    },
    {
        id: 2,
        name: "White Onion Flakes",
        image: "/white-onion-flakes-in-wooden-bowl.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        price: "$8.49",
        originalPrice: "$10.99",
        rating: 4.3,
        reviews: 89,
        description: "Dehydrated white onion flakes with intense flavor. Perfect for seasoning and cooking.",
        features: ["Dehydrated", "Long Shelf Life", "Intense Flavor"],
        inStock: true,
    },
    {
        id: 3,
        name: "Organic Spice Mix",
        image: "/organic-spice-mix-colorful-spices.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        price: "$16.99",
        originalPrice: "$19.99",
        rating: 4.7,
        reviews: 156,
        description: "Authentic blend of organic spices sourced from premium farms. Adds rich flavor to any dish.",
        features: ["100% Organic", "Premium Quality", "Authentic Blend"],
        inStock: true,
    },
    {
        id: 4,
        name: "Basmati Rice Premium",
        image: "/basmati-rice-grains-premium-quality.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        price: "$22.99",
        originalPrice: "$25.99",
        rating: 4.6,
        reviews: 203,
        description: "Long grain basmati rice with aromatic fragrance. Perfect for biryanis and special occasions.",
        features: ["Long Grain", "Aromatic", "Premium Grade"],
        inStock: false,
    },
    {
        id: 5,
        name: "Turmeric Powder",
        image: "/turmeric-powder-golden-yellow-spice.png",
        category: "On-behalf",
        categoryColor: "#4CAF50",
        price: "$6.99",
        originalPrice: "$8.99",
        rating: 4.4,
        reviews: 94,
        description: "Pure turmeric powder with high curcumin content. Known for its anti-inflammatory properties.",
        features: ["High Curcumin", "Pure & Natural", "Health Benefits"],
        inStock: true,
    },
    {
        id: 6,
        name: "Black Pepper Whole",
        image: "/black-pepper-whole-spice-premium.png",
        category: "Indenting",
        categoryColor: "#00BCD4",
        price: "$14.99",
        originalPrice: "$17.99",
        rating: 4.8,
        reviews: 167,
        description: "Whole black peppercorns with intense flavor and aroma. Perfect for grinding fresh pepper.",
        features: ["Whole Peppercorns", "Intense Flavor", "Premium Quality"],
        inStock: true,
    },
]

export default function CardUi({ title, label }: { title: string, label: string }) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(4)
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth
            if (width < 600) {
                setVisibleCards(1)  // mobile
            } else if (width < 900) {
                setVisibleCards(2)  // small tablets
            } else if (width < 1200) {
                setVisibleCards(3)  // tablets
            } else if (width < 1536) {
                setVisibleCards(4)  // laptops
            } else {
                setVisibleCards(4)  // large screens
            }
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [])

    useEffect(() => {
        if (isPaused) return

        const interval = setInterval(() => {
            setCurrentStartIndex((prevIndex) => {
                const nextIndex = prevIndex + 1
                return nextIndex + visibleCards > products.length ? 0 : nextIndex
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
                sx={{
                    overflow: "hidden",
                    width: "100%",
                }}
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
                        <Box
                            key={product.id}
                            sx={{
                                width: `${100 / products.length}%`,
                                flexShrink: 0,
                                px: 1,
                            }}
                        >
                            <Card
                                sx={{
                                    width: '100%',
                                    display: "flex",
                                    flexDirection: "column",
                                    cursor: "pointer",
                                    position: "relative",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    bgcolor: "white",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                    transition: "all 0.3s ease-in-out",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                                    },
                                }}
                                onMouseEnter={() => setHoveredCard(product.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "white",
                                        p: 3,
                                        height: 220,
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "0 !important",
                                    }}
                                >
                                    <Chip
                                        label={product.category}
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            right: 16,
                                            bgcolor: product.categoryColor,
                                            color: "white",
                                            fontWeight: "600",
                                            fontSize: "0.75rem",
                                            zIndex: 2,
                                            borderRadius: 2,
                                        }}
                                    />

                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "fill",
                                            borderRadius: "2 0",
                                        }}
                                    />
                                </Box>

                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        p: 3,
                                        bgcolor: "white",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{
                                            fontWeight: "600",
                                            mb: 3,
                                            color: "text.primary",
                                            textAlign: "center",
                                            fontSize: "1.1rem",
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {product.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", gap: 1.5 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                bgcolor: "#4CAF50",
                                                "&:hover": {
                                                    bgcolor: "#45a049",
                                                },
                                                fontWeight: "600",
                                                textTransform: "none",
                                                py: 1.2,
                                                borderRadius: 2,
                                                fontSize: "0.9rem",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            Enquire Now
                                        </Button>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                bgcolor: "#4CAF50",
                                                "&:hover": {
                                                    bgcolor: "#45a049",
                                                },
                                                fontWeight: "600",
                                                textTransform: "none",
                                                py: 1.2,
                                                borderRadius: 2,
                                                fontSize: "0.9rem",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            Request Sample
                                        </Button>
                                    </Box>
                                </CardContent>

                                {hoveredCard === product.id && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            bgcolor: "rgba(255, 255, 255, 0.98)",
                                            backdropFilter: "blur(10px)",
                                            zIndex: 10,
                                            p: 3,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            borderRadius: 3,
                                            animation: "fadeIn 0.3s ease-in-out",
                                            "@keyframes fadeIn": {
                                                from: { opacity: 0, transform: "scale(0.95)" },
                                                to: { opacity: 1, transform: "scale(1)" },
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                                                <Typography variant="h6" sx={{ fontWeight: "700", color: "text.primary", fontSize: "1.1rem" }}>
                                                    {product.name}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 0.5 }}>
                                                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                                                        <Favorite fontSize="small" />
                                                    </IconButton>
                                                    <IconButton size="small" sx={{ color: "text.secondary" }}>
                                                        <Share fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                                <Typography variant="h5" sx={{ fontWeight: "700", color: "#4CAF50" }}>
                                                    {product.price}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        textDecoration: "line-through",
                                                        color: "text.secondary",
                                                        fontSize: "0.9rem",
                                                    }}
                                                >
                                                    {product.originalPrice}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                                                <Rating value={product.rating} precision={0.1} size="small" readOnly />
                                                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                                                    ({product.reviews} reviews)
                                                </Typography>
                                            </Box>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    mb: 2,
                                                    fontSize: "0.85rem",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {product.description}
                                            </Typography>

                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                                                {product.features.map((feature, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={feature}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "#f5f5f5",
                                                            color: "text.secondary",
                                                            fontSize: "0.7rem",
                                                            height: "24px",
                                                        }}
                                                    />
                                                ))}
                                            </Box>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: product.inStock ? "#4CAF50" : "#f44336",
                                                    fontWeight: "600",
                                                    fontSize: "0.8rem",
                                                }}
                                            >
                                                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                startIcon={<ShoppingCart />}
                                                disabled={!product.inStock}
                                                sx={{
                                                    bgcolor: "#4CAF50",
                                                    "&:hover": { bgcolor: "#45a049" },
                                                    "&:disabled": { bgcolor: "#ccc" },
                                                    fontWeight: "600",
                                                    textTransform: "none",
                                                    py: 1,
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                sx={{
                                                    borderColor: "#4CAF50",
                                                    color: "#4CAF50",
                                                    "&:hover": {
                                                        borderColor: "#45a049",
                                                        bgcolor: "rgba(76, 175, 80, 0.04)",
                                                    },
                                                    fontWeight: "600",
                                                    textTransform: "none",
                                                    py: 1,
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                Quick View
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    )
}
