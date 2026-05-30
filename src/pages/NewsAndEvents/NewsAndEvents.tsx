import {
    Box,
    Typography,
    Divider,
    Paper,
} from "@mui/material";
import SEO from "../../component/SEO";
import Multilingual from "./Multilingual";
import PreambleAndUpcoming from "./PreambleAndUpcoming";
import { useEffect, useState } from "react";
import CountryTab from "../../commonUI/CountryTab";
import Eventsection from "../../component/Eventsection";
import NewsandeventService from "../../service/newsandevent.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function NewsAndEvents() {
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [multilingual, setMultilingual] = useState([]);
    const [multilingualLoading, setMultilingualLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("news_and_events"));
    }, [dispatch]);

    const getMultilingual = async (country: string) => {
        if (!country) return;

        try {
            setMultilingualLoading(true);
            const res = await NewsandeventService.getMultilingual(country);

            if (res) {
                setMultilingual(res?.data?.data || []);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
            setMultilingual([]);
        } finally {
            setMultilingualLoading(false);
        }
    };

    useEffect(() => {
        getMultilingual(activeCountry);
    }, [activeCountry]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
            }}
        >
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
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg"
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
                            News & Events
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
                    {(loading || pageDetail?.content) && (
                        loading ? (
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
                        )

                    )}
                    <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />
                </Paper>

                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "secondary.main",
                            fontWeight: 800,
                            mb: 1,
                        }}
                    >
                        {activeCountry}
                    </Typography>

                    <Divider
                        sx={{
                            width: 120,
                            mx: "auto",
                            borderColor: "primary.main",
                            borderBottomWidth: 2,
                        }}
                    />
                </Box>

                <Box component="section">
                    <Multilingual multilingualTiles={multilingual} loading={multilingualLoading} />
                </Box>

                <Box component="section">
                    <PreambleAndUpcoming country={activeCountry} />
                </Box>
            </Box>

            <Eventsection country={activeCountry} />
        </Box>
    );
}