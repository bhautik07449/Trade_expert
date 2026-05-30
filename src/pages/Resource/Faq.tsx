import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Skeleton,
    Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import SEO from "../../component/SEO";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function Faq() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("faq"));
    }, [dispatch]);

    const getFaq = async () => {
        setLoading(true)
        try {
            const res = await CMSservice.getFaq()
            if (res) {
                setFaqs(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFaq();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title || 'Career'}
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
                    src="https://sourceseas.itcoders.in/img/front-end/faq.jpg"
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
                            Frequently Asked Questions
                        </Typography>
                    </Box>
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

                {loading ? (
                    Array.from(new Array(5)).map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="rectangular"
                            height={56}
                            sx={{ mb: 2, borderRadius: 2 }}
                        />
                    ))
                ) : (
                    faqs?.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                my: 4,
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:before': { display: 'none' }
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {faq?.title}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Typography color="text.secondary" dangerouslySetInnerHTML={{ __html: faq?.answer || "" }}>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Box>
        </Box>
    );
}