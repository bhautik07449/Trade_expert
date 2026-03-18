"use client"

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material"

import { useFormik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import CMSservice from "../../service/cms.service"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchFlatMeasurement } from "../../store/slice/measurementSlice"
import { AppDispatch } from "../../store"

type EnquiryDialogProps = {
    open: boolean
    onClose: () => void
    product?: {
        name?: string
        description?: string
        images?: string
        id?: any
    }
}

export default function EnquiryDialog({
    open,
    onClose,
    product
}: EnquiryDialogProps) {

    const buyerId = localStorage.getItem('token')

    const validationSchema = Yup.object({
        subject: Yup.string().trim().required("Subject is required"),
        message: Yup.string().trim().required("Message is required"),
        firstName: Yup.string().trim().required("First name required"),
        lastName: Yup.string().trim().required("Last name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        businessContact: Yup.string()
            .matches(/^[0-9]+$/, "Only numbers allowed")
            .min(7, "Too short")
            .max(15, "Too long")
            .required("Contact required"),
        company: Yup.string().trim().required("Company name required"),
        expectedQty: Yup.number()
            .typeError("Quantity must be a number")
            .positive("Quantity must be greater than 0")
            .required("Expected quantity is required"),
        requirementFrequency: Yup.string().required("Requirement frequency is required"),
        preferredPrice: Yup.number()
            .typeError("Price must be a number")
            .positive("Price must be greater than 0")
            .when("getLatestPrice", {
                is: false,
                then: (schema) => schema.required("Preferred price is required"),
                otherwise: (schema) => schema.notRequired(),
            }),
        address: Yup.string().trim().required("Business address is required"),
        website: Yup.string()
            .trim()
            .url("Enter valid URL")
            .nullable()
            .notRequired(),
        businessType: Yup.string().required("Business type is required"),
    })

    const formik = useFormik({
        initialValues: {
            subject: "",
            message: "",
            expectedQty: "",
            expectedQtyUnit: "Metric Ton",
            getLatestPrice: false,
            requirementFrequency: "",
            preferredPrice: "",
            preferredCurrency: "USD",
            title: "Mr",
            firstName: "",
            lastName: "",
            businessContact: "",
            company: "",
            email: "",
            address: "",
            website: "",
            businessType: "",
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    ...values,
                    product: product?.id,
                    buyer: buyerId || null,
                }

                const res = await CMSservice.enquiry(payload)
                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                    onClose()
                }
            } catch (error) {
                toast.error("Inquiry not sent. Please try again.")
            }
        },
    })

    const dispatch = useDispatch<AppDispatch>()

    const { flatList, loading, error } = useSelector(
        (state: any) => state.measurements
    )

    useEffect(() => {
        dispatch(fetchFlatMeasurement())
    }, [dispatch])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>

            <DialogTitle textAlign="center" fontWeight={700}>
                REQUEST AN INQUIRY
            </DialogTitle>

            <DialogContent dividers>

                <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Avatar
                        src={product?.images}
                        alt={product?.name}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                        <Typography fontWeight={600}>
                            {product?.name}
                        </Typography>

                        {product?.description && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                dangerouslySetInnerHTML={{ __html: product?.description }}
                            />
                        )}
                    </Box>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} mb={2}>
                                Inquiry Information
                            </Typography>

                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                error={formik.touched.subject && Boolean(formik.errors.subject)}
                                helperText={formik.touched.subject && formik.errors.subject}
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Message"
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                error={formik.touched.message && Boolean(formik.errors.message)}
                                helperText={formik.touched.message && formik.errors.message}
                                sx={{ mt: 2 }}
                            />

                            <Typography fontWeight={600} mt={3}>
                                Expected Order Quantity
                            </Typography>

                            <Grid container spacing={2} mt={1}>
                                <Grid size={{ xs: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Unit</InputLabel>
                                        <Select
                                            name="expectedQtyUnit"
                                            value={formik.values.expectedQtyUnit}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Metric Ton">Metric Ton</MenuItem>
                                            <MenuItem value="Kg">Kg</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        label="Quantity"
                                        name="expectedQty"
                                        fullWidth
                                        value={formik.values.expectedQty}
                                        onChange={formik.handleChange}
                                        error={formik.touched.expectedQty && Boolean(formik.errors.expectedQty)}
                                        helperText={formik.touched.expectedQty && formik.errors.expectedQty}
                                    />
                                </Grid>
                            </Grid>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="getLatestPrice"
                                        checked={formik.values.getLatestPrice}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Get latest price"
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Requirement Frequency</InputLabel>
                                <Select
                                    name="requirementFrequency"
                                    value={formik.values.requirementFrequency}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                                    <MenuItem value="Yearly">Yearly</MenuItem>
                                </Select>
                            </FormControl>

                            {formik.touched.requirementFrequency &&
                                formik.errors.requirementFrequency && (
                                    <Typography color="error" variant="caption">
                                        {formik.errors.requirementFrequency}
                                    </Typography>
                                )}

                            <Typography fontWeight={600} mt={2}>
                                Preferred Unit Price
                            </Typography>

                            <Grid container spacing={2} mt={1}>
                                <Grid size={{ xs: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Currency</InputLabel>
                                        <Select
                                            name="preferredCurrency"
                                            value={formik.values.preferredCurrency}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="USD">USD</MenuItem>
                                            <MenuItem value="INR">INR</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        label="Price"
                                        name="preferredPrice"
                                        fullWidth
                                        disabled={formik.values.getLatestPrice}
                                        value={formik.values.preferredPrice}
                                        onChange={formik.handleChange}
                                        error={formik.touched.preferredPrice && Boolean(formik.errors.preferredPrice)}
                                        helperText={formik.touched.preferredPrice && formik.errors.preferredPrice}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} mb={2}>
                                Contact Detail
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 3 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <Select
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Mr">Mr</MenuItem>
                                            <MenuItem value="Ms">Ms</MenuItem>
                                            <MenuItem value="Mrs">Mrs</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 4 }}>
                                    <TextField
                                        label="First name"
                                        name="firstName"
                                        fullWidth
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </Grid>

                                <Grid size={{ xs: 5 }}>
                                    <TextField
                                        label="Last name"
                                        name="lastName"
                                        fullWidth
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                label="Company Name"
                                name="company"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.company}
                                onChange={formik.handleChange}
                                error={formik.touched.company && Boolean(formik.errors.company)}
                                helperText={formik.touched.company && formik.errors.company}
                            />

                            <TextField
                                label="Business Email"
                                name="email"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <TextField
                                label="Business Address"
                                name="address"
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ mt: 2 }}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />

                            <TextField
                                label="Business Contact"
                                name="businessContact"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.businessContact}
                                onChange={formik.handleChange}
                                error={formik.touched.businessContact && Boolean(formik.errors.businessContact)}
                                helperText={formik.touched.businessContact && formik.errors.businessContact}
                            />

                            <TextField
                                label="Business Website"
                                name="website"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                error={formik.touched.website && Boolean(formik.errors.website)}
                                helperText={formik.touched.website && formik.errors.website}
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Business Type</InputLabel>
                                <Select
                                    name="businessType"
                                    value={formik.values.businessType}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="Manufacturer">Manufacturing</MenuItem>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                    <MenuItem value="Retailer">Retailer</MenuItem>
                                </Select>
                            </FormControl>

                            {formik.touched.businessType && formik.errors.businessType && (
                                <Typography color="error" variant="caption">
                                    {formik.errors.businessType}
                                </Typography>
                            )}
                        </Grid>

                    </Grid>

                    <DialogActions sx={{ mt: 3 }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}