import {
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
    title = "Sector value",
    label = "Chain",
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

    const renderStepCard = (step: string) => (
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
    );

    const renderDesktopRow = (
        rowSteps: string[],
        rowIndex: number
    ) => {
        const isReverse = rowIndex % 2 === 1;
        const displaySteps = isReverse ? [...rowSteps].reverse() : rowSteps;
        const ArrowIcon = isReverse ? ArrowBackIcon : ArrowForwardIcon;

        return (
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{
                    display: { xs: "none", md: "flex" },
                    width: "100%",
                }}
            >
                {(Array.isArray(displaySteps) ? displaySteps : []).map((step, index) => (
                    <Stack
                        key={`${step}-${index}`}
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                        {renderStepCard(step)}

                        {index !== displaySteps.length - 1 && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "primary.main",
                                    minWidth: 34,
                                }}
                            >
                                <ArrowIcon sx={{ fontSize: 30 }} />
                            </Box>
                        )}
                    </Stack>
                ))}
            </Stack>
        );
    };

    const renderMobileFlow = () => (
        <Stack
            spacing={1.2}
            sx={{
                display: { xs: "flex", md: "none" },
                width: "100%",
            }}
        >
            {(Array.isArray(steps) ? steps : []).map((step, index) => (
                <Box key={`${step}-${index}`}>
                    {renderStepCard(step)}

                    {index !== steps.length - 1 && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                color: "primary.main",
                                my: 1,
                            }}
                        >
                            <SouthIcon sx={{ fontSize: 24 }} />
                        </Box>
                    )}
                </Box>
            ))}
        </Stack>
    );

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 6, md: 10 },
                position: "relative",
                overflow: "hidden",
                bgcolor: "background.default",
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, lg: 6 },
                }}
            >
                <LabelTitle title={title} label={label} tagLine="Understand the commodity workflow from sourcing to delivery through a simple step-by-step process flow." />

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

                    {renderMobileFlow()}

                    <Stack
                        spacing={2}
                        sx={{
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {(Array.isArray(rows) ? rows : []).map((row, rowIndex) => (
                            <Box key={rowIndex}>
                                {renderDesktopRow(row, rowIndex)}

                                {rowIndex !== rows.length - 1 && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent:
                                                rowIndex % 2 === 0
                                                    ? "flex-end"
                                                    : "flex-start",
                                            color: "primary.main",
                                            pr:
                                                rowIndex % 2 === 0
                                                    ? "11%"
                                                    : 0,
                                            pl:
                                                rowIndex % 2 === 1
                                                    ? "11%"
                                                    : 0,
                                            mt: 1.5,
                                            mb: 1.5,
                                        }}
                                    >
                                        <SouthIcon sx={{ fontSize: 30 }} />
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