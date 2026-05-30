import { Box, Typography, Skeleton, Paper, Tabs, Tab, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Brandservice from "../../service/brand.service";
import { getImageUrl } from "../../utils/imageUtils";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

interface BrandItem {
    id?: number;
    logo: string;
    name: string;
    description: string;
    country?: string;
}

interface BrandCategoryGroup {
    category: {
        id?: number;
        name: string;
    };
    data: BrandItem[];
}

interface BrandCountryGroup {
    country: string;
    category: BrandCategoryGroup[];
}

export default function Brand() {
    const [list, setList] = useState<BrandCountryGroup[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeCategoryByCountry, setActiveCategoryByCountry] = useState<
        Record<string, string>
    >({});

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector(
        (state: RootState) => state.page
    );

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("brands"));
    }, [dispatch]);

    const getList = async () => {
        setLoading(true);

        try {
            const res = await Brandservice.getList();

            if (res) {
                setList(res?.data?.data || []);
            }
        } catch (error) {
            toast.error("Brand not found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const getActiveCategory = (country: string) => {
        return activeCategoryByCountry[country] || "all";
    };

    const handleCategoryChange = (country: string, value: string) => {
        setActiveCategoryByCountry((prev) => ({
            ...prev,
            [country]: value,
        }));
    };

    const getFilteredCategoryGroups = (countryGroup: BrandCountryGroup) => {
        const activeCategory = getActiveCategory(countryGroup.country);

        if (activeCategory === "all") {
            return countryGroup.category;
        }

        return countryGroup.category.filter(
            (categoryGroup) => categoryGroup.category.name === activeCategory
        );
    };

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={
                        pageDetail.page_meta_title ||
                        pageDetail.page_title ||
                        "Brands"
                    }
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
                />
            )}

            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/brands.jpg"
                    alt="Brands Banner Image"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: {
                                xs: "28px",
                                sm: "38px",
                                md: "48px",
                            },
                        }}
                    >
                        Brands
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    mt: { xs: -5, md: -7 },
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {(loading || pageDetail?.content) && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 4,
                            p: { xs: 2.5, sm: 3, md: 4 },
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                        }}
                    >
                        {loading ? (
                            <PageContentSkeleton />
                        ) : (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    lineHeight: 1.8,
                                    textAlign: "justify",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail?.content || "",
                                }}
                            />
                        )}
                    </Paper>
                )}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {loading ? (
                        Array.from(new Array(3)).map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    maxWidth: "1400px",
                                    mx: "auto",
                                    width: "100%",
                                    py: 4,
                                    textAlign: "center",
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="25%"
                                    height={50}
                                    sx={{ mx: "auto", mb: 2 }}
                                />

                                <Skeleton
                                    variant="rectangular"
                                    height={50}
                                    width="100%"
                                    sx={{ borderRadius: 2, mb: 4 }}
                                />

                                <Skeleton
                                    variant="circular"
                                    width={100}
                                    height={100}
                                    sx={{ mx: "auto", mb: 3 }}
                                />

                                <Skeleton
                                    variant="text"
                                    width="30%"
                                    sx={{ mx: "auto", mb: 2 }}
                                />
                                <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                                <Skeleton variant="text" width="75%" sx={{ mx: "auto" }} />
                            </Box>
                        ))
                    ) : list.length > 0 ? (
                        list.map((countryGroup, countryIndex) => {
                            const activeCategory = getActiveCategory(countryGroup.country);
                            const filteredCategoryGroups =
                                getFilteredCategoryGroups(countryGroup);

                            return (
                                <Box key={countryGroup.country || countryIndex}>
                                    {/* Country Title */}
                                    <Typography
                                        variant="h4"
                                        component="h2"
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: 700,
                                            color: "secondary.main",
                                            mb: 3,
                                        }}
                                    >
                                        {countryGroup.country}
                                    </Typography>

                                    {/* Category Tabs */}
                                    {countryGroup.category.length > 0 && (
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                mb: 5,
                                                p: 1,
                                                bgcolor: "transparent",
                                                boxShadow: "none",
                                            }}
                                        >
                                            <Tabs
                                                value={activeCategory}
                                                onChange={(_, value) =>
                                                    handleCategoryChange(
                                                        countryGroup.country,
                                                        value
                                                    )
                                                }
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                allowScrollButtonsMobile
                                                centered={false}
                                                sx={{
                                                    minHeight: 52,
                                                    "& .MuiTabs-indicator": {
                                                        display: "none",
                                                    },
                                                    "& .MuiTabs-flexContainer": {
                                                        justifyContent: {
                                                            xs: "flex-start",
                                                            md: "center",
                                                        },
                                                    },
                                                    "& .MuiTabs-scrollButtons": {
                                                        color: "secondary.main",
                                                    },
                                                    "& .MuiTab-root": {
                                                        minHeight: 44,
                                                        mx: 0.5,
                                                        px: 3,
                                                        borderRadius: 2,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                        color: "text.secondary",
                                                        border: "1px solid",
                                                        borderColor: "divider",
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
                                                <Tab label="All" value="all" />

                                                {countryGroup.category.map((categoryGroup) => (
                                                    <Tab
                                                        key={
                                                            categoryGroup.category.id ||
                                                            categoryGroup.category.name
                                                        }
                                                        label={categoryGroup.category.name}
                                                        value={categoryGroup.category.name}
                                                    />
                                                ))}
                                            </Tabs>
                                        </Paper>
                                    )}

                                    {filteredCategoryGroups.map(
                                        (categoryGroup, categoryIndex) => (
                                            <Box
                                                key={
                                                    categoryGroup.category.id ||
                                                    categoryGroup.category.name ||
                                                    categoryIndex
                                                }
                                            >
                                                {activeCategory === "all" && (
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            textAlign: "center",
                                                            fontWeight: 600,
                                                            color: "secondary.main",
                                                            mb: 3,
                                                        }}
                                                    >
                                                        {categoryGroup.category.name}
                                                    </Typography>
                                                )}

                                                {categoryGroup.data.map((brand, brandIndex) => (
                                                    <Box key={brand.id || brandIndex}>
                                                        <Box
                                                            sx={{
                                                                maxWidth: "900px",
                                                                mx: "auto",
                                                                py: 3,
                                                                px: { xs: 1, sm: 2 },
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={getImageUrl(brand?.logo)}
                                                                alt={brand?.name}
                                                                sx={{
                                                                    width: 110,
                                                                    height: 110,
                                                                    objectFit: "contain",
                                                                    mb: 3,
                                                                }}
                                                            />

                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    color: "secondary.main",
                                                                    mb: 2,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {brand?.name}
                                                            </Typography>

                                                            <Typography
                                                                sx={{
                                                                    color: "text.secondary",
                                                                    lineHeight: 1.8,
                                                                    maxWidth: "850px",
                                                                }}
                                                            >
                                                                {brand?.description}
                                                            </Typography>
                                                        </Box>

                                                        {brandIndex !==
                                                            categoryGroup.data.length - 1 && (
                                                                <Divider
                                                                    sx={{
                                                                        maxWidth: "850px",
                                                                        mx: "auto",
                                                                        my: 3,
                                                                        borderColor: "divider",
                                                                    }}
                                                                />
                                                            )}
                                                    </Box>
                                                ))}

                                                {categoryIndex !==
                                                    filteredCategoryGroups.length - 1 && (
                                                        <Divider
                                                            sx={{
                                                                maxWidth: "1000px",
                                                                mx: "auto",
                                                                my: 6,
                                                                borderColor: "divider",
                                                            }}
                                                        />
                                                    )}
                                            </Box>
                                        )
                                    )}

                                    {countryIndex !== list.length - 1 && (
                                        <Divider
                                            sx={{
                                                maxWidth: "1400px",
                                                mx: "auto",
                                                my: 7,
                                                borderColor: "divider",
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        })
                    ) : (
                        <Box sx={{ textAlign: "center", py: 5 }}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 600,
                                }}
                            >
                                No brands found.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}