"use client"

import { useState, useEffect } from "react"
import { Box, IconButton, CircularProgress } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import Homeservice from "../service/home.service"

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
                height: { xs: 200, md: 500 },
                overflow: "hidden",
            }}
        >
            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
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
                                src={slide?.image || "/placeholder.svg"}
                                alt={`Slide ${slide?.id}`}
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
                </>
            )}
        </Box>
    )
}
