import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import { getImageUrl } from "../../utils/imageUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import SEO from "../../component/SEO";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function Gallery() {
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading: pageLoading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("gallery"));
    }, [dispatch]);

    const getList = async () => {
        setLoading(true)
        try {
            const res = await CMSservice.getGallery();
            if (res) {
                setGallery(res?.data?.data || []);
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>

            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Gallery'}
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
                            Gallery
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{ maxWidth: "1400px", mx: "auto", px: 2 }}>
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

                {loading ? (
                    Array.from(new Array(3)).map((_, index) => (
                        <Grid
                            container
                            spacing={4}
                            key={index}
                            alignItems="center"
                            sx={{ mb: 6 }}
                            direction={index % 2 !== 0 ? "row-reverse" : "row"}
                        >
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 3 }} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
                                <Skeleton variant="text" height={20} />
                                <Skeleton variant="text" height={20} />
                                <Skeleton variant="text" height={20} width="80%" />
                            </Grid>
                        </Grid>
                    ))
                ) : (
                    <>
                        {gallery.map((item, index) => {
                            const isReverse = index % 2 !== 0;

                            return (
                                <Grid
                                    container
                                    spacing={4}
                                    key={index}
                                    alignItems="center"
                                    sx={{ mb: 6 }}
                                    direction={isReverse ? "row-reverse" : "row"}
                                >
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box
                                            component="img"
                                            src={getImageUrl(item?.image)}
                                            alt={item?.name}
                                            sx={{
                                                width: "100%",
                                                height: 300,
                                                objectFit: "contain",
                                                bgcolor: "#f5f5f5",
                                                borderRadius: 3,
                                                boxShadow: 3
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 600,
                                                mb: 2,
                                                color: "secondary.main"
                                            }}
                                        >
                                            {item?.name || "Title"}
                                        </Typography>

                                        <Typography color="text.secondary">
                                            {item?.description || "Description goes here..."}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            );
                        })}

                        {gallery.length === 0 && (
                            <Typography textAlign="center" sx={{ mt: 5 }}>
                                No gallery data available
                            </Typography>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}