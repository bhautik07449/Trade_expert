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
    RadioGroup,
    Radio,
} from "@mui/material"

import { useFormik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import CMSservice from "../../service/cms.service"

type InquiryDialogProps = {
    open: boolean
    onClose: () => void
    onSubmit?: (data: any) => void;
    product?: {
        name?: string;
        description?: string;
        images?: string;
        id?: any
    };
}

export default function InquiryDialog({
    open,
    onClose,
    product
}: InquiryDialogProps) {

    const buyerId = localStorage.getItem('token')

    const validationSchema = Yup.object({
        subject: Yup.string().required("Subject is required"),
        message: Yup.string().required("Message is required"),
        firstName: Yup.string().required("First name required"),
        lastName: Yup.string().required("Last name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        businessContact: Yup.string().required("Contact required"),
        company: Yup.string().required("Company name required"),
    })

    const formik = useFormik({
        initialValues: {
            ccEmail: false,
            subject: "",
            message: "",
            samples: "",
            sampleUnit: "Metric Ton",
            shipmentPay: "shipment",
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
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log("values", values);

                const payload = {
                    ...values,
                    product: product?.id,
                    buyer: buyerId || null,
                }

                const res = await CMSservice.requestSample(payload)
                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                    onClose()
                }
            } catch (error) {
                toast.error("Inquiry not send resubmit inquiry")
            }
        },
    })


    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>

            <DialogTitle textAlign="center" fontWeight={700}>
                REQUEST FOR A SAMPLE
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
                            <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: product?.description }}>
                            </Typography>
                        )}
                    </Box>
                </Stack>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>

                            <Typography fontWeight={600} mb={2}>
                                Sample Information
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="ccEmail"
                                        checked={formik.values.ccEmail}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Add me as CC of this Request sample email."
                            />

                            <TextField
                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formik.values.subject}
                                onChange={formik.handleChange}
                                error={formik.touched.subject && Boolean(formik.errors.subject)}
                                helperText={formik.touched.subject && formik.errors.subject}
                                sx={{ mt: 2 }}
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
                                Sample Policy
                            </Typography>

                            <Typography variant="caption">
                                NOTE: Samples may be free but shipping charge should be born by customers.
                            </Typography>

                            <Grid container spacing={2} mt={1}>

                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        label="No. of Samples"
                                        name="samples"
                                        fullWidth
                                        value={formik.values.samples}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Unit</InputLabel>

                                        <Select
                                            name="sampleUnit"
                                            label="Unit"
                                            value={formik.values.sampleUnit}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value="Metric Ton">Metric Ton</MenuItem>
                                            <MenuItem value="Kg">Kg</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <RadioGroup
                                name="shipmentPay"
                                value={formik.values.shipmentPay}
                                onChange={formik.handleChange}
                                sx={{ mt: 2 }}
                            >
                                <FormControlLabel
                                    value="shipment"
                                    control={<Radio />}
                                    label="Will Pay for Shipment"
                                />
                                <FormControlLabel
                                    value="both"
                                    control={<Radio />}
                                    label="Will Pay for Both"
                                />
                            </RadioGroup>

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
                                            label="Title"
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
                                        error={
                                            formik.touched.firstName &&
                                            Boolean(formik.errors.firstName)
                                        }
                                        helperText={
                                            formik.touched.firstName && formik.errors.firstName
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 5 }}>
                                    <TextField
                                        label="Last name"
                                        name="lastName"
                                        fullWidth
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.lastName &&
                                            Boolean(formik.errors.lastName)
                                        }
                                        helperText={
                                            formik.touched.lastName && formik.errors.lastName
                                        }
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
                                rows={2}
                                sx={{ mt: 2 }}
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />

                            <TextField
                                label="Business Contact"
                                name="businessContact"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.businessContact}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.businessContact &&
                                    Boolean(formik.errors.businessContact)
                                }
                                helperText={
                                    formik.touched.businessContact &&
                                    formik.errors.businessContact
                                }
                            />

                            <TextField
                                label="Business Website"
                                name="website"
                                fullWidth
                                sx={{ mt: 2 }}
                                value={formik.values.website}
                                onChange={formik.handleChange}
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel>Business Type</InputLabel>

                                <Select
                                    name="businessType"
                                    label="Business Type"
                                    value={formik.values.businessType}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="Manufacturer">
                                        Manufacturing and Processing
                                    </MenuItem>
                                    <MenuItem value="Distributor">
                                        Distributor
                                    </MenuItem>
                                    <MenuItem value="Retailer">
                                        Retailer
                                    </MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>

                    </Grid>

                    <DialogActions sx={{ mt: 3 }}>

                        <Button onClick={onClose}>
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Submit
                        </Button>

                    </DialogActions>

                </form>

            </DialogContent>
        </Dialog>
    )
}