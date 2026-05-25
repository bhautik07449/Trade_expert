import { Box, Typography, Skeleton, Paper, Tabs, Tab, Container, Divider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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

interface BrandGroup {
    category: {
        id?: number;
        name: string;
    };
    country: string;
    data: BrandItem[];
}

export default function Brand() {
    const [list, setList] = useState<BrandGroup[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState("all");

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading: pageLoading } = useSelector(
        (state: RootState) => state.page
    );

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("brands"));
    }, [dispatch]);

    const getList = async () => {
        setLoading(true)
        try {
            const res = await Brandservice.getList()
            if (res) {
                setList(res?.data?.data || [])
            }
        } catch (error) {
            toast.error("bran not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

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
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Career'}
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
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            Brands
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>

                <Box sx={{ p: 4, textAlign: 'center' }}>
                    {pageLoading ? (
                        <PageContentSkeleton />
                    ) : pageDetail?.content && (
                        <Typography
                            sx={{
                                color: "secondary.main",
                                mb: 5,
                                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                                textAlign: "justify",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: pageDetail?.content || null,
                            }}
                        />
                    )}
                </Box>

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

                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {loading ? (
                        Array.from(new Array(3)).map((_, i) => (
                            <Box key={i} sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: 4, display: "flex", gap: 4, flexDirection: "column", alignItems: "center", width: "100%", boxSizing: "border-box" }}>
                                <Skeleton variant="circular" width={100} height={100} />
                                <Box sx={{ width: "100%", textAlign: "center" }}>
                                    <Skeleton variant="text" width="30%" sx={{ mx: "auto", mb: 2 }} />
                                    <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                                    <Skeleton variant="text" width="75%" sx={{ mx: "auto" }} />
                                </Box>
                            </Box>
                        ))
                    ) : (
                        filteredList?.map((item, index) => (
                            <Box key={index}>
                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                                        {item?.category?.name}
                                    </Typography>
                                    <Typography variant="h6" component="h2" sx={{ fontWeight: 300, color: 'secondary.main' }}>
                                        {item?.country}
                                    </Typography>
                                </Box>

                                {item.data.map((brand, brandIndex) => (
                                    <Box key={brand.id || brandIndex}>
                                        <Box
                                            sx={{
                                                maxWidth: "1200px",
                                                mx: "auto",
                                                px: { xs: 2, sm: 3, md: 4 },
                                                py: 3,
                                                display: "flex",
                                                gap: 4,
                                                flexWrap: "wrap",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                boxSizing: "border-box",
                                                width: "100%",
                                            }}
                                        >
                                            <img
                                                src={getImageUrl(brand?.logo)}
                                                alt={brand?.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "contain",
                                                }}
                                            />

                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        color: "secondary.main",
                                                        mb: 4,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {brand?.name}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color: "text.secondary",
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {brand?.description}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {brandIndex !== item.data.length - 1 && (
                                            <Divider
                                                sx={{
                                                    maxWidth: "900px",
                                                    mx: "auto",
                                                    my: 3,
                                                    borderColor: "divider",
                                                }}
                                            />
                                        )}
                                    </Box>
                                ))}

                                {index !== filteredList.length - 1 && (
                                    <Divider
                                        sx={{
                                            maxWidth: "1200px",
                                            mx: "auto",
                                            my: 5,
                                            borderColor: "divider",
                                        }}
                                    />
                                )}
                            </Box>
                        ))
                    )}
                </Box>

            </Container>
        </Box >
    )
}