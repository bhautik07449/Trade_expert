import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getImageUrl } from "../utils/imageUtils";
import { useState } from "react";
import LabelTitle from "./labelTitle";

type CardSlider = {
    cardImages: Images[];
    loading: boolean;
    title: string;
    label: string;
    description?: string;
};

type Images = {
    image: string;
};

const IMAGE_HEIGHT = {
    xs: 220,
    sm: 280,
    md: 320,
    lg: 360,
};

export default function CardImageSlider({
    cardImages,
    loading,
    title,
    label,
    description,
}: CardSlider) {
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const hasMultipleImages = cardImages?.length > 1;

    const sliderSettings = {
        dots: hasMultipleImages,
        infinite: hasMultipleImages,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: hasMultipleImages,
        autoplaySpeed: 2500,
        arrows: hasMultipleImages,
        adaptiveHeight: false,
        lazyLoad: "ondemand" as const,
    };

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    mb: { xs: 2, sm: 2.5, md: 3 },
                    px: { xs: 1, sm: 0 },
                }}
            >
                <LabelTitle title={title} label={label} />

                {description && (
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: {
                                xs: "13.5px",
                                sm: "14px",
                                md: "15px",
                            },
                            maxWidth: 440,
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
                    maxWidth: {
                        xs: "100%",
                        sm: 520,
                        md: "100%",
                        lg: 560,
                    },
                    mx: "auto",
                    bgcolor: "background.paper",
                    p: { xs: 1, sm: 1.25, md: 1.5 },
                    borderRadius: { xs: 3, md: 4 },
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: {
                        xs: "0 10px 26px rgba(59,48,39,0.08)",
                        md: "0 18px 45px rgba(59,48,39,0.12)",
                    },
                    overflow: "visible",
                    minWidth: 0,

                    "& .slick-slider": {
                        width: "100%",
                        minWidth: 0,
                    },

                    "& .slick-list": {
                        borderRadius: { xs: 2.5, md: 3 },
                        overflow: "hidden",
                    },

                    "& .slick-track": {
                        display: "flex",
                        alignItems: "stretch",
                    },

                    "& .slick-slide": {
                        height: "auto",
                    },

                    "& .slick-slide > div": {
                        height: "100%",
                        lineHeight: 0,
                    },

                    "& .slick-dots": {
                        bottom: { xs: "-28px", sm: "-32px" },
                    },

                    "& .slick-dots li": {
                        mx: -0.2,
                    },

                    "& .slick-dots li button:before": {
                        color: "#A77B58",
                        opacity: 0.35,
                        fontSize: { xs: "8px", sm: "9px" },
                    },

                    "& .slick-dots li.slick-active button:before": {
                        color: "#A77B58",
                        opacity: 1,
                    },

                    "& .slick-prev, & .slick-next": {
                        zIndex: 5,
                        width: { xs: 30, sm: 34, md: 38 },
                        height: { xs: 30, sm: 34, md: 38 },
                        borderRadius: "50%",
                        bgcolor: "rgba(167, 123, 88, 0.92)",
                        boxShadow: "0 8px 20px rgba(59,48,39,0.18)",
                        transition: "0.25s ease",
                        display: { xs: "none !important", sm: "block" },

                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    },

                    "& .slick-prev": {
                        left: { sm: 8, md: -14, lg: -18 },
                    },

                    "& .slick-next": {
                        right: { sm: 8, md: -14, lg: -18 },
                    },

                    "& .slick-prev:before, & .slick-next:before": {
                        fontSize: { sm: "16px", md: "18px" },
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
                        sx={{
                            borderRadius: { xs: 2.5, md: 3 },
                            height: {
                                xs: `${IMAGE_HEIGHT.xs}px`,
                                sm: `${IMAGE_HEIGHT.sm}px`,
                                md: `${IMAGE_HEIGHT.md}px`,
                                lg: `${IMAGE_HEIGHT.lg}px`,
                            },
                        }}
                    />
                ) : cardImages?.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {cardImages.map((img, index) => (
                            <Box key={index} sx={{ outline: "none" }}>
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: "100%",
                                        height: {
                                            xs: `${IMAGE_HEIGHT.xs}px`,
                                            sm: `${IMAGE_HEIGHT.sm}px`,
                                            md: `${IMAGE_HEIGHT.md}px`,
                                            lg: `${IMAGE_HEIGHT.lg}px`,
                                        },
                                        borderRadius: { xs: 2.5, md: 3 },
                                        overflow: "hidden",
                                        bgcolor: "background.default",
                                    }}
                                >
                                    {!loadedImages[index] && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                inset: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                bgcolor: "background.default",
                                                zIndex: 2,
                                            }}
                                        >
                                            <CircularProgress
                                                size={34}
                                                thickness={4}
                                                sx={{ color: "primary.main" }}
                                            />
                                        </Box>
                                    )}

                                    <Box
                                        component="img"
                                        src={getImageUrl(img?.image)}
                                        alt={`${title}-${index}`}
                                        onLoad={() => handleImageLoad(index)}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                            display: "block",
                                            opacity: loadedImages[index] ? 1 : 0,
                                            transition: "opacity 0.35s ease-in-out",
                                            imageRendering: "auto",
                                            backfaceVisibility: "hidden",
                                            transform: "translateZ(0)",
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                ) : (
                    <Box
                        sx={{
                            height: {
                                xs: `${IMAGE_HEIGHT.xs}px`,
                                sm: `${IMAGE_HEIGHT.sm}px`,
                                md: `${IMAGE_HEIGHT.md}px`,
                                lg: `${IMAGE_HEIGHT.lg}px`,
                            },
                            borderRadius: { xs: 2.5, md: 3 },
                            bgcolor: "background.default",
                            border: "1px dashed",
                            borderColor: "divider",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 2,
                        }}
                    >
                        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                            No images available.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}