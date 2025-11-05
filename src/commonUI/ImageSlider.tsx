"use client"

import { useState, useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

interface SlideData {
    id: number
    image: string
}

const slides: SlideData[] = [
    { id: 1, image: "/modern-wireless-headphones.png" },
    { id: 2, image: "/sleek-smartwatch-fitness-tracker.png" },
    { id: 3, image: "/rgb-gaming-mouse-ergonomic-design.png" },
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
                height: { xs: 250, md: 400 },
                my: 4,
                overflow: "hidden",
                borderRadius: 2,
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
                    <Box
                        key={slide.id}
                        component="img"
                        src={slide.image || "/placeholder.svg"}
                        alt={`Slide ${slide.id}`}
                        sx={{
                            minWidth: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ))}
            </Box>

            <IconButton
                sx={{
                    position: "absolute",
                    left: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    bgcolor: "rgba(255,255,255,0.7)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
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
                    bgcolor: "rgba(255,255,255,0.7)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}
                onClick={nextSlide}
            >
                <ChevronRight />
            </IconButton>
        </Box>
    )
}
