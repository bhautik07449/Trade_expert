import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Stack,
} from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import InventoryIcon from "@mui/icons-material/Inventory"
import SecurityIcon from "@mui/icons-material/Security"
import DiamondIcon from "@mui/icons-material/Diamond"
import Title from "../commonUI/labelTitle"

export default function Values() {
    const data = [
        {
            title: "Logistic Services",
            description: "Reliable support for smooth shipping and delivery.",
            icon: LocalShippingIcon,
        },
        {
            title: "Customized Packaging",
            description: "Tailored packaging solutions for safer product handling.",
            icon: InventoryIcon,
        },
        {
            title: "Transit Insurance",
            description: "Coverage support for transit-related risks.",
            icon: SecurityIcon,
        },
        {
            title: "Third Party Inspection",
            description: "Independent inspection support for better confidence.",
            icon: DiamondIcon,
        },
    ]

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 6, md: 10 },
                bgcolor: "background.default"
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 80,
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
                    bottom: 50,
                    left: -130,
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(95, 75, 59, 0.16), transparent 68%)",
                    filter: "blur(16px)",
                }}
            />

            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Title title="Services to" label="look out for" tagLine="We provide a comprehensive suite of value-added services designed to support and enhance your trading experience on our platform." />

                <Grid container spacing={{ xs: 2.5, sm: 3 }} mt={1}>
                    {(Array.isArray(data) ? data : []).map((item, index) => {
                        const Icon = item.icon

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        minHeight: 245,
                                        p: { xs: 2.6, md: 3 },
                                        borderRadius: 4,
                                        position: "relative",
                                        overflow: "hidden",
                                        textAlign: "center",
                                        bgcolor: "background.paper",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        boxShadow: "0 12px 35px rgba(59, 48, 39, 0.06)",
                                        cursor: "pointer",
                                        transition: "all 0.35s ease",

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

                                        "&:hover .serviceIcon": {
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            transform: "scale(1.12) rotate(-6deg)",
                                        },

                                        "&:hover .serviceTitle": {
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

                                    <Stack
                                        spacing={2}
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            position: "relative",
                                            zIndex: 1,
                                            height: "100%",
                                        }}
                                    >
                                        <Box
                                            className="serviceIcon"
                                            sx={{
                                                width: { xs: 62, md: 72 },
                                                height: { xs: 62, md: 72 },
                                                borderRadius: 3,
                                                bgcolor: "primary.light",
                                                color: "primary.dark",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.35s ease",

                                                "& svg": {
                                                    fontSize: { xs: 30, md: 36 },
                                                },
                                            }}
                                        >
                                            <Icon />
                                        </Box>

                                        <Box>
                                            <Typography
                                                className="serviceTitle"
                                                sx={{
                                                    fontWeight: 900,
                                                    fontSize: {
                                                        xs: "0.95rem",
                                                        sm: "1rem",
                                                        md: "1.05rem",
                                                    },
                                                    lineHeight: 1.4,
                                                    color: "text.primary",
                                                    textTransform: "uppercase",
                                                    letterSpacing: 0.5,
                                                    transition: "color 0.3s ease",
                                                    mb: 1,
                                                }}
                                            >
                                                {item.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "text.secondary",
                                                    lineHeight: 1.7,
                                                    fontSize: "0.86rem",
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Box>
    )
}