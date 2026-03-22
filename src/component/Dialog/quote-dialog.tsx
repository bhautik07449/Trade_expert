"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import ImageUpload from "../ImageUpload";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function QuotationDialog({ open, onClose }: Props) {

    const formik = useFormik({
        initialValues: {
            productName: "",
            businessEmail: "",
            category: "",
            subCategory: "",
            childCategory: "",
            quantity: "",
            unit: "",
            price: "",
            currency: "",
            validTo: "",
            validityDays: "7 Days",
            shipmentTerm: "FCA (Free Carrier)",
            paymentTerm: "100% advance against purchase order",
            companyCert: "",
            productCert: "",
            aboutProduct: "",
            productImage: "",
        },

        validationSchema: Yup.object({
            productName: Yup.string().required("Required"),
            businessEmail: Yup.string().email().required("Required"),
            quantity: Yup.string().required("Required"),
        }),

        onSubmit: (values) => {
            console.log("RFQ DATA:", values);
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle textAlign="center" fontWeight={700}>
                REQUEST FOR QUOTE
            </DialogTitle>

            <DialogContent dividers>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Product Name"
                                name="productName"
                                fullWidth
                                value={formik.values.productName}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Business Email"
                                name="businessEmail"
                                fullWidth
                                value={formik.values.businessEmail}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Typography fontWeight={600}>Product</Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    label="Category"
                                >
                                    <MenuItem value="Electronics">Electronics</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Sub Category</InputLabel>
                                <Select
                                    name="subCategory"
                                    value={formik.values.subCategory}
                                    onChange={formik.handleChange}
                                    label="Sub Category"
                                >
                                    <MenuItem value="Mobile">Mobile</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 4 }}>
                            <FormControl fullWidth>
                                <InputLabel>Child Category</InputLabel>
                                <Select
                                    name="childCategory"
                                    value={formik.values.childCategory}
                                    onChange={formik.handleChange}
                                    label="Child Category"
                                >
                                    <MenuItem value="Smartphone">Smartphone</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Estimated Order Quantity"
                                name="quantity"
                                fullWidth
                                value={formik.values.quantity}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Unit</InputLabel>
                                <Select
                                    name="unit"
                                    value={formik.values.unit || ""}
                                    onChange={formik.handleChange}
                                    label="Unit"
                                >
                                    <MenuItem value="Metric Ton">Metric Ton</MenuItem>
                                    <MenuItem value="Kg">Kg</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                label="Preferred Unit Price"
                                name="price"
                                fullWidth
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    name="currency"
                                    value={formik.values.currency}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="INR">INR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                type="date"
                                label="Valid To"
                                name="validTo"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.validTo}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel>Validity</InputLabel>
                                <Select
                                    name="validityDays"
                                    value={formik.values.validityDays}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="7 Days">7 Days</MenuItem>
                                    <MenuItem value="15 Days">15 Days</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel>Shipment Term</InputLabel>
                                <Select
                                    name="shipmentTerm"
                                    value={formik.values.shipmentTerm}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="FCA (Free Carrier)">
                                        FCA (Free Carrier)
                                    </MenuItem>
                                    <MenuItem value="FOB">FOB</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel>Payment Term</InputLabel>
                                <Select
                                    name="paymentTerm"
                                    value={formik.values.paymentTerm}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="100% advance against purchase order">
                                        100% advance against purchase order
                                    </MenuItem>
                                    <MenuItem value="LC">LC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Company Certification (if any)"
                                name="companyCert"
                                fullWidth
                                value={formik.values.companyCert}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="Product Certification (if any)"
                                name="productCert"
                                fullWidth
                                value={formik.values.productCert}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                label="About Product"
                                name="aboutProduct"
                                multiline
                                rows={4}
                                fullWidth
                                value={formik.values.aboutProduct}
                                onChange={formik.handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <ImageUpload
                                label="Product Image"
                                value={formik.values.productImage}
                                onChange={(url) =>
                                    formik.setFieldValue("productImage", url)
                                }
                            />
                        </Grid>

                    </Grid>

                    <DialogActions sx={{ mt: 2 }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}