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
            const res = await CMSservice.getCertificate()
            if (res) {
                setCertImages(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getImages()
    }, [])

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
                mt: { xs: 6, md: 10 },
                py: { xs: 6, md: 10 },
                backgroundImage:
                    "url(https://sourceseas.itcoders.in/img/video-bg.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    zIndex: 1,
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: { xs: 5, md: 8 },
                        alignItems: "center",
                    }}
                >

                    <Box textAlign="center">
                        <Typography
                            sx={{
                                color: "#6fbf4a",
                                fontWeight: 700,
                                mb: 4,
                                fontSize: {
                                    xs: "22px",
                                    sm: "26px",
                                    md: "30px",
                                    lg: "34px",
                                },
                            }}
                        >
                            Certifications and Accreditation
                        </Typography>

                        <Box
                            sx={{
                                maxWidth: { xs: "280px", sm: "350px", md: "450px" },
                                mx: "auto",
                                bgcolor: "white",
                                p: 1,
                                borderRadius: 2,
                                boxShadow: 3
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="rectangular" width="100%" height={299} sx={{ borderRadius: 2 }} />
                            ) : (
                                <Slider {...sliderSettings}>
                                    {certImages.map((img, index) => (
                                        <Box key={index} sx={{ outline: 'none' }}>
                                            <Box
                                                component="img"
                                                src={getImageUrl(img?.image)}
                                                alt={`cert-${index}`}
                                                sx={{
                                                    width: "100%",
                                                    height: "299px",
                                                    objectFit: "contain",
                                                    display: "block",
                                                    borderRadius: 2,
                                                    bgcolor: 'white'
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
                                color: "#6fbf4a",
                                fontWeight: 700,
                                mb: 4,
                                fontSize: {
                                    xs: "22px",
                                    sm: "26px",
                                    md: "30px",
                                    lg: "34px",
                                },
                            }}
                        >
                            Our YouTube Channel
                        </Typography>

                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                maxWidth: "500px",
                                mx: "auto",
                                aspectRatio: "16/9",
                                overflow: "hidden",
                                boxShadow: 3,
                            }}
                        >
                            <iframe
                                src="https://www.youtube.com/embed/zFd9B9PR4Bw"
                                title="YouTube video player"
                                allowFullScreen
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                            />
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
}