import { Box, IconButton, Skeleton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { getImageUrl } from "../utils/imageUtils"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface SlideData {
    id: number
    image: string
}

function NextArrow(props: any) {
    const { onClick } = props;
    return (
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
            onClick={onClick}
        >
            <ChevronRight />
        </IconButton>
    );
}

function PrevArrow(props: any) {
    const { onClick } = props;
    return (
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
            onClick={onClick}
        >
            <ChevronLeft />
        </IconButton>
    );
}

export default function ImageSlider({slides,loading}: { slides: SlideData[]; loading: boolean }) {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        pauseOnHover: true,
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                bgcolor: "#f8f9fa",
            }}
        >
            {loading ? (
                <Skeleton animation="wave" variant="rectangular" width="100%" sx={{ height: { xs: 250, sm: 350, md: 500, lg: 600 } }} />
            ) : (
                <Slider {...settings}>
                    {slides.map((slide) => (
                        <Box key={slide.id}>
                            <Box
                                component="img"
                                src={getImageUrl(slide?.image)}
                                alt={`Slide ${slide?.id}`}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    maxHeight: { xs: 250, sm: 350, md: 500, lg: 600 },
                                    objectFit: "contain",
                                    display: "block",
                                    margin: "0 auto",
                                }}
                            />
                        </Box>
                    ))}
                </Slider>
            )}
        </Box>
    )
}
