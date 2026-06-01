import LabelTitle from "../../commonUI/labelTitle";
import {
    Box,
    Grid,
    Paper,
    Skeleton,
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CategoryIcon from "@mui/icons-material/Category";

const profileCards = [
    {
        value: "BSE",
        label: "BSE Code",
        description: "Bombay Stock Exchange commodity reference code.",
        icon: <AccountBalanceIcon />,
    },
    {
        value: "NSE",
        label: "NSE Code",
        description: "National Stock Exchange commodity reference code.",
        icon: <ShowChartIcon />,
    },
    {
        value: "Other",
        label: "Other Code",
        description: "Additional commodity or market reference code.",
        icon: <CategoryIcon />,
    },
];

export default function ComodityProfile({
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
                py: { xs: 4, sm: 5, md: 8 },
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
                <LabelTitle title="Sector" label="Performance" tagLine="Analyze the performance of commodities within this sector." />

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
                        {profileCards.map((card) => (
                            <Grid
                                size={{ xs: 12, sm: 6, lg: 4 }}
                                key={card.label}
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

                                        "&:hover .profileIcon": {
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            transform: {
                                                xs: "none",
                                                md: "scale(1.08) rotate(-5deg)",
                                            },
                                        },

                                        "&:hover .profileValue": {
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
                                                className="profileIcon"
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
                                                {card.icon}
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
                                                Code
                                            </Typography>
                                        </Stack>

                                        <Box>
                                            <Typography
                                                className="profileValue"
                                                sx={{
                                                    fontWeight: 900,
                                                    color: "text.primary",
                                                    letterSpacing: {
                                                        xs: "-0.5px",
                                                        md: "-1px",
                                                    },
                                                    fontSize: {
                                                        xs: "1.8rem",
                                                        sm: "2rem",
                                                        md: "2.45rem",
                                                    },
                                                    lineHeight: 1.05,
                                                    transition: "color 0.3s ease",
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {card.value}
                                            </Typography>

                                            <Divider
                                                sx={{
                                                    my: { xs: 1.2, md: 1.6 },
                                                    borderColor: "divider",
                                                }}
                                            />

                                            <Typography
                                                sx={{
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
                                                {card.label}
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
                                                {card.description}
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