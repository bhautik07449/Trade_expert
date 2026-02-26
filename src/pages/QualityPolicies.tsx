import { Box, Typography, Container, Grid } from "@mui/material";

export default function QualityPolicies() {
    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                alt="Quality Policies"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "350px" },
                    objectFit: "cover",
                }}
            />

            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                    Quality Policies
                </Typography>
            </Box>

            <Container maxWidth="lg">

                <Typography
                    sx={{
                        color: "secondary.main",
                        mb: 5,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        textAlign: "center",
                    }}
                >
                    We firmly believe in sourcing and supplying top-quality agri and food
                    products. We collaborate only with ISO, FSSAI, HACCP, HALAL, BRC and
                    FDA approved suppliers to ensure global food safety standards.
                </Typography>

                <Box
                    sx={{
                        border: "2px solid #3E3126",
                        textAlign: "center",
                        py: 1.5,
                        mb: 6,
                        fontWeight: 600,
                    }}
                >
                    Agri & Foods
                </Box>

                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    sx={{ mb: 8 }}
                >
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            component="img"
                            src="https://sourceseas.itcoders.in/files/quality_policy/image/4/fssai%20approved%20foods.jpg"
                            alt="FSSAI Approved Foods"
                            sx={{
                                width: "100%",
                                maxWidth: "350px",
                                mx: "auto",
                                display: "block",
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "secondary.main", mb: 2, fontWeight: 600 }}
                        >
                            FSSAI Approved Foods
                        </Typography>

                        <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
                            We are committed to delivering naturally fresh, non-adulterated,
                            non-GMO agri and food products. We source only from certified
                            FSSAI manufacturers and processors to maintain India’s renowned
                            food safety standards.
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    flexDirection={{ xs: "column-reverse", md: "row" }}
                >
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "secondary.main", mb: 2, fontWeight: 600 }}
                        >
                            ISO 22000:2005
                        </Typography>

                        <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
                            ISO 22000:2005 is a globally recognized food safety management
                            system standard. We collaborate with ISO certified manufacturers
                            and processors to ensure international quality compliance in the
                            agro and food industry.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            component="img"
                            src="https://sourceseas.itcoders.in/files/quality_policy/image/5/iso%20food%20standard.jpg"
                            alt="ISO Food Standard"
                            sx={{
                                width: "100%",
                                maxWidth: "250px",
                                mx: "auto",
                                display: "block",
                            }}
                        />
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}