import { Box, Typography, Grid, Skeleton, Paper, Tabs, Tab } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CMSservice from "../../service/cms.service";
import { getImageUrl } from "../../utils/imageUtils";
import { toast } from "react-toastify";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

interface QualityPolicyItem {
    id?: number;
    logo: string;
    name: string;
    description: string;
    country?: string;
}

interface QualityPolicyGroup {
    category: {
        id?: number;
        name: string;
    };
    country: string;
    data: QualityPolicyItem[];
}

export default function QualityPolicies() {
    const [list, setList] = useState<QualityPolicyGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector(
        (state: RootState) => state.page
    );

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("quality_policies"));
    }, [dispatch]);

    const getList = async () => {
        setLoading(true);

        try {
            const res = await CMSservice.getList();

            if (res) {
                setList(res?.data?.data || []);
            }
        } catch (error) {
            toast.error("Quality Policies not fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    const categoryTabs = useMemo(() => {
        return Array.from(
            new Map(
                list
                    .filter((item) => item?.category?.name)
                    .map((item) => [
                        item.category.name,
                        {
                            id: item.category.id,
                            name: item.category.name,
                        },
                    ])
            ).values()
        );
    }, [list]);

    const filteredList = useMemo(() => {
        if (activeCategory === "all") {
            return list;
        }

        return list.filter(
            (item) => item?.category?.name === activeCategory
        );
    }, [list, activeCategory]);

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
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
                    src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                    alt="Quality Policies Banner"
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
                        bgcolor: "rgba(62,49,38,0.55)",
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
                            fontWeight: 800,
                            fontSize: { xs: "28px", sm: "38px", md: "48px" },
                        }}
                    >
                        Quality Policies
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

                {!loading && categoryTabs.length > 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 5,
                            p: 1,
                        }}
                    >
                        <Tabs
                            value={activeCategory}
                            onChange={(_, value) => setActiveCategory(value)}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                minHeight: 52,
                                "& .MuiTabs-indicator": {
                                    display: "none",
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
                                    transition: "0.25s ease",
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

                            {categoryTabs.map((category) => (
                                <Tab
                                    key={category.id}
                                    label={category.name}
                                    value={category.name}
                                />
                            ))}
                        </Tabs>
                    </Paper>
                )}

                {loading ? (
                    Array.from(new Array(3)).map((_, i) => (
                        <Box key={i} sx={{ mb: 8 }}>
                            <Skeleton variant="rectangular" height={50} sx={{ mb: 6 }} />
                            <Grid container spacing={4} alignItems="center">
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Skeleton variant="rectangular" height={150} width={150} sx={{ mx: "auto", borderRadius: "50%" }} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
                                    <Skeleton variant="text" height={20} />
                                    <Skeleton variant="text" height={20} />
                                    <Skeleton variant="text" height={20} width="80%" />
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                ) : filteredList.length > 0 ? (
                    filteredList.map((group, groupIndex) => (
                        <Box key={groupIndex} sx={{ mb: 8 }}>
                            <Box
                                sx={{
                                    border: "2px solid #3E3126",
                                    textAlign: "center",
                                    py: 1.5,
                                    mb: 6,
                                    fontWeight: 600,
                                }}
                            >
                                {group?.category?.name} - {group?.country}
                            </Box>

                            {group.data.map((item, index) => (
                                <Paper
                                    key={item.id || index}
                                    elevation={0}
                                    sx={{
                                        mb: 4,
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={4}
                                        alignItems="center"
                                    >
                                        <Grid size={{ xs: 12, md: 5 }}>
                                            <Box
                                                component="img"
                                                src={getImageUrl(item?.logo)}
                                                alt={item?.name}
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: "200px",
                                                    mx: "auto",
                                                    display: "block",
                                                }}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 7 }}>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    color: "secondary.main",
                                                    mb: 2,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {item?.name}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "text.secondary",
                                                    fontSize: {
                                                        xs: "14px",
                                                        md: "16px",
                                                    },
                                                    lineHeight: 1.8,
                                                }}
                                            >
                                                {item?.description}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Box>
                    ))
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            textAlign: "center",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "text.secondary",
                                fontWeight: 600,
                            }}
                        >
                            No quality policies found.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}