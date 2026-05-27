import { Box, Skeleton, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getImageUrl } from "../utils/imageUtils";

type CardSlider = {
    cardImages: Images[];
    loading: boolean;
    title: string;
    description?: string;
};

type Images = {
    image: string;
};

export default function CardImageSlider({
    cardImages,
    loading,
    title,
    description,
}: CardSlider) {
    const sliderSettings = {
        dots: true,
        infinite: cardImages?.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: cardImages?.length > 1,
        autoplaySpeed: 2500,
        arrows: cardImages?.length > 1,
        adaptiveHeight: false,
    };

    return (
        <Box
            sx={{
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
                <Typography
                    sx={{
                        color: "secondary.main",
                        fontWeight: 800,
                        mb: 1,
                        fontSize: {
                            xs: "24px",
                            sm: "26px",
                            md: "30px",
                        },
                        textTransform: "capitalize",
                    }}
                >
                    {title}
                </Typography>

                {description && (
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: { xs: "14px", md: "15px" },
                            maxWidth: 420,
                            mx: "auto",
                            lineHeight: 1.7,
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 420, md: 500 },
                    mx: "auto",
                    bgcolor: "background.paper",
                    p: { xs: 1.2, sm: 1.5 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
                    overflow: "hidden",

                    "& .slick-slider": {
                        width: "100%",
                    },

                    "& .slick-list": {
                        borderRadius: 3,
                    },

                    "& .slick-slide > div": {
                        lineHeight: 0,
                    },

                    "& .slick-dots": {
                        bottom: "-30px",
                    },

                    "& .slick-dots li": {
                        mx: 0,
                    },

                    "& .slick-dots li button:before": {
                        color: "#A77B58",
                        opacity: 0.35,
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
                        bgcolor: "rgba(167, 123, 88, 0.92)",
                        transition: "0.25s",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    },

                    "& .slick-prev": {
                        left: { xs: 6, sm: -12 },
                    },

                    "& .slick-next": {
                        right: { xs: 6, sm: -12 },
                    },

                    "& .slick-prev:before, & .slick-next:before": {
                        fontSize: "17px",
                        opacity: 1,
                        color: "#fff",
                    },
                }}
            >
                {loading ? (
                    <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={299}
                        sx={{
                            borderRadius: 3,
                        }}
                    />
                ) : cardImages?.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {cardImages.map((img, index) => (
                            <Box key={index} sx={{ outline: "none" }}>
                                <Box
                                    component="img"
                                    src={getImageUrl(img?.image)}
                                    alt={`${title}-${index}`}
                                    sx={{
                                        width: "100%",
                                        height: {
                                            xs: "230px",
                                            sm: "280px",
                                            md: "320px",
                                        },
                                        objectFit: "contain",
                                        display: "block",
                                        borderRadius: 3,
                                        bgcolor: "background.paper",
                                    }}
                                />
                            </Box>
                        ))}
                    </Slider>
                ) : (
                    <Box
                        sx={{
                            height: {
                                xs: "230px",
                                sm: "280px",
                                md: "320px",
                            },
                            borderRadius: 3,
                            bgcolor: "background.default",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 2,
                        }}
                    >
                        <Typography color="text.secondary">
                            No images available.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}