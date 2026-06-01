import {
    Box,
    Typography,
    Paper,
    Grid,
    Skeleton,
    Stack,
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EngineeringIcon from "@mui/icons-material/Engineering";

const categoryStats = [
    {
        value: "10",
        label: "Commodity Suppliers",
        description: "Verified commodity supplier network",
        icon: <StorefrontIcon />,
    },
    {
        value: "57",
        label: "Composite Suppliers",
        description: "Trusted composite supply partners",
        icon: <Diversity3Icon />,
    },
    {
        value: "150",
        label: "Service Providers",
        description: "Professional service provider base",
        icon: <EngineeringIcon />,
    },
];

export default function CategoryInsight({
    category,
    loading = false,
}: {
    category?: string;
    loading?: boolean;
}) {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 6, md: 10 },
                bgcolor: "white",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    right: { xs: -180, md: -120 },
                    bottom: 40,
                    width: { xs: 220, md: 280 },
                    height: { xs: 220, md: 280 },
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(95, 75, 59, 0.16), transparent 68%)",
                    filter: "blur(18px)",
                    pointerEvents: "none",
                }}
            />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 5, lg: 6 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <LabelTitle title="Cluster" label="Market Insights" tagLine="Discover key market trends, supplier dynamics, and industry insights for this category." />

                {loading ? (
                    <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                        {[...Array(3)].map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        minHeight: {
                                            xs: 190,
                                            sm: 210,
                                            md: 230,
                                        },
                                        borderRadius: { xs: 3, md: 4 },
                                        p: { xs: 2.25, sm: 2.5, md: 3 },
                                        border: "1px solid",
                                        borderColor: "divider",
                                        bgcolor: "background.paper",
                                        boxShadow:
                                            "0 14px 36px rgba(59,48,39,0.06)",
                                    }}
                                >
                                    <Skeleton
                                        variant="rounded"
                                        width={58}
                                        height={58}
                                        sx={{
                                            borderRadius: 3,
                                            mb: 2.5,
                                            bgcolor: "primary.light",
                                        }}
                                    />

                                    <Skeleton
                                        variant="text"
                                        width="48%"
                                        height={48}
                                        sx={{ bgcolor: "primary.light" }}
                                    />

                                    <Skeleton
                                        variant="text"
                                        width="70%"
                                        height={26}
                                        sx={{ bgcolor: "primary.light" }}
                                    />

                                    <Skeleton
                                        variant="text"
                                        width="92%"
                                        height={22}
                                        sx={{ bgcolor: "primary.light" }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 2.5, md: 3 }}
                        justifyContent="center"
                    >
                        {categoryStats.map((stat) => (
                            <Grid
                                size={{ xs: 12, sm: 6, lg: 4 }}
                                key={stat.label}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        minHeight: {
                                            xs: 190,
                                            sm: 215,
                                            md: 235,
                                        },
                                        p: {
                                            xs: 2.25,
                                            sm: 2.5,
                                            md: 3,
                                        },
                                        borderRadius: { xs: 3, md: 4 },
                                        position: "relative",
                                        overflow: "hidden",
                                        bgcolor: "background.paper",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        boxShadow:
                                            "0 14px 36px rgba(59,48,39,0.07)",
                                        transition:
                                            "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",

                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(135deg, rgba(167,123,88,0.12), rgba(232,216,193,0.38))",
                                            opacity: 0,
                                            transition: "opacity 0.35s ease",
                                        },

                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: 5,
                                            background:
                                                "linear-gradient(90deg, #A77B58, #5F4B3B)",
                                            transform: "scaleX(0)",
                                            transformOrigin: "left",
                                            transition: "transform 0.35s ease",
                                        },

                                        "&:hover": {
                                            transform: {
                                                xs: "none",
                                                md: "translateY(-8px)",
                                            },
                                            borderColor: "primary.main",
                                            boxShadow:
                                                "0 24px 58px rgba(59,48,39,0.14)",
                                        },

                                        "&:hover::before": {
                                            opacity: 1,
                                        },

                                        "&:hover::after": {
                                            transform: "scaleX(1)",
                                        },

                                        "&:hover .statIcon": {
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            transform: {
                                                xs: "none",
                                                md: "scale(1.08) rotate(-5deg)",
                                            },
                                        },

                                        "&:hover .statValue": {
                                            color: "primary.dark",
                                        },

                                        "&:hover .circleDecor": {
                                            transform: {
                                                xs: "none",
                                                md: "scale(1.35)",
                                            },
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        className="circleDecor"
                                        sx={{
                                            position: "absolute",
                                            right: { xs: -55, md: -42 },
                                            top: { xs: -55, md: -42 },
                                            width: { xs: 130, md: 150 },
                                            height: { xs: 130, md: 150 },
                                            borderRadius: "50%",
                                            background:
                                                "radial-gradient(circle, rgba(167,123,88,0.22), transparent 68%)",
                                            opacity: 0.6,
                                            transition:
                                                "transform 0.4s ease, opacity 0.4s ease",
                                        }}
                                    />

                                    <Stack
                                        spacing={{ xs: 2, md: 2.5 }}
                                        sx={{
                                            position: "relative",
                                            zIndex: 1,
                                            height: "100%",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="flex-start"
                                            justifyContent="space-between"
                                            spacing={1.5}
                                        >
                                            <Box
                                                className="statIcon"
                                                sx={{
                                                    width: {
                                                        xs: 50,
                                                        sm: 54,
                                                        md: 60,
                                                    },
                                                    height: {
                                                        xs: 50,
                                                        sm: 54,
                                                        md: 60,
                                                    },
                                                    minWidth: {
                                                        xs: 50,
                                                        sm: 54,
                                                        md: 60,
                                                    },
                                                    borderRadius: {
                                                        xs: 2.5,
                                                        md: 3,
                                                    },
                                                    bgcolor: "primary.light",
                                                    color: "primary.dark",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    transition:
                                                        "all 0.35s ease",
                                                    boxShadow:
                                                        "inset 0 0 0 1px rgba(167,123,88,0.18)",

                                                    "& svg": {
                                                        fontSize: {
                                                            xs: 26,
                                                            sm: 28,
                                                            md: 31,
                                                        },
                                                    },
                                                }}
                                            >
                                                {stat.icon}
                                            </Box>

                                            <Typography
                                                sx={{
                                                    px: { xs: 1.1, md: 1.4 },
                                                    py: { xs: 0.45, md: 0.55 },
                                                    borderRadius: 99,
                                                    bgcolor:
                                                        "rgba(232,216,193,0.72)",
                                                    color: "primary.dark",
                                                    fontSize: {
                                                        xs: "0.68rem",
                                                        sm: "0.72rem",
                                                        md: "0.75rem",
                                                    },
                                                    fontWeight: 800,
                                                    letterSpacing: 0.3,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                Active
                                            </Typography>
                                        </Stack>

                                        <Box>
                                            <Typography
                                                className="statValue"
                                                sx={{
                                                    fontWeight: 900,
                                                    color: "text.primary",
                                                    letterSpacing: {
                                                        xs: "-0.5px",
                                                        md: "-1.5px",
                                                    },
                                                    fontSize: {
                                                        xs: "2rem",
                                                        sm: "2.25rem",
                                                        md: "2.65rem",
                                                    },
                                                    lineHeight: 1.05,
                                                    transition: "color 0.3s ease",
                                                }}
                                            >
                                                {stat.value}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        color: "primary.main",
                                                        fontWeight: 900,
                                                    }}
                                                >
                                                    +
                                                </Box>
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: { xs: 1.1, md: 1.5 },
                                                    color: "text.primary",
                                                    fontWeight: 800,
                                                    fontSize: {
                                                        xs: "0.95rem",
                                                        sm: "1rem",
                                                        md: "1.05rem",
                                                    },
                                                    lineHeight: 1.35,
                                                }}
                                            >
                                                {stat.label}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.8,
                                                    color: "text.secondary",
                                                    fontSize: {
                                                        xs: "0.82rem",
                                                        sm: "0.86rem",
                                                        md: "0.9rem",
                                                    },
                                                    lineHeight: {
                                                        xs: 1.5,
                                                        md: 1.6,
                                                    },
                                                }}
                                            >
                                                {stat.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Box>
    );
}