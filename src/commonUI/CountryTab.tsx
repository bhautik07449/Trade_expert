import { Paper, Tab, Tabs, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../service/homepages.service";

type CountryTabProps = {
    activeCountry: string;
    setActiveCountry: (country: string) => void;
};

export default function CountryTab({
    activeCountry,
    setActiveCountry,
}: CountryTabProps) {
    const [country, setCountry] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const getPresencesData = async () => {
        try {
            setLoading(true);
            const response = await HomePageservice.getPresences();

            if (response) {
                const countries = response?.data?.countries || [];
                setCountry(countries);

                if (countries.length > 0 && !activeCountry) {
                    setActiveCountry(countries[0]);
                }
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Presences data not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPresencesData();
    }, []);

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 5,
                p: 1,
                bgcolor: "transparent",
                boxShadow: "none",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "flex-start", md: "center" },
                            gap: 1,
                        }}
                    >
                        {[...Array(6)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rounded"
                                animation="wave"
                                width={110}
                                height={44}
                                sx={{ borderRadius: 2, flexShrink: 0 }}
                            />
                        ))}
                    </Box>
                ) : (
                    <Tabs
                        value={activeCountry || false}
                        onChange={(_, value) => setActiveCountry(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="country tabs"
                        sx={{
                            minHeight: 52,

                            "& .MuiTabs-scroller": {
                                overflowX: "auto !important",
                                overflowY: "hidden",
                                scrollBehavior: "smooth",
                                scrollbarWidth: "none",
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            },

                            "& .MuiTabs-indicator": {
                                display: "none",
                            },

                            "& .MuiTabs-flexContainer": {
                                gap: 1,
                                justifyContent: {
                                    xs: "flex-start",
                                    md: "center",
                                },
                                flexWrap: "nowrap",
                            },

                            "& .MuiTabs-scrollButtons": {
                                color: "secondary.main",
                                width: 34,
                                "&.Mui-disabled": {
                                    opacity: 0.25,
                                },
                            },

                            "& .MuiTab-root": {
                                minHeight: 44,
                                minWidth: "auto",
                                px: { xs: 2.2, sm: 3 },
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                                color: "text.secondary",
                                border: "1px solid",
                                borderColor: "divider",
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            },

                            "& .MuiTab-root:hover": {
                                bgcolor: "primary.light",
                                color: "secondary.dark",
                            },

                            "& .Mui-selected": {
                                bgcolor: "primary.main",
                                color: "#fff !important",
                                borderColor: "primary.main",
                            },
                        }}
                    >
                        {country.map((countryName) => (
                            <Tab
                                key={countryName}
                                label={countryName}
                                value={countryName}
                            />
                        ))}
                    </Tabs>
                )}
            </Box>
        </Paper>
    );
}