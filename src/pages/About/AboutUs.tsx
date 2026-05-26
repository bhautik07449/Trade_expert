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
import OverPresences from "../../component/Home/OverPresences";
import InteractiveWorldMap from "../../component/Home/InteractiveWorldMap";
import AboutMap from "../../component/Home/AboutMap";

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
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                overflow: "hidden",
            }}
        >
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || "About Us"}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
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

            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 9 } }}>
                <Grid container spacing={4} id="vision-mission">
                    {cards.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    height: "100%",
                                    textAlign: "center",
                                    p: { xs: 3, md: 4 },
                                    bgcolor: "background.paper",
                                    borderRadius: 4,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 16px 40px rgba(95, 75, 59, 0.10)",
                                    transition: "all 0.3s ease",
                                    "&:before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "5px",
                                        bgcolor: "primary.main",
                                    },
                                    "&:after": {
                                        content: '""',
                                        position: "absolute",
                                        right: "-45px",
                                        bottom: "-45px",
                                        width: "130px",
                                        height: "130px",
                                        borderRadius: "50%",
                                        bgcolor: "primary.light",
                                        opacity: 0.35,
                                    },
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: "0 22px 55px rgba(95, 75, 59, 0.18)",
                                        borderColor: "primary.light",
                                    },
                                }}
                            >
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: 800,
                                            borderBottom: "3px solid",
                                            borderColor: "primary.main",
                                            pb: "4px",
                                            fontSize: {
                                                xs: "20px",
                                                sm: "22px",
                                                md: "24px",
                                            },
                                        }}
                                    >
                                        {item.title1}
                                    </Typography>{" "}
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 800,
                                            fontSize: {
                                                xs: "20px",
                                                sm: "22px",
                                                md: "24px",
                                            },
                                        }}
                                    >
                                        {item.title2}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            mt: 3,
                                            fontSize: {
                                                xs: "14px",
                                                sm: "15px",
                                                md: "16px",
                                            },
                                            lineHeight: 1.8,
                                            color: "text.secondary",
                                        }}
                                    >
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <OurView />

            <OverPresences />

            <AboutMap />
        </Box>
    );
}