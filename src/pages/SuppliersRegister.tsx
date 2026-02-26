import { Box, Button, Grid, List, ListItem, ListItemText, MenuItem, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function SuppliersRegister() {

    const [value, setValue] = useState(0);

    const handleChange = (_: any, newValue: number) => {
        setValue(newValue);
    };

    const tabData = [
        [
            "Project Research report",
            "Turn-key project setup",
            "Infrastructure & Dedicated staff development",
            "Vendor & Procurement setup",
            "Brand inception – Product – service & offer support",
            "Billing on Joint account system",
        ],
        [
            "Quality control supervision",
            "Order follow-up",
            "Buyer coordination",
            "Production monitoring",
            "Dispatch management",
            "Payment coordination",
        ],
        [
            "Market research & analysis",
            "New buyer development",
            "Brand promotion",
            "Export marketing assistance",
            "Lead generation",
            "Sales expansion strategy",
        ],
    ];

    const benefits = [
        "Complete Quality management assistance",
        "Market research & mapping service",
        "Confirm Order based business",
        "Lucrative live sales & capacity expansion opportunity",
        "Transfer price or profit sharing model",
        "Total marketing assistance",
        "Export Order processing and documentation",
    ];

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            <img src="https://sourceseas.itcoders.in/img/front-end/supplier.jpg" alt="Quality Policies" style={{ width: '100%', height: 'auto' }} />
            <Box textAlign="center" mb={4}>
                <Typography variant="h6">Welcome to</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    sourceseas.com
                </Typography>
                <Typography variant="subtitle1">
                    Supplying & Tie-up Benefits at Sourceseas
                </Typography>
            </Box>

            <Grid container spacing={4} maxWidth="1100px" mx="auto">
                <Grid size={{ xs: 12, md: 6 }} >
                    <Paper sx={{ p: 3 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="First Name" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Last Name" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Firm Name" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Email" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Supplier City" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth label="Supplier State" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Website" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField fullWidth label="Phone" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Select Service"
                                    size="small"
                                >
                                    <MenuItem value="agri">which services you interested into</MenuItem>
                                    <MenuItem value="Indenting">Indenting</MenuItem>
                                    <MenuItem value="On-behalf">On-behalf</MenuItem>
                                    <MenuItem value="Market-Development">Market-Development</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12 }} textAlign="center">
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "#3E3126",
                                        px: 5,
                                        "&:hover": { bgcolor: "#2c231c" },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <List>
                            {benefits.map((item, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        borderBottom:
                                            index !== benefits.length - 1
                                                ? "1px solid #ddd"
                                                : "none",
                                    }}
                                >
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={6} textAlign="center">
                <img
                    src="https://sourceseas.itcoders.in/img/front-end/product_status_options1.jpg"
                    alt="Supplier Services"
                    style={{ width: "100%", maxWidth: "1100px" }}
                />
            </Box>

            <Box sx={{ maxWidth: "1100px", mx: "auto", mt: 6 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                >
                    {["Indenting", "On-behalf", "Market Development Assistance"].map(
                        (label, index) => (
                            <Tab
                                key={index}
                                label={label}
                                sx={{
                                    minHeight: 48,
                                    textTransform: "none",
                                    fontWeight: 500,
                                    bgcolor:
                                        value === index
                                            ? "#F4A62A" : "#d8cfc6",
                                    color: value === index ? "#fff" : "#000",
                                }}
                            />
                        )
                    )}
                </Tabs>

                <Box sx={{ backgroundColor: "#e5ded6" }}>
                    {tabData[value].map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                py: 2,
                                textAlign: "center",
                                borderBottom:
                                    index !== tabData[value].length - 1
                                        ? "1px solid #cfc6bd"
                                        : "none",
                            }}
                        >
                            <Typography variant="body1">{item}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}