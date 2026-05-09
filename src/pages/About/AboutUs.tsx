import { Box, Typography, Container, Grid } from "@mui/material";
import Title from "../../commonUI/labelTitle";
import OurView from "../../component/Ourview";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function AboutUs() {
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("about_us"));
    }, [dispatch]);

    const cards = [
        {
            title1: "Our",
            title2: "Vision",
            desc: "To facilitate trade ethically",
        },
        {
            title1: "Our",
            title2: "Mission",
            desc: "To become the foremost trade facilitator of India and increase India's global share",
        },
        {
            title1: "Our",
            title2: "Objective",
            desc: "To facilitate trade with user-interactive and innovative trade services",
        },
        {
            title1: "Our",
            title2: "Core Competency",
            desc: "Preferred choice partner for long-haul end-to-end trade solutions",
        },
    ];

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.replace("#", ""));
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <Box>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Career'}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
                />
            )}

            <Title title="Know" label="Us" id="know-us" />

            {loading ? (
                <Box maxWidth="md" mx="auto" px={3} mb={5}>
                    <PageContentSkeleton />
                </Box>
            ) : pageDetail?.content && (
                <Typography
                    sx={{
                        color: "secondary.main",
                        mb: 5,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        textAlign: "justify",
                        px: 3
                    }}
                    dangerouslySetInnerHTML={{
                        __html: pageDetail?.content || null,
                    }}
                    maxWidth="md"
                    mx="auto"
                />
            )}

            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
                <Grid container spacing={4} id="vision-mission">
                    {cards.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: { xs: 3, md: 4 },
                                    bgcolor: "white",
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    height: "100%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 8,
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        color: "#8BC34A",
                                        fontWeight: 700,
                                        borderBottom: "3px solid #8BC34A",
                                        pb: "4px",
                                        fontSize: {
                                            xs: "18px",
                                            sm: "20px",
                                            md: "22px",
                                        },
                                    }}
                                >
                                    {item.title1}
                                </Typography>{" "}
                                <Typography
                                    component="span"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "18px",
                                            sm: "20px",
                                            md: "22px",
                                        },
                                    }}
                                >
                                    {item.title2}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 3,
                                        fontSize: {
                                            xs: "13px",
                                            sm: "14px",
                                            md: "15px",
                                        },
                                        lineHeight: 1.8,
                                        color: "#666",
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <OurView />

            <Box
                id="delivery-reach"
                sx={{
                    bgcolor: "white",
                    textAlign: "center",
                    py: { xs: 5, md: 8 },
                    px: 2,
                }}
            >
                <Title title="Delivery" label="Reach" />

                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/network-reach.gif"
                    alt="Network Reach"
                    sx={{
                        width: "100%",
                        maxWidth: 800,
                        mt: { xs: 3, md: 5 },
                    }}
                />
            </Box>
        </Box>
    );
}