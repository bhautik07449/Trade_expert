import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import { getImageUrl } from "../../utils/imageUtils";
import PageMainLayout from "../../commonUI/PageMainLayout";
import NoDataFound from "../../commonUI/NoDataFound";

export default function Gallery() {
    const [gallery, setGallery] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout title="Gallery" slug="gallery" image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" activeCountry="" setActiveCountry={() => { }} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
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
                            <NoDataFound message="No gallery data available" />
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}