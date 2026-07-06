import { Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchFlatPageBySlug } from "../store/slice/pageSlice";
import SEO from "../component/SEO";
import PageContentSkeleton from "../component/PageContentSkeleton";
import CountryTab from "./CountryTab";
import NoDataFound from "./NoDataFound";

export default function PageMainLayout({ image, title, slug, country = false, activeCountry, setActiveCountry, bannerContent }: { image?: string, title?: string, slug: string, country?: boolean, activeCountry: string, setActiveCountry: (country: string) => void, bannerContent?: React.ReactNode }) {
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug(slug));
    }, [dispatch, slug]);

    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <Box sx={{ backgroundColor: "background.default", mb: { xs: 8, sm: 8, md: 12 } }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
                />
            )}

            <Box
                sx={{
                    width: "100%",
                    height: bannerContent ? { xs: 450, sm: 500, md: 550 } : { xs: 160, sm: 240, md: 300 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src={image}
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
                        pb: { xs: 10, sm: 15, md: 18.75 },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: bannerContent ? 10 : 0 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            {title || pageDetail?.page_title || ""}
                        </Typography>
                        {bannerContent && (
                            <Box sx={{ mt: { xs: 3, md: 4 }, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {bannerContent}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>

            {pageDetail?.content && (
                <Box
                    sx={{
                        maxWidth: "1600px",
                        mx: "auto",
                        mt: { xs: -10, sm: -15, md: -18.75 },
                        px: { xs: 2, sm: 3, md: 4 },
                        position: "relative",
                        zIndex: 2,
                    }}
                >
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
                        ) : pageDetail?.content ? (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    lineHeight: 1.8,
                                    textAlign: "justify",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: decodeHTML(pageDetail?.content || ""),
                                }}
                            />
                        ) : (
                            <Box sx={{ py: 5 }}>
                                <NoDataFound message="No content found" />
                            </Box>
                        )}
                    </Paper>
                </Box>
            )}
            {country && <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />}
        </Box>
    );
}