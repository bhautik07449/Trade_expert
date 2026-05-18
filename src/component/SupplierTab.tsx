import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SupplierTab() {
    const navigate = useNavigate();

    const tab = [
        {
            label: "Become Authorized",
            value: "Supplier",
            button: "Register",
            link: "/suppliers/register",
        },
        {
            label: "Wants to",
            value: "source from us",
            button: "Login or Register",
            link: "/login",
        },
    ];

    return (
        <Box sx={{ py: { xs: 5, md: 8 }, width: "100%", bgcolor: "#fff", boxSizing: "border-box" }}>
            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 } }}>
                <Grid container spacing={4}>
                    {tab.map((item, index) => (
                        <Grid size={{ xs: 12, md: 6 }} key={index}>
                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 3,
                                    p: { xs: 4, md: 6 },
                                    textAlign: "center",
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                <Box mb={4}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "#8BC34A",
                                            fontWeight: 500,
                                            borderBottom: "3px solid #8BC34A",
                                            pb: "4px",
                                            fontSize: {
                                                xs: "18px",
                                                md: "22px",
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Typography>{" "}
                                    <Typography
                                        component="span"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: {
                                                xs: "18px",
                                                md: "22px",
                                            },
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                    sx={{
                                        bgcolor: "#f4a024",
                                        py: 1.3,
                                        fontSize: {
                                            xs: "14px",
                                            md: "16px",
                                        },
                                        textTransform: "none",
                                        "&:hover": {
                                            bgcolor: "#e0931f",
                                        },
                                    }}
                                    onClick={() => navigate(item.link)}
                                >
                                    {item.button}
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}