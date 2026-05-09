import { Box, Button, Grid, List, ListItem, ListItemText, MenuItem, Paper, Tab, Tabs, TextField, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";

export default function SuppliersRegister() {

    const [value, setValue] = useState(0);

    const handleChange = (_: any, newValue: number) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            firmName: "",
            email: "",
            address: "",
            city: "",
            state: "",
            website: "",
            phone: "",
            service: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            firmName: Yup.string().required("Firm name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            address: Yup.string().required("Address is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Enter valid 10 digit number")
                .required("Phone is required"),
            service: Yup.string().required("Please select a service"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {

                const res = await CMSservice.addSuppliers(values)

                if (res) {
                    toast.success(res?.data?.message || "Supplier Account created successfully")
                    resetForm()
                }
            } catch (error) {
                toast.error("Supplier Account was not created, Please try again.")
            }
        },
    });


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
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        size="small"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        size="small"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Firm Name"
                                        name="firmName"
                                        size="small"
                                        value={formik.values.firmName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.firmName && Boolean(formik.errors.firmName)}
                                        helperText={formik.touched.firmName && formik.errors.firmName}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        multiline
                                        rows={3}
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="City"
                                        name="city"
                                        size="small"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="State"
                                        name="state"
                                        size="small"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.state && Boolean(formik.errors.state)}
                                        helperText={formik.touched.state && formik.errors.state}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Website"
                                        name="website"
                                        size="small"
                                        value={formik.values.website}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Phone"
                                        name="phone"
                                        size="small"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Select Service"
                                        name="service"
                                        size="small"
                                        value={formik.values.service}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.service && Boolean(formik.errors.service)}
                                        helperText={formik.touched.service && formik.errors.service}
                                    >
                                        <MenuItem value="">Select Service</MenuItem>
                                        <MenuItem value="Indenting">Indenting</MenuItem>
                                        <MenuItem value="On-behalf">On-behalf</MenuItem>
                                        <MenuItem value="Market-Development">Market Development</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid size={{ xs: 12 }} textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={formik.isSubmitting}
                                        startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                                        sx={{
                                            bgcolor: "#3E3126",
                                            px: 5,
                                            "&:hover": { bgcolor: "#2c231c" },
                                        }}
                                    >
                                        {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
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