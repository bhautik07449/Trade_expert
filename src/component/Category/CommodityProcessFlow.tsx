import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SouthIcon from "@mui/icons-material/South";
import LabelTitle from "../../commonUI/labelTitle";

const processSteps = [
    "Raw Material",
    "Processing",
    "Quality Check",
    "Distribution",
    "Retail",
    "Storage",
    "Transport",
    "End User",
];

type CommodityProcessFlowProps = {
    steps?: string[];
    title?: string;
    label?: string;
    itemsPerRow?: number;
};

export default function CommodityProcessFlow({
    steps = processSteps,
    title = "Industrial Commodity",
    label = "Process",
    itemsPerRow = 4,
}: CommodityProcessFlowProps) {
    const rows = steps.reduce<string[][]>((acc, item, index) => {
        const rowIndex = Math.floor(index / itemsPerRow);

        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }

        acc[rowIndex].push(item);
        return acc;
    }, []);

    const renderFlowRow = (rowSteps: string[]) => {
        return (
            <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 1.5, md: 2 }}
                sx={{ width: "100%" }}
            >
                {rowSteps.map((step, index) => (
                    <Stack
                        key={`${step}-${index}`}
                        direction={{ xs: "column", md: "row" }}
                        alignItems="center"
                        spacing={{ xs: 1.2, md: 2 }}
                        sx={{
                            flex: { md: 1 },
                            width: { xs: "100%", md: "auto" },
                            minWidth: 0,
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                minHeight: { xs: 68, sm: 76, md: 82 },
                                px: { xs: 2, sm: 2.5, md: 3 },
                                py: { xs: 2, md: 2.2 },
                                borderRadius: 4,
                                border: "1px solid",
                                borderColor: "divider",
                                bgcolor: "background.paper",
                                boxShadow: "0 12px 30px rgba(59,48,39,0.06)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                position: "relative",
                                overflow: "hidden",
                                transition: "all 0.3s ease",

                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(135deg, rgba(167,123,88,0.08), rgba(232,216,193,0.22))",
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                },

                                "&:hover": {
                                    transform: { xs: "none", md: "translateY(-4px)" },
                                    borderColor: "primary.main",
                                    boxShadow: "0 18px 38px rgba(59,48,39,0.12)",
                                },

                                "&:hover::before": {
                                    opacity: 1,
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    position: "relative",
                                    zIndex: 1,
                                    color: "text.primary",
                                    fontWeight: 800,
                                    fontSize: {
                                        xs: "0.9rem",
                                        sm: "0.96rem",
                                        md: "1rem",
                                    },
                                    lineHeight: 1.4,
                                    wordBreak: "break-word",
                                }}
                            >
                                {step}
                            </Typography>
                        </Paper>

                        {index !== rowSteps.length - 1 && (
                            <>
                                <Box
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "primary.main",
                                        minWidth: 34,
                                    }}
                                >
                                    <ArrowForwardIcon sx={{ fontSize: 30 }} />
                                </Box>

                                <Box
                                    sx={{
                                        display: { xs: "flex", md: "none" },
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "primary.main",
                                        height: 16,
                                    }}
                                >
                                    <SouthIcon sx={{ fontSize: 24 }} />
                                </Box>
                            </>
                        )}
                    </Stack>
                ))}
            </Stack>
        );
    };

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 4, sm: 5, md: 8 },
                position: "relative",
                overflow: "hidden",
                bgcolor: "background.default",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 5, lg: 6 },
                }}
            >
                <LabelTitle title={title} label={label} />

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: 760,
                        mx: "auto",
                        mb: { xs: 4, md: 5 },
                        mt: { xs: -1, md: -2 },
                        fontSize: {
                            xs: "0.86rem",
                            sm: "0.94rem",
                            md: "1rem",
                        },
                        lineHeight: 1.75,
                    }}
                >
                    Understand the commodity workflow from sourcing to delivery
                    through a simple step-by-step process flow.
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: { xs: 3, md: 4 },
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        boxShadow: "0 16px 40px rgba(59,48,39,0.07)",
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "text.primary",
                            fontWeight: 900,
                            fontSize: {
                                xs: "1.05rem",
                                sm: "1.15rem",
                                md: "1.3rem",
                            },
                            mb: { xs: 3, md: 4 },
                        }}
                    >
                        Understand Commodity Process
                    </Typography>

                    <Stack spacing={{ xs: 3, md: 4 }}>
                        {rows.map((row, rowIndex) => (
                            <Box key={rowIndex}>
                                {renderFlowRow(row)}

                                {rowIndex !== rows.length - 1 && (
                                    <Box
                                        sx={{
                                            display: { xs: "none", md: "flex" },
                                            justifyContent: "center",
                                            color: "primary.main",
                                            mt: 2,
                                        }}
                                    >
                                        <SouthIcon sx={{ fontSize: 28 }} />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}