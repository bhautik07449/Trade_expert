import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Skeleton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";
import LabelTitle from "../../commonUI/labelTitle";
import NoDataFound from "../../commonUI/NoDataFound";

type MultilingualTile = {
    image: string;
    title: string;
    description: string;
};

type MultilingualProps = {
    multilingualTiles: MultilingualTile[];
    loading?: boolean;
};

export default function Multilingual({
    multilingualTiles,
    loading = false,
}: MultilingualProps) {
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const handleScroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollBy({
            left: direction === "left" ? -340 : 340,
            behavior: "smooth",
        });
    };

    return (
        <Box sx={{ mb: 7, position: "relative" }}>
            <LabelTitle title="Material" label="Ministerial" />

            <Box sx={{ position: "relative", mt: 3 }}>
                {!loading && multilingualTiles.length > 0 && (
                    <IconButton
                        onClick={() => handleScroll("left")}
                        sx={{
                            position: "absolute",
                            left: { xs: -6, md: -20 },
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            bgcolor: "background.paper",
                            color: "secondary.main",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 8px 20px rgba(62,49,38,0.15)",
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "secondary.dark",
                            },
                        }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                )}

                <Box
                    ref={sliderRef}
                    sx={{
                        display: "flex",
                        gap: 3,
                        overflowX: "auto",
                        scrollBehavior: "smooth",
                        px: { xs: 1, md: 2 },
                        py: 1,
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    {loading
                        ? [...Array(4)].map((_, index) => (
                            <Card
                                key={index}
                                elevation={0}
                                sx={{
                                    flex: "0 0 auto",
                                    width: { xs: "82%", sm: 320, md: 340 },
                                    height: 340,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    bgcolor: "background.paper",
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    height={160}
                                />
                                <CardContent sx={{ textAlign: "center" }}>
                                    <Skeleton
                                        animation="wave"
                                        height={32}
                                        width="80%"
                                        sx={{ mx: "auto", mb: 1 }}
                                    />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton
                                        animation="wave"
                                        width="70%"
                                        sx={{ mx: "auto" }}
                                    />
                                </CardContent>
                            </Card>
                        ))
                        :(Array.isArray(multilingualTiles) ? multilingualTiles : []).map((item, index) => (
                            <Card
                                key={index}
                                elevation={0}
                                sx={{
                                    flex: "0 0 auto",
                                    width: { xs: "82%", sm: 320, md: 340 },
                                    height: 340,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    bgcolor: "background.paper",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{
                                        height: 160,
                                        objectFit: "cover",
                                        flexShrink: 0,
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        textAlign: "center",
                                        height: 180,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 700,
                                            mb: 1,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "14px",
                                            lineHeight: 1.7,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                </Box>

                {!loading && multilingualTiles.length > 0 && (
                    <IconButton
                        onClick={() => handleScroll("right")}
                        sx={{
                            position: "absolute",
                            right: { xs: -6, md: -20 },
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            bgcolor: "background.paper",
                            color: "secondary.main",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 8px 20px rgba(62,49,38,0.15)",
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "secondary.dark",
                            },
                        }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                )}

                {!loading && multilingualTiles.length === 0 && (
                    <NoDataFound message="No Multilingual Title found for this country." />
                )}
            </Box>
        </Box>
    );
}