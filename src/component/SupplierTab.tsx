import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LabelTitle from "../commonUI/labelTitle";

export default function SupplierTab() {
    const navigate = useNavigate();
    const theme = useTheme();

    const tab = [
        {
            label: "Join as",
            value: "Supplier",
            button: "Register",
            link: "/suppliers/register",
        },
        {
            label: "join as a service",
            value: "personnel",
            button: "Register",
            link: "/pages/career",
        },
        {
            label: "Join as",
            value: "a Buyer",
            button: "Login or Register",
            link: "/login",
        },
    ];

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                width: "100%",
                bgcolor: "white",
                boxSizing: "border-box",
            }}
        >
            <LabelTitle title="Join as a" label="private / public" tagLine="Choose the right option to join our platform and start trading." />

            <Box
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    mt: { xs: 3, md: 4 },
                }}
            >
                <Grid container spacing={4}>
                    {(Array.isArray(tab) ? tab : []).map((item, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Box
                                sx={{
                                    height: "100%",
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRadius: 3,
                                    p: { xs: 3, sm: 4 },
                                    textAlign: "center",
                                    bgcolor: "background.paper",
                                    boxShadow: "0 8px 24px rgba(59, 48, 39, 0.06)",
                                    transition: "all 0.3s ease",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "5px",
                                        bgcolor: "primary.main",
                                    },
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: "0 14px 34px rgba(59, 48, 39, 0.14)",
                                        borderColor: "primary.main",
                                    },
                                }}
                            >
                                <Box mb={4}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "primary.main",
                                            fontWeight: 600,
                                            borderBottom: `3px solid ${theme.palette.primary.light}`,
                                            pb: "4px",
                                            fontSize: {
                                                xs: "16px",
                                                md: "20px",
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Typography>{" "}
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 600,
                                            fontSize: {
                                                xs: "16px",
                                                md: "20px",
                                            },
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        py: 1.3,
                                        borderRadius: 2,
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: "14px",
                                            md: "16px",
                                        },
                                        textTransform: "none",
                                        boxShadow: "none",
                                        "&:hover": {
                                            bgcolor: "primary.dark",
                                            boxShadow: "0 6px 18px rgba(122, 90, 58, 0.28)",
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
            </Box>
        </Box>
    );
}