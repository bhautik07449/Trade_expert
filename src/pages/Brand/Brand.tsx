import { Box, Typography, Skeleton, Paper, Tabs, Tab, Container } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Brandservice from "../../service/brand.service";
import { getImageUrl } from "../../utils/imageUtils";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

interface Props {
    logo: string,
    name: string,
    description: string,
    category: {
        name: string
    },
    country?: string
}

export default function Brand() {
    const [list, setList] = useState<Props[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCountry, setActiveCountry] = useState("all");

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
                setList(res?.data || [])
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

    const getCountryName = (item: Props) => {
        return item?.country || "";
    };

    const countryTabs = useMemo(() => {
        const uniqueCountries = Array.from(
            new Set(
                list
                    ?.map((item) => getCountryName(item))
                    ?.filter((country) => country && country.trim() !== "")
            )
        );

        return uniqueCountries;
    }, [list]);

    const filteredList = useMemo(() => {
        if (activeCountry === "all") {
            return list;
        }

        return list.filter((item) => getCountryName(item) === activeCountry);
    }, [list, activeCountry]);

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
                    alt="Supplier Banner"
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

                {!loading && countryTabs.length > 0 && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 5,
                            p: 1,
                        }}
                    >
                        <Tabs
                            value={activeCountry}
                            onChange={(_, value) => setActiveCountry(value)}
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

                            {countryTabs.map((country) => (
                                <Tab
                                    key={country}
                                    label={country}
                                    value={country}
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
                                </Box>

                                <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, display: "flex", gap: 4, flexWrap: "wrap", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxSizing: "border-box", width: "100%" }}>
                                    <img src={getImageUrl(item?.logo)} alt="FSSAI Approved Foods" style={{ width: '100px', height: "100px" }} />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 4 }}>
                                            {item?.name}
                                        </Typography>
                                        <Typography>{item?.description}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    )}
                </Box>

            </Container>
        </Box >
    )
}