import {
    Box,
    Typography,
    Container,
    Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import SecurityIcon from "@mui/icons-material/Security";
import DiamondIcon from "@mui/icons-material/Diamond";
import Title from "../commonUI/labelTitle";

export default function Values() {
    const data = [
        { title: "LOGISTIC SERVICES", icon: LocalShippingIcon },
        { title: "CUSTOMIZED PACKAGING SERVICES", icon: InventoryIcon },
        { title: "ALL TRANSIT RELATED INSURANCE", icon: SecurityIcon },
        { title: "THIRD PARTY INSPECTION", icon: DiamondIcon },
    ];

    return (
        <Box sx={{ py: { xs: 5, md: 8 }, width: "100%", bgcolor: "#f5efe9", boxSizing: "border-box" }}>
            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
                <Title title="Value Added" label="Services" />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "680px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.88rem", sm: "1rem" },
                        lineHeight: 1.5,
                    }}
                >
                    We provide a comprehensive suite of value-added services designed to support and enhance your trading experience on our platform.
                </Typography>

                <Grid container spacing={4} mt={2}>
                    {data.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: 3,
                                    transition: "0.3s",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: { xs: 60, md: 80 },
                                        height: { xs: 60, md: 80 },
                                        borderRadius: "50%",
                                        bgcolor: "#7ac943",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mx: "auto",
                                        mb: 3,
                                    }}
                                >
                                    <item.icon
                                        sx={{
                                            color: "#fff",
                                            fontSize: { xs: 28, md: 36 },
                                        }}
                                    />
                                </Box>

                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: "14px",
                                            sm: "15px",
                                            md: "16px",
                                        },
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}