import { Box, Typography, Avatar, Paper, MobileStepper } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";

export default function AboutTestimonial() {
    const testimonials = [
        {
            name: "JOYMAGTI BAY",
            role: "International Buyer",
            image: "/images/testimonial1.jpg",
            text: "Amazing experience! The team is highly knowledgeable and professional. We received top-notch quality products and excellent service.",
        },
        {
            name: "DAVID SMITH",
            role: "Importer",
            image: "/images/testimonial2.jpg",
            text: "Very reliable exporter. Quality products delivered on time. Highly recommended for agricultural exports.",
        },
        {
            name: "MARIA LOPEZ",
            role: "Food Distributor",
            image: "/images/testimonial3.jpg",
            text: "Excellent packaging and premium quality. The team is very supportive and responsive.",
        },
    ];

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = testimonials.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prevStep) =>
                prevStep === maxSteps - 1 ? 0 : prevStep + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, [maxSteps]);

    return (
        <Box
            sx={{
                bgcolor: "#f5f1ec",
                py: { xs: 6, md: 10 },
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: { xs: 6, md: 10 },
                    px: { xs: 3, md: 2 },
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#7cb342",
                            fontWeight: 600,
                            mb: 3,
                        }}
                    >
                        About Us
                    </Typography>

                    <Typography sx={{ mb: 1, fontSize: "14px", lineHeight: 1.9, color: "#555" }}>
                        At Sourceseas Overseas, we continuously work towards
                        improving and raising the standards of agricultural and
                        food exports from India to the world. Quality is what we
                        love, and it is what we deliver. It has been the core
                        objective of our firm since its formation.
                    </Typography>

                    <Typography sx={{ mb: 1, fontSize: "14px", lineHeight: 1.9, color: "#555" }}>
                        We collaborate directly with farmers, agro producers,
                        and food processors across India, making us unique in
                        our domain. We serve seasonal crops and extend
                        availability for a wide range of agricultural products.
                    </Typography>

                    <Typography sx={{ mb: 1, fontSize: "14px", lineHeight: 1.9, color: "#555" }}>
                        Our utmost priority is quality assurance. Every product
                        is inspected under APEDA guidelines to ensure pesticide-
                        free exports. With one of the largest storage facilities
                        in the region, we can fulfill bulk orders efficiently
                        and ensure immediate export readiness.
                    </Typography>

                    <Typography sx={{ fontSize: "14px", lineHeight: 1.9, color: "#555" }}>
                        With strong process knowledge and a talented, motivated
                        team driven by vision and mission, Sourceseas Overseas
                        is rapidly expanding globally. We would be happy to
                        associate with you.
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#7cb342",
                            fontWeight: 600,
                            mb: 4,
                            textAlign: "center",
                        }}
                    >
                        Testimonials
                    </Typography>

                    <SwipeableViews
                        index={activeStep}
                        onChangeIndex={(index) => setActiveStep(index)}
                        enableMouseEvents
                    >
                        {testimonials.map((item, index) => (
                            <Box key={index} sx={{ px: 2 }}>
                                <Paper
                                    elevation={4}
                                    sx={{
                                        p: 5,
                                        borderRadius: 4,
                                        textAlign: "center",
                                        position: "relative",
                                        bgcolor: "#ffffff",
                                        maxWidth: 500,
                                        mx: "auto",
                                    }}
                                >
                                    <FormatQuoteIcon
                                        sx={{
                                            fontSize: 60,
                                            color: "#7cb342",
                                            opacity: 0.2,
                                            position: "absolute",
                                            top: 20,
                                            left: 20,
                                        }}
                                    />

                                    <Avatar
                                        src={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            mx: "auto",
                                            mb: 3,
                                            border: "4px solid #f5f1ec",
                                            boxShadow: 3,
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            mb: 3,
                                            lineHeight: 1.8,
                                            fontStyle: "italic",
                                            color: "#666",
                                        }}
                                    >
                                        "{item.text}"
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: "#333",
                                        }}
                                    >
                                        {item.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: 14,
                                            color: "#888",
                                            mt: 1,
                                        }}
                                    >
                                        {item.role}
                                    </Typography>
                                </Paper>
                            </Box>
                        ))}
                    </SwipeableViews>

                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={null}
                        backButton={null}
                        sx={{
                            justifyContent: "center",
                            bgcolor: "transparent",
                            mt: 2,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}