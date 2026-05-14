import { Box, Grid, Skeleton, Typography } from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";

export default function OverPresences() {
    const [presences, setPresences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getPresencesData = async () => {
        try {
            const response = await HomePageservice.getPresences();
            setLoading(false)
            if (response) {
                setPresences(response?.data?.data);
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error?.response?.data?.message || "Presences data not fetch")
        }
    }

    useEffect(() => {
        getPresencesData();
    }, []);

    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 8 }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <LabelTitle title="Our" label="Presences" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "680px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    Explore the key regions and countries where Tradexpert’s platform is actively connecting buyers and sellers, fostering global trade opportunities.
                </Typography>
            </Box>

            <Box sx={{ width: '100%' }}>
                {loading ? (
                    <Grid container spacing={3.5}>
                        {[...Array(6)].map((_, index) => (
                            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                                <Skeleton
                                    variant="rounded"
                                    height={100}
                                    sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={3}>
                        {presences?.map((presence, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                                <Box sx={{
                                    bgcolor: "#ffffff",
                                    borderRadius: 3,
                                    boxShadow: 2,
                                    p: 4,
                                    height: "100%",
                                    textAlign: "center",
                                    transition: "transform 0.3s",
                                    '&:hover': {
                                        transform: "translateY(-4px)"
                                    }
                                }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {presence?.country}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    )
}