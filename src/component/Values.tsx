import { Box, Button, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import SecurityIcon from "@mui/icons-material/Security";
import DiamondIcon from "@mui/icons-material/Diamond";
import Title from "../commonUI/labelTitle"

export default function Values() {
    const data = [
        { title: "LOGISTIC SERVICES", icon: <LocalShippingIcon /> },
        { title: "CUSTOMIZED PACKAGING SERVICES", icon: <InventoryIcon /> },
        { title: "ALL TRANSIT RELATED INSURANCE", icon: <SecurityIcon /> },
        { title: "THIRD PARTY INSPECTION", icon: <DiamondIcon /> },
    ];

    return (
        <>
            <Box sx={{ py: 6, backgroundColor: "#f5efe9" }}>
                <Title title="Value added" label=" Services" />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: 4,
                        maxWidth: "1200px",
                        mx: "auto",
                        textAlign: "center",
                    }}
                >
                    {data.map((item, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    backgroundColor: "#7ac943",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mx: "auto",
                                    my: 4,
                                }}
                            >
                                {item.icon &&
                                    <Box sx={{ color: "#fff", fontSize: 36 }}>
                                        {item.icon}
                                    </Box>
                                }
                            </Box>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {item.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 4,
                maxWidth: "1100px",
                mx: "auto",
                textAlign: "center",
                py: 6
            }}>
                {[0, 1].map((_, index) => (
                    <Box
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: "4px",
                            p: 5,
                            textAlign: "center",
                            bgcolor: "#fff",
                        }}
                    >
                        <Box sx={{ mb: 5 }}>
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{
                                    color: "#8BC34A",
                                    fontWeight: 600,
                                    borderBottom: "3px solid #8BC34A",
                                    pb: "4px",
                                }}
                            >
                                Wants to
                            </Typography>{" "}
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{ color: "#1a1a1a", fontWeight: 600 }}
                            >
                                source from us
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#f4a024",
                                px: 5,
                                py: 1.2,
                                textTransform: "none",
                                fontSize: "16px",
                                "&:hover": {
                                    backgroundColor: "#e0931f",
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                ))}
            </Box>
        </>
    );
}
