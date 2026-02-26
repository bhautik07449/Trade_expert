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
                py: { xs: 5, sm: 6, md: 10 },
            }}
        >
            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: { xs: 5, sm: 6, md: 10 },
                    px: { xs: 2, sm: 3, md: 2 },
                    alignItems: "center",
                }}
            >
                {/* ABOUT US */}
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#7cb342",
                            fontWeight: 600,
                            mb: 3,
                            fontSize: { xs: "26px", sm: "30px", md: "34px" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        About Us
                    </Typography>

                    {[1, 2, 3, 4].map((_, i) => (
                        <Typography
                            key={i}
                            sx={{
                                mb: 2,
                                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                                lineHeight: 1.9,
                                color: "#555",
                                textAlign: { xs: "center", md: "left" },
                            }}
                        >
                            {i === 0 &&
                                "At Sourceseas Overseas, we continuously work towards improving and raising the standards of agricultural and food exports from India to the world. Quality is what we love, and it is what we deliver."}
                            {i === 1 &&
                                "We collaborate directly with farmers, agro producers, and food processors across India, making us unique in our domain. We serve seasonal crops and extend availability for a wide range of agricultural products."}
                            {i === 2 &&
                                "Our utmost priority is quality assurance. Every product is inspected under APEDA guidelines to ensure pesticide-free exports."}
                            {i === 3 &&
                                "With strong process knowledge and a talented team, Sourceseas Overseas is rapidly expanding globally. We would be happy to associate with you."}
                        </Typography>
                    ))}
                </Box>

                {/* TESTIMONIALS */}
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#7cb342",
                            fontWeight: 600,
                            mb: 4,
                            textAlign: "center",
                            fontSize: { xs: "26px", sm: "30px", md: "34px" },
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
                            <Box key={index} sx={{ px: { xs: 0, sm: 2 } }}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        p: { xs: 2, sm: 3, md: 4 },
                                        borderRadius: 3,
                                        textAlign: "center",
                                        position: "relative",
                                        bgcolor: "#ffffff",
                                        maxWidth: { xs: "100%", sm: 500 },
                                        mx: "auto",
                                    }}
                                >
                                    <FormatQuoteIcon
                                        sx={{
                                            fontSize: { xs: 40, md: 60 },
                                            color: "#7cb342",
                                            opacity: 0.15,
                                            position: "absolute",
                                            top: 15,
                                            left: 15,
                                        }}
                                    />

                                    <Avatar
                                        src={item.image}
                                        alt={item.name}
                                        sx={{
                                            width: { xs: 70, sm: 90, md: 100 },
                                            height: { xs: 70, sm: 90, md: 100 },
                                            mx: "auto",
                                            mb: 2,
                                            border: "4px solid #f5f1ec",
                                        }}
                                    />

                                    <Typography
                                        sx={{
                                            mb: 3,
                                            lineHeight: 1.8,
                                            fontStyle: "italic",
                                            fontSize: { xs: "13px", sm: "14px" },
                                            color: "#666",
                                        }}
                                    >
                                        "{item.text}"
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: "#333",
                                            fontSize: { xs: "14px", sm: "16px" },
                                        }}
                                    >
                                        {item.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: "12px", sm: "14px" },
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