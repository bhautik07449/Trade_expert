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
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Homeservice from "../../service/home.service";
import { toast } from "react-toastify";
import SEO from "../../component/SEO";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function GetInTouch() {
    const [activeTab, setActiveTab] = useState("fill-form");
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("get-in-touch"));
    }, [dispatch]);

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
        },

        validationSchema: validationSchema,

        onSubmit: async (values, { resetForm }) => {

            try {
                const res = await Homeservice.getIntouch(values)
                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                } else {
                    toast.error("Something went wrong");
                }
            } catch (error) {
                toast.error("contect message not send")
            }
        },
    });

    return (
        <Box sx={{ bgcolor: "#f4f4f4", minHeight: "100vh", pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Career'}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
                />
            )}

            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
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
                        bgcolor: "rgba(0,0,0,0.35)",
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
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            Contact to Sourceseas
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1200px",
                    mx: "auto",
                    mt: { xs: 4, md: 8 },
                    px: { xs: 2, sm: 3, md: 4 },
                    boxSizing: "border-box",
                    width: "100%",
                }}
            >
                {loading ? (
                    <Box sx={{ mb: 5 }}>
                        <PageContentSkeleton />
                    </Box>
                ) : pageDetail?.content && (
                    <Typography
                        sx={{
                            color: "secondary.main",
                            mb: 5,
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            textAlign: "justify",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: pageDetail?.content || null,
                        }}
                    />
                )}

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                bgcolor: "#e9dfd6",
                            }}
                        >
                            <List>
                                {["Fill form", "By Call", "Chat With Us", "Email Us"].map(
                                    (text, index) => (
                                        <ListItemButton onClick={() => setActiveTab(text.toLowerCase().replace(" ", "-"))} key={index}
                                            selected={activeTab === text.toLowerCase().replace(" ", "-")}
                                            sx={{
                                                borderRadius: 2,
                                                mb: 1,
                                                "&.Mui-selected": {
                                                    bgcolor: "#7cb342",
                                                    color: "#fff",
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "#689f38",
                                                },
                                            }}
                                        >
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        {activeTab === "fill-form" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Write
                                    </span>{" "}
                                    to Us
                                </Typography>
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                variant="outlined"
                                                name="first_name"
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                                helperText={formik.touched.first_name && formik.errors.first_name}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                variant="outlined"
                                                name="last_name"
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                                helperText={formik.touched.last_name && formik.errors.last_name}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 6 }}>
                                            <TextField
                                                fullWidth
                                                label="Phone"
                                                variant="outlined"
                                                type="tel"
                                                name="phone"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                helperText={formik.touched.phone && formik.errors.phone}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                fullWidth
                                                label="Message"
                                                multiline
                                                rows={5}
                                                variant="outlined"
                                                name="message"
                                                value={formik.values.message}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.message && Boolean(formik.errors.message)}
                                                helperText={formik.touched.message && formik.errors.message}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={formik.isSubmitting}
                                                startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                                                sx={{
                                                    bgcolor: "#7cb342",
                                                    px: 4,
                                                    "&:hover": {
                                                        bgcolor: "#689f38",
                                                    },
                                                }}
                                            >
                                                {formik.isSubmitting ? "Sending..." : "Send"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Paper>
                        )}

                        {activeTab === "by-call" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Call
                                    </span>{" "}
                                    Us
                                </Typography>

                                <Typography variant="body1">
                                    Need Assitance in Buying or need clarification on products.
                                </Typography>

                                <Typography variant="body1">
                                    call or whatsapp us at (+91) 9925099215
                                </Typography>
                            </Paper>
                        )}

                        {activeTab === "chat-with us" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Chat
                                    </span>{" "}
                                    With Us
                                </Typography>

                                <Typography variant="body1">
                                    You can online chat with us for the frequently get the quote.
                                </Typography>

                                <Typography variant="body1">
                                    For that please click on the bottom right corner <b>"Leave Message"</b> box.
                                </Typography>
                            </Paper>
                        )}

                        {activeTab === "email-us" && (
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    bgcolor: "#e9dfd6",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 600,
                                    }}
                                >
                                    <span style={{ color: "#7cb342" }}>
                                        Email
                                    </span>{" "}
                                    Us
                                </Typography>

                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    Sourceseas overseas Pvt. Ltd.
                                </Typography>

                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                    Registered Office
                                </Typography>

                                <Typography variant="body1">
                                    C-604, Shree Nidhi Residency <br />Nr. Sudamachowk, <br /> Satelite Road, <br />Mota Varachha, Surat(Guj), <br />India - 3940101 <br /> +91 9925099215
                                </Typography>

                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}