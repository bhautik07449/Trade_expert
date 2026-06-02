import { Paper, Tab, Tabs, Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../service/homepages.service";

type CategoryTabProps = {
    country: string;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
};

type Category = {
    id: number;
    name: string;
};

export default function CategoryTabview({
    country,
    activeCategory,
    setActiveCategory,
}: CategoryTabProps) {
    const [category, setCategory] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async (country: string) => {
            try {
                setLoading(true);

                const res = await HomePageservice.getCategoriesByCountry(country);

                if (res) {
                    const categoryData = res?.data || [];
                    setCategory(categoryData);

                    if (categoryData.length > 0) {
                        setActiveCategory(String(categoryData[0].id));
                    } else {
                        setActiveCategory("");
                    }
                }
            } catch (error: any) {
                console.log(error?.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (country) {
            setActiveCategory("");
            getCategories(country);
        }
    }, [country, setActiveCategory]);

    return (
        <Paper
            elevation={0}
            sx={{
                mb: 5,
                maxWidth: "1400px",
                mx: "auto",
                px: { xs: 2, sm: 3, md: 4 },
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
                        value={activeCategory || false}
                        onChange={(_, value) => setActiveCategory(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="category tabs"
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
                        {category.map((item) => (
                            <Tab
                                key={item.id}
                                label={item.name}
                                value={String(item.id)}
                            />
                        ))}
                    </Tabs>
                )}
            </Box>
        </Paper>
    );
}