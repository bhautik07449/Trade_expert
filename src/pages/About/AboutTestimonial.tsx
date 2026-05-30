import { Box, Typography, Avatar, Paper, MobileStepper, Skeleton } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Homeservice from "../../service/home.service";
import { getImageUrl } from "../../utils/imageUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";

interface Client {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    image: string
    status: string
}

interface Testimonial {
    id: number
    review: string
    status: string
    client: Client
}

export default function AboutTestimonial() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(true)
    const maxSteps = testimonials.length;

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("about_us"));
    }, [dispatch]);

    const getTestimonials = async () => {
        setLoading(true)
        try {
            const res = await Homeservice.getTestimonial()
            if (res) {
                setTestimonials(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTestimonials()
    }, [])

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
                py: { xs: 6, md: 10 },
                width: "100%",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: { xs: 5, md: 8 },
                    px: { xs: 2, sm: 3, md: 4 },
                    alignItems: "center",
                    boxSizing: "border-box",
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

                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" height={34} width="40%" sx={{ mb: 3 }} />
                            {[1, 2, 3, 4].map((_, i) => (
                                <Skeleton key={i} variant="text" height={20} sx={{ mb: 1 }} />
                            ))}
                        </>
                    ) : (
                        <Typography
                            sx={{
                                mb: 2,
                                fontSize: { xs: "13px", sm: "14px", md: "15px" },
                                lineHeight: 1.9,
                                color: "#555",
                                textAlign: { xs: "center", md: "left" },
                            }}
                            dangerouslySetInnerHTML={{
                                __html: pageDetail?.content || null,
                            }}
                        />
                    )}
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

                    {loading ? (
                        <Box sx={{ px: { xs: 0, sm: 2 } }}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: { xs: 2, sm: 3, md: 4 },
                                    borderRadius: 3,
                                    textAlign: "center",
                                    bgcolor: "#ffffff",
                                    maxWidth: { xs: "100%", sm: 500 },
                                    mx: "auto",
                                }}
                            >
                                <Skeleton variant="circular" width={100} height={100} sx={{ mx: "auto", mb: 2 }} />
                                <Skeleton variant="text" height={80} sx={{ mb: 2 }} />
                                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
                            </Paper>
                        </Box>
                    ) : (
                        <Box sx={{ overflow: "hidden", width: "100%" }}>
                            <SwipeableViews
                                index={activeStep}
                                onChangeIndex={(index) => setActiveStep(index)}
                                enableMouseEvents
                                style={{ width: "100%" }}
                                containerStyle={{ width: "100%" }}
                                slideStyle={{ padding: 0, minHeight: "auto", width: "100%" }}
                            >
                                {testimonials.map((item, index) => (
                                    <Box key={index} sx={{ width: "100%", px: { xs: 0, sm: 2 }, boxSizing: "border-box", display: "flex", justifyContent: "center" }}>
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                width: "100%",
                                                maxWidth: { xs: "100%", sm: 500 },
                                                p: { xs: 2, sm: 3, md: 4 },
                                                my: 2,
                                                borderRadius: 3,
                                                textAlign: "center",
                                                position: "relative",
                                                bgcolor: "#ffffff",
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
                                                src={getImageUrl(item?.client?.image)}
                                                alt=""
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
                                                "{item?.review}"
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#333",
                                                    fontSize: { xs: "14px", sm: "16px" },
                                                }}
                                            >
                                                {item?.client?.first_name + " " + item?.client?.last_name}
                                            </Typography>

                                            {/* <Typography
                                        sx={{
                                            fontSize: { xs: "12px", sm: "14px" },
                                            color: "#888",
                                            mt: 1,
                                        }}
                                    >
                                        {item.role}
                                    </Typography> */}
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
                    )}
                </Box>
            </Box>
        </Box>
    );
}