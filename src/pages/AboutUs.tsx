import { Box, Typography, Container, Grid } from "@mui/material";
import Title from "../commonUI/labelTitle";
import OurView from "../component/Ourview";

export default function AboutUs() {
    return (
        <Box>
            <Title title="Know" label="Us" />

            <Container maxWidth="md">
                <Typography
                    sx={{
                        mb: 3,
                        fontSize: { sm: "14px", md: "16px" },
                        textAlign: "center",
                    }}
                >
                    We at Sourceseas Overseas are continuously working to improve and
                    raise the standards of agri and food exports worldwide from India.
                    Quality is what we love and deliver — it has been our core objective
                    since formation.
                </Typography>

                <Typography
                    sx={{
                        mb: 3,
                        fontSize: { sm: "14px", md: "16px" },
                        textAlign: "center",
                    }}
                >
                    We collaborate directly with farmers, agro and food processors across
                    India and ensure seasonal crop availability.
                </Typography>

                <Typography
                    sx={{
                        mb: 3,
                        fontSize: { sm: "14px", md: "16px" },
                        textAlign: "center",
                    }}
                >
                    We build strong client relationships based on honesty, reliability,
                    and quality while delivering value beyond expectations.
                </Typography>

                <Typography
                    sx={{
                        mb: 3,
                        fontSize: { sm: "14px", md: "16px" },
                        textAlign: "center",
                    }}
                >
                    All products are inspected under APEDA guidelines for pesticide-free
                    export. With one of the largest storage facilities locally, we are
                    capable of fulfilling bulk orders instantly.
                </Typography>

                <Typography
                    sx={{
                        mb: 3,
                        fontSize: { sm: "14px", md: "16px" },
                        textAlign: "center",
                    }}
                >
                    With a strong vision and motivated team, we are expanding globally
                    beyond SAARC and Asian regions to serve worldwide clients.
                </Typography>
            </Container>

            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
                <Grid container spacing={4}>

                    {[
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
                    ].map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: 3,
                                    bgcolor: "white",
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    height: "100%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 6,
                                        transform: "translateY(-5px)",
                                    },
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{
                                        color: "#8BC34A",
                                        fontWeight: 600,
                                        borderBottom: "3px solid #8BC34A",
                                        pb: "4px",
                                    }}
                                >
                                    {item.title1}
                                </Typography>{" "}
                                <Typography
                                    variant="h6"
                                    component="span"
                                    sx={{ fontWeight: 600 }}
                                >
                                    {item.title2}
                                </Typography>

                                <Typography sx={{ mt: 2, fontSize: "14px" }}>
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <OurView />

            <Box sx={{ bgcolor: "white", textAlign: "center", py: { xs: 4, md: 6 } }}>
                <Title title="Delivery" label="Reach" />

                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/network-reach.gif"
                    alt="Network Reach"
                    sx={{
                        width: "100%",
                        maxWidth: "800px",
                        mt: 3,
                    }}
                />
            </Box>
        </Box>
    );
}