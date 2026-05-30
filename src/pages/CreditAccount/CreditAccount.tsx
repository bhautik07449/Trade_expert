import React, { useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Grid,
    Paper,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormHelperText,
    CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import CMSservice from "../../service/cms.service";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";

const countryOptions = [
    { label: "India", value: "India" },
    { label: "United States", value: "United States" },
    { label: "United Kingdom", value: "United Kingdom" },
    { label: "Canada", value: "Canada" },
    { label: "Australia", value: "Australia" },
    { label: "Germany", value: "Germany" },
    { label: "France", value: "France" },
    { label: "Italy", value: "Italy" },
    { label: "Spain", value: "Spain" },
    { label: "Netherlands", value: "Netherlands" },
    { label: "Switzerland", value: "Switzerland" },
    { label: "Sweden", value: "Sweden" },
    { label: "Norway", value: "Norway" },
    { label: "Denmark", value: "Denmark" },
    { label: "Finland", value: "Finland" },
    { label: "China", value: "China" },
    { label: "Japan", value: "Japan" },
    { label: "South Korea", value: "South Korea" },
    { label: "Singapore", value: "Singapore" },
    { label: "Malaysia", value: "Malaysia" },
    { label: "Thailand", value: "Thailand" },
    { label: "Indonesia", value: "Indonesia" },
    { label: "Philippines", value: "Philippines" },
    { label: "United Arab Emirates", value: "United Arab Emirates" },
    { label: "Saudi Arabia", value: "Saudi Arabia" },
    { label: "South Africa", value: "South Africa" },
    { label: "Brazil", value: "Brazil" },
    { label: "Mexico", value: "Mexico" },
    { label: "Argentina", value: "Argentina" },
    { label: "Turkey", value: "Turkey" },
];

export default function CreditAccount() {
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("credit-account"));
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            companyName: "",
            country: "",
            established: "",
            noofemployees: "",
            bankName: "",
            bankContact: "",
            bankEmail: "",
            bankAddress: "",
            supplier1Name: "",
            supplier1Contact: "",
            supplier1Email: "",
            supplier1Address: "",
            supplier1Years: "",
            supplier2Name: "",
            supplier2Contact: "",
            supplier2Email: "",
            supplier2Address: "",
            supplier2Years: "",
            yourName: "",
            yourEmail: "",
            yourPosition: "",
            terms: "",
            agree: "",
        },

        validationSchema: Yup.object({
            companyName: Yup.string().required("Required"),
            country: Yup.string().required("Required"),
            established: Yup.string().required("Required"),
            noofemployees: Yup.string().required("Required"),
            bankName: Yup.string().required("Required"),
            bankContact: Yup.string().required("Required"),
            bankEmail: Yup.string().email("Invalid email").required("Required"),
            bankAddress: Yup.string().required("Required"),
            supplier1Name: Yup.string().required("Required"),
            supplier1Contact: Yup.string().required("Required"),
            supplier1Email: Yup.string().email("Invalid email").required("Required"),
            supplier1Address: Yup.string().required("Required"),
            supplier1Years: Yup.string().required("Required"),
            supplier2Name: Yup.string().required("Required"),
            supplier2Contact: Yup.string().required("Required"),
            supplier2Email: Yup.string().email("Invalid email").required("Required"),
            supplier2Address: Yup.string().required("Required"),
            supplier2Years: Yup.string().required("Required"),
            yourName: Yup.string().required("Required"),
            yourEmail: Yup.string().email("Invalid email").required("Required"),
            yourPosition: Yup.string().required("Required"),
            terms: Yup.string().required("Required"),
            agree: Yup.string().required("You must agree before submitting"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {

                const res = await CMSservice.creditAccount(values)

                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                }
            } catch (error) {
                toast.error("Credit Account not set . Please try again.")
            }
        },
    });

    const fieldProps = (name: keyof typeof formik.values) => ({
        fullWidth: true,
        size: "small" as "small" | "medium",
        name,
        value: formik.values[name],
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
    });

    const generateYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 1900; year--) {
            years.push({ label: year.toString(), value: year.toString() });
        }
        return years;
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
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
                            Credit Account Application form
                        </Typography>
                    </Box>
                </Box>
            </Box>

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
                <Grid container spacing={4} maxWidth="1100px" mx="auto">
                    <Grid size={{ xs: 12 }}>
                        <Paper
                            sx={{
                                mb: 4,
                                p: 2,
                                borderRadius: 4,
                                bgcolor: "background.paper",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                            }}
                        >
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">Company Details</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField label="Company Name" {...fieldProps("companyName")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Select
                                            options={countryOptions}
                                            menuPortalTarget={document.body}
                                            styles={{
                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                            }}
                                            onChange={(option) =>
                                                formik.setFieldValue("country", option?.value || "")
                                            }
                                            value={
                                                formik.values.country
                                                    ? { label: formik.values.country, value: formik.values.country }
                                                    : null
                                            }
                                            placeholder="Country"
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Select
                                            options={generateYears()}
                                            onChange={(selectedOption) =>
                                                formik.setFieldValue("established", selectedOption?.value || "")
                                            }
                                            onBlur={() => formik.setFieldTouched("established", true)}
                                            value={
                                                formik.values.established
                                                    ? { label: formik.values.established, value: formik.values.established }
                                                    : null
                                            }
                                            placeholder="Search and select a year"
                                            styles={{
                                                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                                menu: (base) => ({ ...base, zIndex: 9999 }),
                                            }}
                                        />
                                        {formik.touched.established && formik.errors.established && (
                                            <FormHelperText error>{formik.errors.established}</FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField select label="Employees" {...fieldProps("noofemployees")}>
                                            <MenuItem value="Less than 5">Less than 5</MenuItem>
                                            <MenuItem value="5-20">5-20</MenuItem>
                                            <MenuItem value="20-100">20-100</MenuItem>
                                            <MenuItem value="100-1000">100-1000</MenuItem>
                                            <MenuItem value="More than 1000">More than 1000</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">Your Bank</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Bank Name" {...fieldProps("bankName")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Contact Name" {...fieldProps("bankContact")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Email" {...fieldProps("bankEmail")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField multiline rows={3} label="Bank Address" {...fieldProps("bankAddress")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">Trade Supplier 1</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Name" {...fieldProps("supplier1Name")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Contact" {...fieldProps("supplier1Contact")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Email" {...fieldProps("supplier1Email")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField multiline rows={2} label="Address" {...fieldProps("supplier1Address")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField select label="Years trading" {...fieldProps("supplier1Years")}>
                                            <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                                            <MenuItem value="1-3 years">1-3 years</MenuItem>
                                            <MenuItem value="More than 3 years">More than 3 years</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="h6">Trade Supplier 2</Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Name" {...fieldProps("supplier2Name")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Contact" {...fieldProps("supplier2Contact")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Email" {...fieldProps("supplier2Email")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField multiline rows={2} label="Address" {...fieldProps("supplier2Address")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField select label="Years trading" {...fieldProps("supplier2Years")}>
                                            <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                                            <MenuItem value="1-3 years">1-3 years</MenuItem>
                                            <MenuItem value="More than 3 years">More than 3 years</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Typography variant="body2">
                                            I wish to apply for a credit account at Sourceseas Overseas Private limited. I am authorised to make this application on behalf of my organisation. Sourceseas Overseas Private limited may contact the bank and trade suppliers to gather information on the financial reputation of my organisation. I acknowledge it may take time to receive replies and this may delay my application, and that credit may not be approved. If less favourable terms are offered than requested, more favourable terms may be granted once our trading relationship is established.
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <RadioGroup
                                            name="agree"
                                            value={formik.values.agree}
                                            onChange={formik.handleChange}
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={<Radio />}
                                                label="I Agree to the above terms"
                                            />
                                        </RadioGroup>
                                        {formik.touched.agree && formik.errors.agree && (
                                            <FormHelperText error>{formik.errors.agree}</FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Your Name" {...fieldProps("yourName")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Your Email" {...fieldProps("yourEmail")} />
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 4 }}>
                                        <TextField label="Position" {...fieldProps("yourPosition")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField multiline rows={3} label="Terms requested" {...fieldProps("terms")} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }} textAlign="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            disabled={formik.isSubmitting}
                                            startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                                        >
                                            {formik.isSubmitting ? "Submitting..." : "Submit"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}