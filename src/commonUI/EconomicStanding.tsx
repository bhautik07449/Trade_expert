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
                    {/* Country Economic Standing Section */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 3, color: "secondary.main", display: "flex", alignItems: "center", gap: 1 }}
                        >
                            Country Economic Standing
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                                gap: 2,
                            }}
                        >
                            {economicItems.map((item, index) => (
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
                            ))}
                        </Box>
                    </Box>

                    {/* Divider between sections */}
                    <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", md: "block" } }} />
                    <Divider sx={{ display: { xs: "block", md: "none" } }} />

                    {/* Registered Accounts Section */}
                    <Box sx={{ flex: 0.75 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 3, color: "secondary.main" }}
                        >
                            Registered Accounts
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                                gap: 2,
                            }}
                        >
                            <MiniChart label="Buyer" value="120" />
                            <MiniChart label="Seller" value="120" />
                            <MiniChart label="Both" value="120" />
                        </Box>
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