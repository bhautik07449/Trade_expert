import {
    Box,
    Grid,
    Typography,
    Chip,
    Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../service/homepages.service";
import LabelTitle from "../commonUI/labelTitle";
import NoDataFound from "../commonUI/NoDataFound";

export default function Eventsection({ country }: any) {
    const [eventsData, setEventsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getEventsData = async (country: string) => {
        if (!country) return;

        try {
            setLoading(true);
            const response = await HomePageservice.getEvents(country);

            if (response) {
                setEventsData(response?.data?.data || []);
            }
        } catch (error: any) {
            setEventsData([]);
            console.log(error?.response?.data?.message || "event data not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEventsData(country);
    }, [country]);

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 },
                bgcolor: "background.default",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px", mx: "auto",
                    boxSizing: "border-box",
                    mb: 4,
                }}
            >
                <LabelTitle title="Trade" label="Events" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "680px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    Stay updated with the latest trade events, expos, and industry gatherings happening around the world.
                </Typography>

                <Box sx={{ width: '100%' }}>
                    {loading ? (
                        <Grid container spacing={3.5}>
                            {[...Array(6)].map((_, index) => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        height={150}
                                        sx={{
                                            borderRadius: 3,
                                            boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Grid container spacing={3}>
                            {(Array.isArray(eventsData) ? eventsData : []).map((item, index) => (
                                <Grid size={{ xs: 12 }} key={index}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            borderRadius: 1,
                                            overflow: "hidden",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            backgroundColor: "background.paper",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                            transition: "all 0.3s ease",
                                            height: "100%",
                                            minHeight: "200px",
                                            "&:hover": {
                                                boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
                                                transform: "translateY(-3px)",
                                                borderColor: 'primary.main',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: { xs: 110, sm: 250 },
                                                minWidth: { xs: 110, sm: 250 },
                                                flexShrink: 0,
                                                position: "relative",
                                                overflow: "hidden",
                                                background: "primary.dark",
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={item?.image}
                                                alt={item?.title}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                    transition: "transform 0.4s ease",
                                                    "&:hover": {
                                                        transform: "scale(1.06)",
                                                    },
                                                }}
                                            />

                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(to right, rgba(0,0,0,0.18), transparent)",
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        </Box>

                                        <Box
                                            sx={{
                                                p: { xs: 1.5, sm: 2 },
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                flex: 1,
                                                gap: 0.75,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <Box>
                                                <Chip
                                                    label={item?.tag}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: "0.68rem",
                                                        height: 22,
                                                        mb: 0.75,
                                                        borderRadius: "6px",
                                                    }}
                                                />
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={700}
                                                    sx={{
                                                        fontSize: { xs: "0.82rem", sm: "0.92rem" },
                                                        lineHeight: 1.35,
                                                        mb: 0.5,
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                    }}
                                                >
                                                    {item?.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        fontSize: "0.75rem",
                                                        lineHeight: 1.5,
                                                        overflow: "hidden",
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                    }}
                                                >
                                                    {item?.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>

                {!loading && country && eventsData.length === 0 && (
                    <NoDataFound message="No Events found for this country." />
                )}
            </Box>
        </Box>
    );
}