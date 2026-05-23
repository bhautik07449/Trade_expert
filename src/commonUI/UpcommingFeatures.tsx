import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Stack,
} from "@mui/material"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import LabelTitle from "./labelTitle"

export default function UpcommingFeatures() {
    const features = [
        {
            title: "Advanced Analytics",
            description: "Advanced analytics dashboard for market trends.",
            icon: <AnalyticsIcon />,
        },
        {
            title: "Logistics Integration",
            description: "Integration with third-party logistics providers.",
            icon: <LocalShippingIcon />,
        },
        {
            title: "AI Recommendations",
            description: "AI-powered product recommendation engine.",
            icon: <AutoAwesomeIcon />,
        },
        {
            title: "Enhanced Mobile App",
            description: "Enhanced mobile app with offline capabilities.",
            icon: <PhoneIphoneIcon />,
        },
    ]

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 6, md: 9 },
                bgcolor: "background.default",
                background:
                    "linear-gradient(180deg, #F5F0EB 0%, #FFFFFF 48%, #F5F0EB 100%)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 90,
                    right: -120,
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(167, 123, 88, 0.22), transparent 68%)",
                    filter: "blur(14px)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: 40,
                    left: -130,
                    width: 270,
                    height: 270,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(95, 75, 59, 0.16), transparent 68%)",
                    filter: "blur(16px)",
                }}
            />

            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Box sx={{ textAlign: "center", mb: 5 }}>
                    <LabelTitle title="Upcoming" label="Features" />

                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            maxWidth: 680,
                            mx: "auto",
                            mt: { xs: -1.5, md: -2.5 },
                            lineHeight: 1.8,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                    >
                        We are continuously improving the platform with powerful tools to
                        make sourcing, logistics, and customer support smarter and faster.
                    </Typography>
                </Box>

                <Grid container spacing={3} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    minHeight: 220,
                                    borderRadius: 4,
                                    position: "relative",
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "background.paper",
                                    boxShadow: "0 10px 30px rgba(59, 48, 39, 0.06)",
                                    transition: "all 0.35s ease",
                                    cursor: "pointer",

                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(135deg, rgba(167,123,88,0.16), rgba(232,216,193,0.35))",
                                        opacity: 0,
                                        transition: "opacity 0.35s ease",
                                    },

                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: 4,
                                        background: "linear-gradient(90deg, #A77B58, #5F4B3B)",
                                        transform: "scaleX(0)",
                                        transformOrigin: "left",
                                        transition: "transform 0.35s ease",
                                    },

                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        borderColor: "primary.main",
                                        boxShadow: "0 22px 45px rgba(59, 48, 39, 0.14)",
                                    },

                                    "&:hover::before": {
                                        opacity: 1,
                                    },

                                    "&:hover::after": {
                                        transform: "scaleX(1)",
                                    },

                                    "&:hover .featureIcon": {
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        transform: "scale(1.12) rotate(-6deg)",
                                    },

                                    "&:hover .featureTitle": {
                                        color: "primary.dark",
                                    },

                                    "&:hover .circleDecor": {
                                        transform: "scale(1.45)",
                                        opacity: 1,
                                    },
                                }}
                            >
                                <Box
                                    className="circleDecor"
                                    sx={{
                                        position: "absolute",
                                        width: 120,
                                        height: 120,
                                        borderRadius: "50%",
                                        top: -42,
                                        right: -42,
                                        background:
                                            "radial-gradient(circle, rgba(167,123,88,0.22), transparent 68%)",
                                        opacity: 0.55,
                                        transition: "all 0.4s ease",
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        position: "relative",
                                        zIndex: 1,
                                        p: { xs: 2.8, sm: 3.5 },
                                        height: "100%",
                                    }}
                                >
                                    <Stack spacing={2.2}>
                                        <Box
                                            className="featureIcon"
                                            sx={{
                                                width: 62,
                                                height: 62,
                                                borderRadius: 3,
                                                bgcolor: "primary.light",
                                                color: "primary.dark",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.35s ease",

                                                "& svg": {
                                                    fontSize: 32,
                                                },
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>

                                        <Box>
                                            <Typography
                                                className="featureTitle"
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: "text.primary",
                                                    mb: 1,
                                                    transition: "color 0.3s ease",
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    lineHeight: 1.8,
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}