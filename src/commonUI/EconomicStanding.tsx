import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function EconomicStanding() {

    const registerAccount = [
        { label: "Buyer", value: "18" },
        { label: "Seller", value: "20" },
        { label: "Both", value: "115" }
    ];

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Card
                elevation={0}
                sx={{
                    bgcolor: "white",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
                    overflow: "hidden"
                }}
            >
                <CardContent
                    sx={{
                        p: { xs: 2.5, sm: 3 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 3, md: 4 }
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 3, color: "secondary.main", display: "flex", alignItems: "center", gap: 1 }}
                        >
                            Platform stature
                        </Typography>

                        <Grid container spacing={3} justifyContent="center">
                            {registerAccount.map((item, index) => (
                                <Grid size={{ xs: 6, lg: 3 }}>
                                    <Box
                                        key={index}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "action.hover",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.2s ease-in-out",
                                            cursor: "default",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                                                bgcolor: "white",
                                                borderColor: "primary.main"
                                            }
                                        }}
                                    >
                                        <Typography variant="h5" fontWeight={800} color="primary.main">
                                            {item.value}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                                            {item.label}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Box >
    )
}