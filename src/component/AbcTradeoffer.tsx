import { Box, Button, Container, Grid, Typography, useTheme } from "@mui/material";
import LabelTitle from "../commonUI/labelTitle";
import { useNavigate } from "react-router-dom";

export default function AbcTradeoffer({ country }: any) {
    const navigate = useNavigate();
    const theme = useTheme();

    const tab = [
        {
            value: "Countries trade diversity",
            description: "Explore the diversity of trade across different countries and regions.",
            button: "Go to ABC type",
            link: "/abc",
        },
        {
            value: "On Going deals",
            description: "Discover current trade offers and opportunities available in the market.",
            button: "Go to Trade Deals",
            link: "/trade-offers",
        },
    ];

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                width: "100%",
                bgcolor: "white",
                boxSizing: "border-box",
            }}
        >
            <LabelTitle title="Explore" label="Services" tagLine="Discover a range of services designed to meet your trading needs and expand your business opportunities." />

            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    mt: { xs: 3, md: 4 },
                }}
            >
                <Grid container spacing={4}>
                    {tab.map((item, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    height: "100%",
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 3,
                                    p: { xs: 3, sm: 4, md: 5 },
                                    textAlign: "center",
                                    bgcolor: "background.paper",
                                    boxShadow: "0 8px 24px rgba(59, 48, 39, 0.06)",
                                    transition: "all 0.3s ease",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "5px",
                                        bgcolor: index === 0 ? "primary.main" : "secondary.main",
                                    },
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 14px 34px rgba(59, 48, 39, 0.14)",
                                        borderColor: index === 0 ? "primary.main" : "secondary.main",
                                    },
                                }}
                            >
                                <Box mb={4} mt={1}>
                                    <Typography
                                        component="h3"
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 700,
                                            fontSize: {
                                                xs: "1.15rem",
                                                md: "1.45rem",
                                            },
                                        }}
                                    >
                                        {item.value}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            mt: 1,
                                            fontSize: {
                                                xs: "0.9rem",
                                                md: "1rem",
                                            },
                                        }}
                                    >
                                        {item?.description}
                                    </Typography>
                                </Box>

                                <Button
                                    id={`country-action-btn-${index}`}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: index === 0 ? "primary.main" : "secondary.main",
                                        color: "#fff",
                                        fontWeight: 600,
                                        py: 1.35,
                                        borderRadius: 2,
                                        boxShadow: "none",
                                        fontSize: {
                                            xs: "0.95rem",
                                            md: "1.05rem",
                                        },
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: index === 0 ? "primary.dark" : "secondary.dark",
                                            boxShadow:
                                                index === 0
                                                    ? "0 6px 18px rgba(122, 90, 58, 0.28)"
                                                    : "0 6px 18px rgba(62, 49, 38, 0.28)",
                                        },
                                    }}
                                    onClick={() => navigate(`${item.link}`)}
                                >
                                    {item.button}
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}