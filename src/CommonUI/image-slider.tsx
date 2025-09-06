"use client"

import { useState, useEffect } from "react"
import { Box, Button, Typography, IconButton, Container } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

interface SlideData {
    id: number
    title: string
    subtitle: string
    image: string
    buttonText: string
    buttonLink: string
}

const slides: SlideData[] = [
    {
        id: 1,
        title: "Premium Wireless Audio",
        subtitle: "Experience crystal-clear sound with our latest headphone collection",
        image: "/modern-wireless-headphones.png",
        buttonText: "Shop Headphones",
        buttonLink: "#headphones",
    },
    {
        id: 2,
        title: "Smart Fitness Tracking",
        subtitle: "Monitor your health and fitness goals with advanced smartwatch technology",
        image: "/sleek-smartwatch-fitness-tracker.png",
        buttonText: "Explore Watches",
        buttonLink: "#watches",
    },
    {
        id: 3,
        title: "Gaming Excellence",
        subtitle: "Elevate your gaming experience with precision gaming peripherals",
        image: "/rgb-gaming-mouse-ergonomic-design.png",
        buttonText: "Gaming Gear",
        buttonLink: "#gaming",
    },
]

export default function ImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: { xs: 300, md: 500 },
                my: 4,
                overflow: "hidden",
                borderRadius: 2,
                padding: "0 !important",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    transition: "transform 0.5s ease-in-out",
                    height: "100%",
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <Box key={slide.id} sx={{ minWidth: "100%", height: "100%", position: "relative" }}>
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to left, rgba(121, 114, 114, 0.8), rgba(36, 31, 31, 0.4))",
                                zIndex: 1,
                            }}
                        />
                        <Box
                            component="img"
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 2,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Container maxWidth="xl">
                                <Box sx={{ maxWidth: 500, px: { xs: 2, md: 0 } }}>
                                    <Typography
                                        variant="h2"
                                        component="h2"
                                        sx={{
                                            fontSize: { xs: "2rem", md: "3.5rem" },
                                            fontWeight: "bold",
                                            mb: 2,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {slide.title}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: { xs: "1.1rem", md: "1.25rem" },
                                            color: "text.secondary",
                                            mb: 4,
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        {slide.subtitle}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            fontSize: "1.1rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {slide.buttonText}
                                    </Button>
                                </Box>
                            </Container>
                        </Box>
                    </Box>
                ))}
            </Box>

            <IconButton
                sx={{
                    position: "absolute",
                    left: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    bgcolor: "background.paper",
                    backdropFilter: "blur(4px)",
                    "&:hover": { bgcolor: "background.default" },
                }}
                onClick={prevSlide}
            >
                <ChevronLeft />
            </IconButton>
            <IconButton
                sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    bgcolor: "background.paper",
                    backdropFilter: "blur(4px)",
                    "&:hover": { bgcolor: "background.default" },
                }}
                onClick={nextSlide}
            >
                <ChevronRight />
            </IconButton>
        </Box>
    )
}
