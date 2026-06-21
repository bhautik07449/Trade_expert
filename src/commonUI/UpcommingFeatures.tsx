import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
} from "@mui/material"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PolicyIcon from '@mui/icons-material/Policy';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GavelIcon from '@mui/icons-material/Gavel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LabelTitle from "./labelTitle"

export default function UpcommingFeatures() {
    const features = [
        {
            title: 'Trade Controller',
            description: "Manage and oversee all your trade operations securely from a centralized dashboard.",
            icon: <AdminPanelSettingsIcon />,
        },
        {
            title: "Trade Regulator",
            description: "Ensure strict adherence to international trade guidelines and standard regulations.",
            icon: <PolicyIcon />,
        },
        {
            title: "Trade Compliance",
            description: "Automated checks to maintain flawless compliance with customs and export controls.",
            icon: <FactCheckIcon />,
        },
        {
            title: "Trade Laws",
            description: "Stay updated with global trade legislations, treaties, and legal frameworks.",
            icon: <GavelIcon />,
        },
        {
            title: "Trade Grievance",
            description: "A dedicated portal to seamlessly raise, track, and resolve trade disputes.",
            icon: <SupportAgentIcon />,
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

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "1400px",
                    mx: 'auto',
                    px: { xs: 2, sm: 3 },
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

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 3,
                        borderRadius: 6,
                        p: { xs: 3, sm: 5, lg: 6 },
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: "0 24px 64px -12px rgba(95, 75, 59, 0.12)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {(Array.isArray(features) ? features : []).map((feature, index) => (
                        <Box 
                            key={index} 
                            sx={{ 
                                flex: { 
                                    xs: "1 1 100%", 
                                    sm: "1 1 calc(50% - 24px)", 
                                    md: "1 1 calc(33.333% - 24px)",
                                    lg: "1 1 calc(20% - 24px)" 
                                },
                                minWidth: 200
                            }}
                        >
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    minHeight: 240,
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
                                        p: { xs: 2, sm: 2.5 },
                                        height: "100%",
                                    }}
                                >
                                    <Stack spacing={2.2}>
                                        <Box
                                            className="featureIcon"
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 3,
                                                bgcolor: "primary.light",
                                                color: "primary.dark",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.35s ease",

                                                "& svg": {
                                                    fontSize: 28,
                                                },
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>

                                        <Box>
                                            <Typography
                                                className="featureTitle"
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 800,
                                                    color: "text.primary",
                                                    mb: 1,
                                                    transition: "color 0.3s ease",
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    lineHeight: 1.6,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}