import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import HomePageservice from "../../service/homepages.service";

type Product = {
    id?: string | number;
    name?: string;
};

type InquiryFormProps = {
    activeCountry: string;
    selectedProduct: Product | null;
    selectedService?: any;
};

export default function InquiryForm({
    activeCountry,
    selectedProduct,
    selectedService,
}: InquiryFormProps) {
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            email: "",
            country: activeCountry || "",
            product: selectedProduct?.id || "",
            service: selectedService?.id || "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            country: Yup.string().required("Country is required"),
            product: Yup.mixed().required("Product is required"),
            service: Yup.mixed().required("Service is required"),
            message: Yup.string().required("Message is required"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const payload = {
                    ...values,
                    country: activeCountry,
                    product: selectedProduct?.id,
                    service: selectedService?.id,
                };

                const res = await HomePageservice.inquiryIR(payload);

                if (res) {
                    toast.success(res?.data?.message || "Inquiry sent successfully");

                    resetForm({
                        values: {
                            name: "",
                            email: "",
                            country: activeCountry || "",
                            product: selectedProduct?.id || "",
                            service: selectedService?.id || "",
                            message: "",
                        },
                    });
                }
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message ||
                    "Inquiry not sent. Please try again."
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box>
            <Typography
                variant="h5"
                sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    textAlign: "center",
                    mb: 3,
                }}
            >
                Inquiry Form
            </Typography>

            <Paper
                elevation={0}
                sx={{
                    maxWidth: 760,
                    mx: "auto",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    p: { xs: 2, md: 3 },
                    bgcolor: "background.default",
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.name &&
                                    Boolean(formik.errors.name)
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                disabled
                                value={formik.values.country}
                                error={
                                    formik.touched.country &&
                                    Boolean(formik.errors.country)
                                }
                                helperText={
                                    formik.touched.country &&
                                    formik.errors.country
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Selected Product"
                                name="product"
                                value={selectedProduct?.name || ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                                error={
                                    formik.touched.product &&
                                    Boolean(formik.errors.product)
                                }
                                helperText={
                                    formik.touched.product &&
                                    formik.errors.product as string
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Selected Service"
                                name="service"
                                value={selectedService?.name || ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                                error={
                                    formik.touched.service &&
                                    Boolean(formik.errors.service)
                                }
                                helperText={
                                    formik.touched.service &&
                                    formik.errors.service as string
                                }
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Message"
                                name="message"
                                fullWidth
                                multiline
                                rows={4}
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

                        <Grid size={{ xs: 12 }} textAlign="center">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    minWidth: 130,
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                }}
                            >
                                {formik.isSubmitting ? (
                                    <CircularProgress
                                        size={22}
                                        sx={{ color: "#fff" }}
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
}