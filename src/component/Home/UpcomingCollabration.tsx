import { useEffect, useState } from "react";
import {
    Box,
    Card,
    IconButton,
    Skeleton,
    useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import LabelTitle from "../../commonUI/labelTitle";
import { getImageUrl } from "../../utils/imageUtils";
import HomePageservice from "../../service/homepages.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

type UpcomingCollaboration = {
    image: string,
    url: string
}

export default function UpcomingCollabration({ visiblecard = 4 }: { visiblecard?: number }) {
    const theme = useTheme();
    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";

    const [data, setData] = useState<UpcomingCollaboration[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentStartIndex, setCurrentStartIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(visiblecard)

    const getUpcomingCollaboration = async (country?:string) => {
        try {
            setLoading(true)
            const res = await HomePageservice.getUpcomingCollaboration(country)
            if (res) {
                setData(res?.data?.data || [])
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUpcomingCollaboration(activeCountry)
    }, [activeCountry])

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth
            if (width < 600) setVisibleCards(1)
            else if (width < 900) setVisibleCards(2)
            else if (width < 1200) setVisibleCards(3)
            else setVisibleCards(visiblecard)
        }

        updateVisibleCards()
        window.addEventListener("resize", updateVisibleCards)
        return () => window.removeEventListener("resize", updateVisibleCards)
    }, [visiblecard])

    const handleNext = () => {
        if (currentStartIndex + visibleCards < data.length) {
            setCurrentStartIndex(currentStartIndex + 1)
        }
    }

    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex(currentStartIndex - 1)
        }
    }

    return (
        <Box
            sx={{
                bgcolor: "white",
                color: "text.primary",
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
            }}
        >
            <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
                <LabelTitle title="Upcoming" label="Collaboration" tagLine="Discover the latest collaborative initiatives and upcoming partnerships in the trading world." />

                <Box sx={{ position: "relative", overflow: "hidden" }}>
                    {!loading && data.length > visibleCards && (
                        <>
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    left: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 3,
                                    bgcolor: "#f5f5f5",
                                    "&:hover": { backgroundColor: "#e0e0e0" },
                                }}
                                onClick={handlePrev}
                                disabled={currentStartIndex === 0}
                            >
                                <ChevronLeft />
                            </IconButton>

                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 3,
                                    bgcolor: "#f5f5f5",
                                    "&:hover": { backgroundColor: "#e0e0e0" },
                                }}
                                onClick={handleNext}
                                disabled={currentStartIndex + visibleCards >= data.length}
                            >
                                <ChevronRight />
                            </IconButton>
                        </>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                            width: loading ? "100%" : `${data.length > 0 ? (data.length / visibleCards) * 100 : 100}%`,
                            transform: loading ? "translateX(0)" : `translateX(-${data.length > 0 ? (currentStartIndex * 100) / data.length : 0}%)`,
                        }}
                    >
                        {loading ? (
                            Array.from({ length: visibleCards }).map((_, index) => (
                                <Box
                                    key={`skeleton-${index}`}
                                    sx={{
                                        width: `${100 / visibleCards}%`,
                                        flexShrink: 0,
                                        px: { xs: 0.75, sm: 1, md: 1.5 },
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            height: "100%",
                                            minHeight: { xs: 180, sm: 180, md: 180 },
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: "background.paper",
                                            borderRadius: { xs: 2, md: 3 }
                                        }}
                                    >
                                        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ minHeight: 180 }} animation="wave" />
                                    </Card>
                                </Box>
                            ))
                        ) : data.length > 0 ? (
                            data.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: `${100 / data.length}%`,
                                        flexShrink: 0,
                                        px: { xs: 0.75, sm: 1, md: 1.5 },
                                        boxSizing: "border-box",
                                        cursor: item.url ? "pointer" : "default",
                                    }}
                                    onClick={() => {
                                        if (item.url) {
                                            window.open(item.url, "_blank");
                                        }
                                    }}
                                >
                                    <Card
                                        elevation={0}
                                        sx={{
                                            height: "100%",
                                            minHeight: { xs: 180, sm: 180, md: 180 },
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: "background.paper",
                                            borderRadius: { xs: 2, md: 3 },
                                            "&:hover": item.url ? {
                                                boxShadow: theme.shadows[4],
                                                transition: "box-shadow 0.3s ease-in-out"
                                            } : {}
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={getImageUrl(item.image)}
                                            alt="image"
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                                display: "block",
                                                transition: "opacity 0.35s ease-in-out",
                                                imageRendering: "auto",
                                                backfaceVisibility: "hidden",
                                                transform: "translateZ(0)",
                                            }}
                                        />
                                    </Card>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ width: "100%", textAlign: "center", py: 4, color: "text.secondary" }}>
                                No upcoming collaborations at the moment.
                            </Box>
                        )}
                    </Box>
                </Box>

            </Box>
        </Box >
    );
}