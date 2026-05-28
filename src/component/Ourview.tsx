import { Box, Typography, Container, Skeleton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import CMSservice from "../service/cms.service";
import { getImageUrl } from "../utils/imageUtils";

export default function OurView() {
    const [certImages, setCertImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getImages = async () => {
        setLoading(true);
        try {
            const res = await CMSservice.getCertificate();
            if (res) {
                setCertImages(res?.data?.data);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
    };

    return (
        <Box
            sx={{
                position: "relative",
                py: { xs: 6, md: 10 },
                bgcolor: "secondary.dark",
                backgroundImage: `
                    url(https://sourceseas.itcoders.in/img/video-bg.jpg)
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Container
                sx={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: { xs: 5, md: 8 },
                        alignItems: "center",
                    }}
                >
                    <Box textAlign="center">
                        <Typography
                            sx={{
                                color: "primary.light",
                                fontWeight: 800,
                                mb: 1,
                                fontSize: {
                                    xs: "28px",
                                    sm: "22px",
                                    md: "26px",
                                    lg: "30px",
                                },
                            }}
                        >
                            Certifications and Accreditation
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.72)",
                                fontSize: { xs: "14px", md: "15px" },
                                mb: 4,
                            }}
                        >
                            Recognitions that reflect our commitment to trusted trade services.
                        </Typography>

                        <Box
                            sx={{
                                maxWidth: { xs: "290px", sm: "370px", md: "460px" },
                                mx: "auto",
                                bgcolor: "background.paper",
                                p: { xs: 1.2, sm: 1.5 },
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 20px 45px rgba(0,0,0,0.28)",
                                "& .slick-dots": {
                                    bottom: "-34px",
                                },
                                "& .slick-dots li button:before": {
                                    color: "#E8D8C1",
                                    opacity: 0.6,
                                    fontSize: "9px",
                                },
                                "& .slick-dots li.slick-active button:before": {
                                    color: "#A77B58",
                                    opacity: 1,
                                },
                                "& .slick-prev, & .slick-next": {
                                    zIndex: 5,
                                    width: 34,
                                    height: 34,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(167, 123, 88, 0.9)",
                                    transition: "0.25s",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                },
                                "& .slick-prev": {
                                    left: "-10px",
                                },
                                "& .slick-next": {
                                    right: "-10px",
                                },
                                "& .slick-prev:before, & .slick-next:before": {
                                    fontSize: "18px",
                                    opacity: 1,
                                    color: "#fff",
                                },
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={299}
                                    sx={{
                                        borderRadius: 3,
                                        bgcolor: "primary.light",
                                    }}
                                />
                            ) : (
                                <Slider {...sliderSettings}>
                                    {certImages.map((img, index) => (
                                        <Box key={index} sx={{ outline: "none" }}>
                                            <Box
                                                component="img"
                                                src={getImageUrl(img?.image)}
                                                alt={`cert-${index}`}
                                                sx={{
                                                    width: "100%",
                                                    height: { xs: "240px", sm: "299px" },
                                                    objectFit: "contain",
                                                    display: "block",
                                                    borderRadius: 3,
                                                    bgcolor: "background.paper",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Slider>
                            )}
                        </Box>
                    </Box>

                    <Box textAlign="center">
                        <Typography
                            sx={{
                                color: "primary.light",
                                fontWeight: 800,
                                mb: 1,
                                fontSize: {
                                    xs: "28px",
                                    sm: "22px",
                                    md: "26px",
                                    lg: "30px",
                                },
                            }}
                        >
                            Our YouTube Channel
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.72)",
                                fontSize: { xs: "14px", md: "15px" },
                                mb: 4,
                            }}
                        >
                            Watch our updates, insights, and company stories.
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "520px",
                                mx: "auto",
                                aspectRatio: "16/9",
                                overflow: "hidden",
                                borderRadius: 4,
                                border: "1px solid rgba(232, 216, 193, 0.28)",
                                boxShadow: "0 20px 45px rgba(0,0,0,0.32)",
                                bgcolor: "background.paper",
                                p: 1,
                            }}
                        >
                            <Box
                                component="iframe"
                                src="https://www.youtube.com/embed/zFd9B9PR4Bw"
                                title="YouTube video player"
                                allowFullScreen
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                    borderRadius: 3,
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}