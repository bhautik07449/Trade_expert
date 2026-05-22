import {
    Box,
    Grid,
    Skeleton,
    Typography,
    Paper,
    Stack,
    Chip,
} from "@mui/material"
import LabelTitle from "../../commonUI/labelTitle"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PublicIcon from "@mui/icons-material/Public"
import BarChartIcon from "@mui/icons-material/BarChart"
import InsightsIcon from "@mui/icons-material/Insights"

export default function Analytical({
    analyticsData,
    loading,
}: {
    analyticsData: any[]
    loading: boolean
}) {
    const icons = [TrendingUpIcon, PublicIcon, BarChartIcon, InsightsIcon]

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 5, md: 8 },
                bgcolor: "background.default",
                background:
                    "linear-gradient(180deg, #F5F0EB 0%, #FFFFFF 48%, #F5F0EB 100%)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 80,
                    left: -120,
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
                    right: -120,
                    bottom: 40,
                    width: 280,
                    height: 280,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(95, 75, 59, 0.16), transparent 68%)",
                    filter: "blur(16px)",
                }}
            />

            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <LabelTitle title="Analytical" label="Dashboard" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "720px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.92rem", sm: "1rem" },
                        lineHeight: 1.8,
                    }}
                >
                    Monitor trading performance, global orders, procurement activity, and
                    marketplace growth through real-time business insights.
                </Typography>

                {loading ? (
                    <Grid container spacing={3}>
                        {[...Array(6)].map((_, index) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 4,
                                        p: 3,
                                        minHeight: 190,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        bgcolor: "background.paper",
                                        boxShadow: "0 10px 28px rgba(59, 48, 39, 0.05)",
                                    }}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={56}
                                        height={56}
                                        sx={{
                                            mb: 2,
                                            bgcolor: "primary.light",
                                        }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="55%"
                                        height={28}
                                        sx={{ bgcolor: "primary.light" }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="75%"
                                        height={52}
                                        sx={{ bgcolor: "primary.light" }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={90}
                                        height={28}
                                        sx={{
                                            bgcolor: "primary.light",
                                            borderRadius: 99,
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={3} justifyContent="center">
                        {analyticsData?.map((stat, index) => {
                            const Icon = icons[index % icons.length]

                            return (
                                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={stat.id}>
                                    <Paper
                                        id={`analytical-stat-card-${stat.id}`}
                                        elevation={0}
                                        sx={{
                                            height: "100%",
                                            minHeight: 190,
                                            p: { xs: 2.5, sm: 3 },
                                            borderRadius: 4,
                                            position: "relative",
                                            overflow: "hidden",
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
                                                height: 5,
                                                background: "linear-gradient(90deg, #A77B58, #5F4B3B)",
                                                transform: "scaleX(0)",
                                                transformOrigin: "left",
                                                transition: "transform 0.35s ease",
                                            },

                                            "&:hover": {
                                                transform: "translateY(-8px)",
                                                borderColor: "primary.main",
                                                boxShadow: "0 24px 55px rgba(59, 48, 39, 0.14)",
                                            },

                                            "&:hover::before": {
                                                opacity: 1,
                                            },

                                            "&:hover::after": {
                                                transform: "scaleX(1)",
                                            },

                                            "&:hover .statIcon": {
                                                transform: "scale(1.12) rotate(-6deg)",
                                                bgcolor: "primary.main",
                                                color: "#fff",
                                            },

                                            "&:hover .statValue": {
                                                color: "primary.dark",
                                            },

                                            "&:hover .circleDecor": {
                                                transform: "scale(1.35)",
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <Box
                                            className="circleDecor"
                                            sx={{
                                                position: "absolute",
                                                right: -34,
                                                top: -34,
                                                width: 130,
                                                height: 130,
                                                borderRadius: "50%",
                                                background:
                                                    "radial-gradient(circle, rgba(167,123,88,0.22), transparent 68%)",
                                                opacity: 0.55,
                                                transition: "all 0.4s ease",
                                            }}
                                        />

                                        <Stack
                                            spacing={2.4}
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
                                                spacing={2}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontWeight: 700,
                                                            fontSize: { xs: "0.82rem", md: "0.9rem" },
                                                            textTransform: "uppercase",
                                                            letterSpacing: 0.7,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        {stat?.title}
                                                    </Typography>

                                                    <Typography
                                                        className="statValue"
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 900,
                                                            color: "text.primary",
                                                            letterSpacing: "-1px",
                                                            fontSize: { xs: "2rem", sm: "2.35rem" },
                                                            lineHeight: 1.1,
                                                            transition: "color 0.3s ease",
                                                        }}
                                                    >
                                                        {stat?.value}
                                                    </Typography>
                                                </Box>

                                                <Box
                                                    className="statIcon"
                                                    sx={{
                                                        width: 56,
                                                        height: 56,
                                                        minWidth: 56,
                                                        borderRadius: 3,
                                                        bgcolor: "primary.light",
                                                        color: "primary.dark",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.35s ease",

                                                        "& svg": {
                                                            fontSize: 30,
                                                        },
                                                    }}
                                                >
                                                    <Icon />
                                                </Box>
                                            </Stack>

                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                spacing={2}
                                            >
                                                <Chip
                                                    icon={<PublicIcon sx={{ fontSize: "16px" }} />}
                                                    label={stat?.country}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: "primary.light",
                                                        color: "primary.dark",
                                                        fontWeight: 800,
                                                        borderRadius: 2,
                                                        "& .MuiChip-icon": {
                                                            color: "primary.dark",
                                                        },
                                                    }}
                                                />

                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "text.secondary",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Live Metric
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}
            </Box>
        </Box>
    )
}