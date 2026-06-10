import { Box, Chip, Grid, Skeleton, Typography, Paper } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import LabelTitle from "../../commonUI/labelTitle";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import { useSelector } from "react-redux";
import NoDataFound from "../../commonUI/NoDataFound";

export default function TradeHistory() {
    const [tradeHistory, setTradeHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const getTradeHistory = async (country: string) => {
        setTradeHistory([]);
        try {
            setLoading(true);
            const res = await HomePageservice.getTradeHistoryByCountry(country);

            if (res) {
                setTradeHistory(res?.data?.data || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Trade history data not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCountry) {
            getTradeHistory(selectedCountry);
        }
    }, [selectedCountry]);

    return (
        <Box
            sx={{
                maxWidth: "1400px",
                mx: "auto",
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                boxSizing: "border-box",
                mb: 4,
            }}
        >
            <LabelTitle title="Trade" label="Important" tagLine={`Explore the historical trade trends and patterns in ${selectedCountry ? selectedCountry : "Global"} to understand market dynamics and identify potential opportunities for growth.`} />

            {loading ? (
                <Grid container spacing={3}>
                    {[...Array(4)].map((_, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Skeleton
                                variant="rounded"
                                height={120}
                                sx={{
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : tradeHistory && tradeHistory.length > 0 ? (
                <Grid container spacing={3}>
                    {(Array.isArray(tradeHistory) ? tradeHistory : []).map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={item?.id || index}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    gap: { xs: 1.5, sm: 2 },
                                    width: "100%",
                                }}
                            >
                                <Typography
                                    sx={{
                                        minWidth: { xs: "auto", sm: 70 },
                                        fontWeight: 700,
                                        fontSize: { xs: "0.85rem", sm: "1rem" },
                                        color: "text.primary",
                                        whiteSpace: { xs: "normal", sm: "nowrap" },
                                        mb: { xs: 0.5, sm: 0 },
                                    }}
                                >
                                    Year : {item?.year}
                                </Typography>

                                <Box
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        width: { sm: 35 },
                                        height: "1px",
                                        backgroundColor: "text.primary",
                                        position: "relative",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            right: -1,
                                            top: "50%",
                                            width: 7,
                                            height: 7,
                                            borderTop: "1px solid",
                                            borderRight: "1px solid",
                                            borderColor: "text.primary",
                                            transform: "translateY(-50%) rotate(45deg)",
                                        },
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        flex: 1,
                                        minHeight: 82,
                                        borderRadius: 1,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        backgroundColor: "#fff",
                                        overflow: "hidden",
                                        width: "100%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flex: 1,
                                            p: { xs: 1, sm: 1.8 },
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            minWidth: 0,
                                        }}
                                    >
                                        <Chip
                                            label={item?.label}
                                            size="small"
                                            sx={{
                                                width: "fit-content",
                                                mb: 0.8,
                                                height: 22,
                                                fontSize: "0.68rem",
                                                fontWeight: 700,
                                                borderRadius: 1,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: "0.82rem", sm: "0.95rem" },
                                                lineHeight: 1.35,
                                                overflow: "hidden",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                            }}
                                        >
                                            {item?.content}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 0.4,
                                                fontSize: "0.75rem",
                                                color: "text.secondary",
                                            }}
                                        >
                                            {item?.country}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: { xs: "100%", sm: 120 },
                                            minWidth: { xs: "100%", sm: 120 },
                                            height: { xs: 140, sm: "auto" },
                                            backgroundColor: "#eee",
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={item?.image}
                                            alt={item?.content || item?.country}
                                            sx={{
                                                width: "100%",
                                                height: { xs: 140, sm: "100%" },
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Paper
                    elevation={0}
                    sx={{
                        maxWidth: 520,
                        mx: "auto",
                        py: 6,
                        px: 3,
                        textAlign: "center",
                        borderRadius: 4,
                        border: "1px dashed",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        boxShadow: "0 10px 30px rgba(59, 48, 39, 0.05)",
                    }}
                >
                    <NoDataFound message="No trade history available" />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Trade history for this country will appear here once available.
                    </Typography>
                </Paper>
            )}
        </Box>
    );
}