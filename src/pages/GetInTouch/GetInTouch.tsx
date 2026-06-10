import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    List,
    ListItemText,
    ListItemButton,
    CircularProgress,
    Stack,
    Divider,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Homeservice from "../../service/home.service";
import { toast } from "react-toastify";
import ContactInfoCard from "../../commonUI/ContactInfoCard";
import PageMainLayout from "../../commonUI/PageMainLayout";

const tabs = [
    { label: "Fill Form", value: "fill-form" },
    { label: "By Call", value: "by-call" },
    { label: "Chat With Us", value: "chat-with-us" },
    { label: "Email Us", value: "email-us" },
];

export default function GetInTouch() {
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);
    const [activeTab, setActiveTab] = useState("fill-form");

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .min(2, "Too Short!")
            .required("First Name is required"),

        last_name: Yup.string()
            .min(2, "Too Short!")
            .required("Last Name is required"),

        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),

        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
            .required("Phone is required"),

        message: Yup.string()
            .min(10, "Message must be at least 10 characters")
            .required("Message is required"),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: "",
            country: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {

            const payload = {
                ...values,
                country: selectedCountry,
            };

            try {
                const res = await Homeservice.getIntouch(payload);

                if (res) {
                    toast.success(res?.data?.message);
                    resetForm();
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                toast.error("Contact message not sent");
            }
        },
    });

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout title="Get In Touch" slug="get-in-touch" image="https://sourceseas.itcoders.in/img/front-end/faq.jpg" activeCountry="" setActiveCountry={() => { }} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    mt: { xs: -5, md: -7 },
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                bgcolor: "secondary.main",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 18px 45px rgba(62,49,38,0.10)",
                            }}
                        >
                            <Typography
                                sx={{
                                    px: 1,
                                    mb: 1.5,
                                    color: "primary.light",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                Contact Options
                            </Typography>

                            <List disablePadding>
                                {(Array.isArray(tabs) ? tabs : []).map((tab) => (
                                    <ListItemButton
                                        key={tab.value}
                                        onClick={() => setActiveTab(tab.value)}
                                        selected={activeTab === tab.value}
                                        sx={{
                                            borderRadius: 2,
                                            mb: 1,
                                            color: "primary.light",
                                            px: 2,
                                            py: 1.3,
                                            transition: "0.25s ease",
                                            "&:hover": {
                                                bgcolor: "rgba(232,216,193,0.12)",
                                            },
                                            "&.Mui-selected": {
                                                bgcolor: "primary.main",
                                                color: "#fff",
                                                boxShadow:
                                                    "0 8px 20px rgba(167,123,88,0.35)",
                                            },
                                            "&.Mui-selected:hover": {
                                                bgcolor: "primary.dark",
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={tab.label}
                                            primaryTypographyProps={{
                                                fontWeight:
                                                    activeTab === tab.value ? 700 : 500,
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        {activeTab === "fill-form" && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, sm: 3, md: 4 },
                                    borderRadius: 4,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 1,
                                        color: "text.primary",
                                        fontWeight: 800,
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{ color: "primary.main" }}
                                    >
                                        Write
                                    </Box>{" "}
                                    to Us
                                </Typography>

                                <Typography
                                    sx={{
                                        mb: 4,
                                        color: "text.secondary",
                                        maxWidth: 650,
                                    }}
                                >
                                    Fill out the form below and our team will get back to
                                    you as soon as possible.
                                </Typography>

                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                name="first_name"
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.first_name &&
                                                    Boolean(formik.errors.first_name)
                                                }
                                                helperText={
                                                    formik.touched.first_name &&
                                                    formik.errors.first_name
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                name="last_name"
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.last_name &&
                                                    Boolean(formik.errors.last_name)
                                                }
                                                helperText={
                                                    formik.touched.last_name &&
                                                    formik.errors.last_name
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.email &&
                                                    Boolean(formik.errors.email)
                                                }
                                                helperText={
                                                    formik.touched.email &&
                                                    formik.errors.email
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                type="tel"
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.phone &&
                                                    Boolean(formik.errors.phone)
                                                }
                                                helperText={
                                                    formik.touched.phone &&
                                                    formik.errors.phone
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                multiline
                                                rows={5}
                                                name="message"
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={
                                                    formik.touched.message &&
                                                    Boolean(formik.errors.message)
                                                }
                                                helperText={
                                                    formik.touched.message &&
                                                    formik.errors.message
                                                }
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={formik.isSubmitting}
                                                startIcon={
                                                    formik.isSubmitting ? (
                                                        <CircularProgress
                                                            size={20}
                                                            color="inherit"
                                                        />
                                                    ) : null
                                                }
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "#fff",
                                                    px: 4,
                                                    py: 1.2,
                                                    borderRadius: 2,
                                                    textTransform: "none",
                                                    fontWeight: 700,
                                                    boxShadow:
                                                        "0 10px 24px rgba(167,123,88,0.30)",
                                                    "&:hover": {
                                                        bgcolor: "primary.dark",
                                                    },
                                                }}
                                            >
                                                {formik.isSubmitting
                                                    ? "Sending..."
                                                    : "Send Message"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        )}

                        {activeTab === "by-call" && (
                            <ContactInfoCard
                                titleHighlight="Call"
                                title="Us"
                                description="Need assistance in buying or clarification on products?"
                                details={[
                                    "Call or WhatsApp us at",
                                    "(+91) 9925099215",
                                ]}
                            />
                        )}

                        {activeTab === "chat-with-us" && (
                            <ContactInfoCard
                                titleHighlight="Chat"
                                title="With Us"
                                description="You can chat with us online to quickly get product information or a quote."
                                details={[
                                    'Please click on the bottom-right "Leave Message" box.',
                                ]}
                            />
                        )}

                        {activeTab === "email-us" && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, sm: 3, md: 4 },
                                    borderRadius: 4,
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 3,
                                        color: "text.primary",
                                        fontWeight: 800,
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{ color: "primary.main" }}
                                    >
                                        Email
                                    </Box>{" "}
                                    Us
                                </Typography>

                                <Stack spacing={1.4}>
                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            fontWeight: 800,
                                            fontSize: 18,
                                        }}
                                    >
                                        Sourceseas Overseas Pvt. Ltd.
                                    </Typography>

                                    <Divider sx={{ borderColor: "divider" }} />

                                    <Typography
                                        sx={{
                                            color: "secondary.main",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Registered Office
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        C-604, Shree Nidhi Residency <br />
                                        Nr. Sudamachowk, <br />
                                        Satellite Road, <br />
                                        Mota Varachha, Surat, Gujarat, <br />
                                        India - 394010 <br />
                                        +91 9925099215
                                    </Typography>
                                </Stack>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}