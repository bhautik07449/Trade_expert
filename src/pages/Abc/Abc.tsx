import { Box, Typography, Skeleton, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";
import AbcProductView from "../../commonUI/AbcProductView";

export default function Abc() {
    const [activeCountry, setActiveCountry] = useState("");
    const [activeCategory, setActiveCategory] = useState<Record<number, number>>({})

    const [list, setList] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const getList = async (country: string) => {
        setLoading(true)
        try {
            const res = await CMSservice.getAbc(country)
            if (res) {
                setList(res?.data?.data)
            }
        } catch (error) {
            toast.error("bran not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setActiveCategory({});
    }, [activeCountry]);

    useEffect(() => {
        if (activeCountry) {
            getList(activeCountry)
        }
    }, [activeCountry])

    const handleTabChange = (groupIndex: number, categoryIndex: number) => {
        setActiveCategory((prev) => ({
            ...prev,
            [groupIndex]: categoryIndex,
        }))
    }

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
            <PageMainLayout slug="abc" title="Abc Menus" image="https://sourceseas.itcoders.in/img/my_account_bg1.jpg" country={true} activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 }, pb: { xs: 6, md: 10 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {loading ? (
                    Array.from(new Array(2)).map((_, i) => (
                        <Box key={i} sx={{ mb: 6 }}>
                            <Skeleton variant="rectangular" height={50} sx={{ mb: 6 }} />
                            <Grid container spacing={2}>
                                {Array.from(new Array(3)).map((_, j) => (
                                    <Grid size={{ xs: 12, sm: 4 }} key={j}>
                                        <Skeleton
                                            variant="rectangular"
                                            height={300}
                                            sx={{ borderRadius: 2 }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : list?.length > 0 ? (
                    list?.map((entry: any, entryIndex: number) => {
                        const selectedCategoryIndex = activeCategory[entryIndex] ?? 0;
                        const selectedItem = entry?.item?.[selectedCategoryIndex];

                        return (
                            <Box key={entryIndex} sx={{ mb: 6 }}>
                                {entry?.abc_type?.name && (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 3,
                                            color: "secondary.main",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            letterSpacing: 1,
                                        }}
                                    >
                                        {entry.abc_type.name}
                                    </Typography>
                                )}

                                <Tabs
                                    value={selectedCategoryIndex}
                                    onChange={(_, value) => handleTabChange(entryIndex, value)}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    TabIndicatorProps={{ sx: { display: "none" } }}
                                    sx={{
                                        minHeight: "auto",
                                        mb: 4,

                                        "& .MuiTabs-flexContainer": {
                                            gap: 1.2,
                                            justifyContent: { xs: "flex-start", md: "center" },
                                        },

                                        "& .MuiTab-root": {
                                            minHeight: "auto",
                                            minWidth: "auto",
                                            px: { xs: 1.8, sm: 2.5 },
                                            py: 1,
                                            borderRadius: 99,
                                            textTransform: "none",
                                            fontWeight: 800,
                                            color: "text.secondary",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            bgcolor: "background.paper",
                                            transition: "all 0.3s ease",
                                        },

                                        "& .MuiTab-root:hover": {
                                            color: "primary.dark",
                                            borderColor: "primary.main",
                                            bgcolor: "primary.light",
                                        },

                                        "& .Mui-selected": {
                                            color: "#fff !important",
                                            bgcolor: "primary.main",
                                            borderColor: "primary.main",
                                            boxShadow: "0 8px 20px rgba(59, 48, 39, 0.16)",
                                        },
                                    }}
                                >
                                    {entry?.item?.map((item: any, categoryIndex: number) => (
                                        <Tab
                                            key={item?.category?.id || categoryIndex}
                                            label={item?.category?.name}
                                        />
                                    ))}
                                </Tabs>

                                {selectedItem?.product_data?.length > 0 ? (
                                    <AbcProductView
                                        products={selectedItem.product_data}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            textAlign: "center",
                                            py: 5,
                                            bgcolor: "background.paper",
                                            borderRadius: 3,
                                            border: "1px dashed",
                                            borderColor: "divider",
                                        }}
                                    >
                                        <Typography variant="h6" color="text.secondary">
                                            No products found in this category
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        );
                    })
                ) : (
                    <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 2 }}>
                        <Typography variant="h6" color="textSecondary">
                            No Abc data Found
                        </Typography>
                    </Grid>
                )}
            </Box>
        </Box>
    );
}