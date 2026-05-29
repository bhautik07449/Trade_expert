import {
    Box,
    Typography,
    Paper,
    Grid,
    Stack,
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";

const stateStandingData = [
    {
        name: "Maharashtra",
        value: 251,
    },
    {
        name: "Gujarat",
        value: 107,
    },
    {
        name: "Kerala",
        value: 301,
    },
    {
        name: "Punjab",
        value: 221,
    },
];

export default function StateStanding({
    category,
    loading = false,
}: {
    category?: string;
    loading?: boolean;
}) {

    const maxStateValue = Math.max(...stateStandingData.map((item) => item.value));

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                bgcolor: "white",
                py: { xs: 3, md: 4 }
            }}
        >
            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 },
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <LabelTitle title="State Standing" label="Contribution" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: 760,
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.92rem", sm: "1rem" },
                        lineHeight: 1.8,
                    }}
                >
                    State-wise market participation overview based on contribution count.
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        mt: { xs: 4, md: 5 },
                        p: { xs: 2.5, sm: 3.5, md: 4 },
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <Stack spacing={2.6}>
                            {stateStandingData.map((item, index) => {
                                const percentage =
                                    (item.value / maxStateValue) * 100;

                                return (
                                    <Box key={item.name}>
                                        <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid size={{ xs: 12, sm: 2.4 }}>
                                                <Typography
                                                    sx={{
                                                        color: "text.primary",
                                                        fontWeight: 800,
                                                        fontSize: {
                                                            xs: "0.92rem",
                                                            sm: "0.95rem",
                                                        },
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                            </Grid>

                                            <Grid size={{ xs: 9, sm: 8.2 }}>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: 18,
                                                        borderRadius: 99,
                                                        bgcolor:
                                                            "rgba(232,216,193,0.55)",
                                                        overflow: "hidden",
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            height: "100%",
                                                            width: `${percentage}%`,
                                                            borderRadius: 99,
                                                            background:
                                                                index % 2 === 0
                                                                    ? "linear-gradient(90deg, #A77B58, #7A5A3A)"
                                                                    : "linear-gradient(90deg, #B8A393, #5F4B3B)",
                                                            transition:
                                                                "width 0.5s ease",
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid size={{ xs: 3, sm: 1.4 }}>
                                                <Typography
                                                    sx={{
                                                        color: "primary.dark",
                                                        fontWeight: 900,
                                                        fontSize: {
                                                            xs: "0.9rem",
                                                            sm: "1rem",
                                                        },
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    ({item.value}+)
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}