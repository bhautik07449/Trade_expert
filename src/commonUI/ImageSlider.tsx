"use client"

import { useState, useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

interface SlideData {
    id: number
    image: string
}

const slides: SlideData[] = [
    { id: 1, image: "https://sourceseas.itcoders.in/files/banners/2d98e64446c07c883abb60c91e34d34f.jpeg" },
    { id: 2, image: "https://sourceseas.itcoders.in/files/banners/fb151fe7abf87625d133f442b822bd84.jpeg" },
    { id: 3, image: "https://sourceseas.itcoders.in/files/banners/c8099d42684c2ab0882eb03f51a0ab01.jpeg" },
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
                height: { xs: 250, md: 500 },
                my: 4,
                overflow: "hidden",
                borderRadius: 1,
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
                            objectFit: "fill",
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
