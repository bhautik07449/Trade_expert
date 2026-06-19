import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

export default function EconomicStanding() {

    const economicItems = [
        { label: "GDP", value: "18" },
        { label: "Growth", value: "20" },
        { label: "Export", value: "115" },
        { label: "Import", value: "35" }
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr",
                },
                gap: 3,
                bgcolor: "white"
            }}
        >
            <Card
                elevation={0}
                sx={{
                    bgcolor: "transparent",
                }}
            >
                <CardContent>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ mb: 2, color: "secondary.main" }}
                    >
                        Country Economic Standing
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 1.5,
                            mb: 2,
                        }}
                    >
                        {(Array.isArray(economicItems) ? economicItems : []).map((item, index) => (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        height: 42,
                                        borderRadius: 1,
                                        bgcolor: "primary.light",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 0.5
                                    }}
                                >
                                    <Typography variant="body2" fontWeight={600}>
                                        {item.value}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" color="text.secondary" align="center" display="block">
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ mb: 2, color: "secondary.main" }}
                    >
                        Registered Accounts
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 2,
                        }}
                    >
                        <MiniChart label="Buyer" value="120" />
                        <MiniChart label="Seller" value="120" />
                        <MiniChart label="Both" value="120" />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

function MiniChart({ label = "Buyer", value = "120" }: { label?: string, value?: string }) {
    return (
        <Box>
            <Box
                sx={{
                    height: 42,
                    borderRadius: 1,
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 0.5,
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    {value}
                </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" align="center" display="block">
                {label}
            </Typography>
        </Box>
    );
}