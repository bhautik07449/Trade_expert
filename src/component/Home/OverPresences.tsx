import { Box, Grid, Typography } from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";

export default function OverPresences() {
    const presences = [
        { name: "Dubai, UAE" },
        { name: "New York, USA" },
        { name: "Toronto, Canada" },
        { name: "Malaysia" },
        { name: "Indonesia" },
        { name: "Thailand" },
        { name: "Vietnam" },
        { name: "Mumbai, India" },
    ]
    return (
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 8 }}>
            <Box sx={{ textAlign: "center", mb: 6 }}>
                <LabelTitle title="Our" label="Presences" />
            </Box>

            <Grid container spacing={3}>
                {presences.map((presence, index) => (
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
                                {presence.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}