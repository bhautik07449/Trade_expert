import { Box, Chip, Grid, Skeleton, Typography } from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";

export default function TradeHistory({ country }: any) {
    const [tradeHistory, setTradeHistory] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const getTradeHistory = async (country: string) => {
        try {
            setLoading(true)
            const res = await HomePageservice.getTradeHistoryByCountry(country)
            if (res) {
                setTradeHistory(res?.data?.data)
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Trade history data not fetch")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (country) {
            getTradeHistory(country)
        }
    }, [country])

    return (
        <>
            {tradeHistory?.length > 0 && (
                <Box
                    sx={{
                        maxWidth: "1200px", mx: "auto",
                        px: { xs: 2, sm: 4, md: 6 },
                        py: { xs: 3, md: 4 },
                        boxSizing: "border-box",
                        mb: 4,
                    }}
                >
                    <LabelTitle title="Trade" label="History" />

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
                        Explore the latest import and export trade data from {country}.
                    </Typography>

                    <Box sx={{ width: '100%' }}>
                        {loading ? (
                            <Grid container spacing={3.5}>
                                {[...Array(6)].map((_, index) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                        <Skeleton
                                            variant="rounded"
                                            height={150}
                                            sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Grid container spacing={3}>
                                {tradeHistory?.map((item, index) => (
                                    <Grid size={{ xs: 12, md: 6, lg: 6 }} key={index}>
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
                                                "&:hover": {
                                                    boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
                                                    transform: "translateY(-3px)",
                                                    borderColor: 'primary.main',
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: { xs: 110, sm: 150 },
                                                    minWidth: { xs: 110, sm: 150 },
                                                    flexShrink: 0,
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    background: "#eee",
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={item?.image}
                                                    alt={item?.country}
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
                                                        label={item?.country}
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
                                                        {item?.content}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            )}
        </>
    )
}