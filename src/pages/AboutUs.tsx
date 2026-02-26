import { Box, Typography, Container, Grid } from "@mui/material";
import Title from "../commonUI/labelTitle";
import OurView from "../component/Ourview";

export default function AboutUs() {
    const cards = [
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
    ];

    return (
        <Box>
            <Title title="Know" label="Us" />

            <Container maxWidth="md">
                {[
                    "We at Sourceseas Overseas are continuously working to improve and raise the standards of agri and food exports worldwide from India. Quality is what we love and deliver — it has been our core objective since formation.",
                    "We collaborate directly with farmers, agro and food processors across India and ensure seasonal crop availability.",
                    "We build strong client relationships based on honesty, reliability, and quality while delivering value beyond expectations.",
                    "All products are inspected under APEDA guidelines for pesticide-free export. With one of the largest storage facilities locally, we are capable of fulfilling bulk orders instantly.",
                    "With a strong vision and motivated team, we are expanding globally beyond SAARC and Asian regions to serve worldwide clients.",
                ].map((text, index) => (
                    <Typography
                        key={index}
                        sx={{
                            mb: 3,
                            fontSize: {
                                xs: "13px",
                                sm: "14px",
                                md: "16px",
                                lg: "17px",
                            },
                            lineHeight: 1.9,
                            textAlign: "center",
                            color: "#555",
                            px: { xs: 1, sm: 0 },
                        }}
                    >
                        {text}
                    </Typography>
                ))}
            </Container>

            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
                <Grid container spacing={4}>
                    {cards.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: { xs: 3, md: 4 },
                                    bgcolor: "white",
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    height: "100%",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 8,
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        color: "#8BC34A",
                                        fontWeight: 700,
                                        borderBottom: "3px solid #8BC34A",
                                        pb: "4px",
                                        fontSize: {
                                            xs: "18px",
                                            sm: "20px",
                                            md: "22px",
                                        },
                                    }}
                                >
                                    {item.title1}
                                </Typography>{" "}
                                <Typography
                                    component="span"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "18px",
                                            sm: "20px",
                                            md: "22px",
                                        },
                                    }}
                                >
                                    {item.title2}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 3,
                                        fontSize: {
                                            xs: "13px",
                                            sm: "14px",
                                            md: "15px",
                                        },
                                        lineHeight: 1.8,
                                        color: "#666",
                                    }}
                                >
                                    {item.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <OurView />

            <Box
                sx={{
                    bgcolor: "white",
                    textAlign: "center",
                    py: { xs: 5, md: 8 },
                    px: 2,
                }}
            >
                <Title title="Delivery" label="Reach" />

                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/network-reach.gif"
                    alt="Network Reach"
                    sx={{
                        width: "100%",
                        maxWidth: 800,
                        mt: { xs: 3, md: 5 },
                    }}
                />
            </Box>
        </Box>
    );
}