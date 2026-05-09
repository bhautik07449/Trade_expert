"use client"

import { useState, useEffect } from "react"
import { Box, IconButton, Skeleton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import Homeservice from "../service/home.service"
import { getImageUrl } from "../utils/imageUtils"

interface SlideData {
    id: number
    image: string
}

export default function ImageSlider() {
    const [slides, setSlides] = useState<SlideData[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)

    const getSlide = async () => {
        try {
            const res = await Homeservice.getBanner()
            if (res) {
                setSlides(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSlide()
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    useEffect(() => {
        if (slides.length === 0) return

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [slides])

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                bgcolor: "#f8f9fa", // Optional background for any empty space
            }}
        >
            {loading ? (
                <Skeleton variant="rectangular" width="100%" sx={{ height: { xs: 200, md: 500 } }} />
            ) : (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                            alignItems: "center", // Center images vertically if they don't fill height
                            transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                    >
                        {slides.map((slide) => (
                            <Box
                                key={slide.id}
                                component="img"
                                src={getImageUrl(slide?.image)}
                                alt={`Slide ${slide?.id}`}
                                sx={{
                                    flex: "0 0 100%",
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: { xs: 250, sm: 350, md: 500, lg: 600 },
                                    objectFit: "contain",
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
                </>
            )}
        </Box>
    )
}
