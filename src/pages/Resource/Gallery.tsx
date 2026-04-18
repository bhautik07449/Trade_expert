import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";

export default function Gallery() {
    const [gallery, setGallery] = useState<any[]>([]);

    const getList = async () => {
        try {
            const res = await CMSservice.getGallery();
            if (res) {
                setGallery(res?.data?.data || []);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>

            <img
                src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg"
                alt="Gallery Banner"
                style={{
                    width: '100%',
                    minHeight: '200px',
                    maxHeight: '400px',
                    objectFit: 'cover'
                }}
            />

            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: 'secondary.main' }}
                >
                    Gallery
                </Typography>
            </Box>

            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>

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
                                    src={item?.image}
                                    alt={item?.name}
                                    sx={{
                                        width: "100%",
                                        height: 300,
                                        objectFit: "cover",
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
            </Box>
        </Box>
    );
}