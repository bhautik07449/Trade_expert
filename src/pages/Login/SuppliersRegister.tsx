import {
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    CircularProgress,
    Stack,
    Divider,
    Chip,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import BusinessIcon from "@mui/icons-material/Business"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LanguageIcon from "@mui/icons-material/Language"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import CMSservice from "../../service/cms.service"
import { toast } from "react-toastify"
import { useNavigate, useSearchParams } from "react-router-dom"
import AbcTradeoffer from "../../component/AbcTradeoffer"
import UpcommingFeatures from "../../commonUI/UpcommingFeatures"

export default function SuppliersRegister() {
    const [searchParams] = useSearchParams();
    const country = searchParams.get("country");

    const [value, setValue] = useState(0)
    const navigate = useNavigate()

    const handleChange = (_: any, newValue: number) => {
        if (newValue === 2) {
            navigate("/market-development")
            return
        }
        setValue(newValue)
    }

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
            country: country,
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
                    toast.success(
                        res?.data?.message || "Supplier Account created successfully"
                    )
                    resetForm()
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Supplier Account was not created, Please try again.")
            }
        },
    })

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
    ]

    const benefits = [
        "Complete Quality management assistance",
        "Market research & mapping service",
        "Confirm Order based business",
        "Lucrative live sales & capacity expansion opportunity",
        "Transfer price or profit sharing model",
        "Total marketing assistance",
        "Export Order processing and documentation",
    ]

    return (
        <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 10 }}>
            <Box
                sx={{
                    width: "100%",
                    height: { xs: 220, sm: 300, md: 380 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/supplier.jpg"
                    alt="Supplier Banner"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.48)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: { xs: "30px", sm: "42px", md: "54px" },
                                textTransform: "capitalize",
                            }}
                        >
                            sourceseas.com
                        </Typography>

                        <Typography
                            sx={{
                                color: "#fff",
                                mt: 1.5,
                                fontSize: { xs: "15px", sm: "18px" },
                                fontWeight: 400,
                            }}
                        >
                            Supplying & Tie-up Benefits at Sourceseas
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                            useFlexGap
                            flexWrap="wrap"
                            sx={{ mt: 2.5 }}
                        >
                            <Chip
                                label="Indenting"
                                sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }}
                            />
                            <Chip
                                label="On-behalf"
                                sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }}
                            />
                            <Chip
                                label="Market Development"
                                sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }}
                            />
                        </Stack>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    mt: { xs: -5, md: -7 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Grid container spacing={3.5}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: { xs: 2.5, sm: 4 },
                                borderRadius: 4,
                                height: "100%",
                            }}
                        >
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        color: "#1f2937",
                                        fontSize: { xs: "24px", sm: "32px" },
                                    }}
                                >
                                    Supplier Registration
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        mt: 1,
                                        fontSize: { xs: "14px", sm: "15px" },
                                    }}
                                >
                                    Register your business and connect with Sourceseas supplier
                                    opportunities.
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                                <Grid container spacing={2.2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            size="small"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.firstName &&
                                                Boolean(formik.errors.firstName)
                                            }
                                            helperText={
                                                formik.touched.firstName && formik.errors.firstName
                                            }
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
                                            error={
                                                formik.touched.lastName &&
                                                Boolean(formik.errors.lastName)
                                            }
                                            helperText={
                                                formik.touched.lastName && formik.errors.lastName
                                            }
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
                                            error={
                                                formik.touched.firmName &&
                                                Boolean(formik.errors.firmName)
                                            }
                                            helperText={
                                                formik.touched.firmName && formik.errors.firmName
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <BusinessIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: "text.secondary" }}
                                                    />
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            size="small"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.email && Boolean(formik.errors.email)
                                            }
                                            helperText={formik.touched.email && formik.errors.email}
                                            InputProps={{
                                                startAdornment: (
                                                    <EmailIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: "text.secondary" }}
                                                    />
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Phone"
                                            name="phone"
                                            size="small"
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.phone && Boolean(formik.errors.phone)
                                            }
                                            helperText={formik.touched.phone && formik.errors.phone}
                                            InputProps={{
                                                startAdornment: (
                                                    <PhoneIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: "text.secondary" }}
                                                    />
                                                ),
                                            }}
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
                                            error={
                                                formik.touched.address &&
                                                Boolean(formik.errors.address)
                                            }
                                            helperText={
                                                formik.touched.address && formik.errors.address
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <LocationOnIcon
                                                        fontSize="small"
                                                        sx={{
                                                            mr: 1,
                                                            mt: 1,
                                                            alignSelf: "flex-start",
                                                            color: "text.secondary",
                                                        }}
                                                    />
                                                ),
                                            }}
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
                                            error={
                                                formik.touched.state && Boolean(formik.errors.state)
                                            }
                                            helperText={formik.touched.state && formik.errors.state}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Website"
                                            name="website"
                                            size="small"
                                            placeholder="https://example.com"
                                            value={formik.values.website}
                                            onChange={formik.handleChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <LanguageIcon
                                                        fontSize="small"
                                                        sx={{ mr: 1, color: "text.secondary" }}
                                                    />
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Service"
                                            name="service"
                                            size="small"
                                            value={formik.values.service}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.service &&
                                                Boolean(formik.errors.service)
                                            }
                                            helperText={
                                                formik.touched.service && formik.errors.service
                                            }
                                        >
                                            <MenuItem value="">Select Service</MenuItem>
                                            <MenuItem value="Indenting">Indenting</MenuItem>
                                            <MenuItem value="On-behalf">On-behalf</MenuItem>
                                            <MenuItem value="Market-Development">
                                                Market Development
                                            </MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            fullWidth
                                            disabled={formik.isSubmitting}
                                            startIcon={
                                                formik.isSubmitting ? (
                                                    <CircularProgress size={20} color="inherit" />
                                                ) : null
                                            }
                                            sx={{
                                                mt: 1,
                                                py: 1.25,
                                                borderRadius: 2,
                                                textTransform: "none",
                                                fontSize: "16px",
                                                fontWeight: 700,
                                                bgcolor: "#3E3126",
                                                "&:hover": { bgcolor: "#2c231c" },
                                            }}
                                        >
                                            {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                        <Paper
                            elevation={4}
                            sx={{
                                p: { xs: 2.5, sm: 4 },
                                borderRadius: 4,
                                height: "100%",
                                bgcolor: "#fff",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    color: "#1f2937",
                                    fontSize: { xs: "24px", sm: "32px" },
                                }}
                            >
                                Supplier Benefits
                            </Typography>

                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    mt: 1,
                                    mb: 3,
                                    fontSize: { xs: "14px", sm: "15px" },
                                }}
                            >
                                Grow your business with quality, marketing and order support.
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <List disablePadding>
                                {benefits.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                        sx={{
                                            py: 1.4,
                                            borderBottom:
                                                index !== benefits.length - 1
                                                    ? "1px solid #edf0f5"
                                                    : "none",
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 34 }}>
                                            <CheckCircleIcon
                                                sx={{
                                                    color: "#F4A62A",
                                                    fontSize: 22,
                                                }}
                                            />
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{
                                                fontSize: "15px",
                                                fontWeight: 500,
                                                color: "#374151",
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Box component="section">
                <AbcTradeoffer country={country} />
            </Box>

            <Box component="section">
                <UpcommingFeatures />
            </Box>

            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    mt: 6,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 4,
                        overflow: "hidden",
                        bgcolor: "#fff",
                    }}
                >
                    <Box sx={{ p: { xs: 2.5, sm: 3 }, textAlign: "center" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: "#1f2937",
                                fontSize: { xs: "24px", sm: "32px" },
                            }}
                        >
                            Our Service Support
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                mt: 1,
                                fontSize: { xs: "14px", sm: "15px" },
                            }}
                        >
                            Choose a service category to view available supplier assistance.
                        </Typography>
                    </Box>

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        sx={{
                            borderTop: "1px solid #edf0f5",
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                        }}
                    >
                        {["Indenting", "On-behalf", "Market Development Assistance"].map(
                            (label, index) => (
                                <Tab
                                    key={index}
                                    label={label}
                                    sx={{
                                        minHeight: 56,
                                        textTransform: "none",
                                        fontWeight: 700,
                                        fontSize: { xs: "12px", sm: "15px" },
                                        bgcolor: value === index ? "#F4A62A" : "#efe7df",
                                        color: value === index ? "#fff !important" : "#3E3126",
                                        transition: "0.3s",
                                        "&:hover": {
                                            bgcolor: value === index ? "#F4A62A" : "#e3d8cd",
                                        },
                                    }}
                                />
                            )
                        )}
                    </Tabs>

                    <Box sx={{ bgcolor: "#fbf8f4", p: { xs: 2, sm: 3 } }}>
                        <Grid container spacing={2}>
                            {tabData[value].map((item, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6 }}>
                                    <Box
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "#fff",
                                            border: "1px solid #eee3d7",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.2,
                                        }}
                                    >
                                        <CheckCircleIcon
                                            sx={{
                                                color: "#F4A62A",
                                                fontSize: 21,
                                                flexShrink: 0,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: "15px",
                                                fontWeight: 500,
                                                color: "#374151",
                                            }}
                                        >
                                            {item}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}