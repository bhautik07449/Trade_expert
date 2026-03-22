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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchCategories } from "../../store/slice/categoriesSlice";
import { AppDispatch } from "../../store";
import { fetchFlatMeasurement } from "../../store/slice/measurementSlice";
import { fetchFlatCurrency } from "../../store/slice/currencySlice";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function QuotationDialog({ open, onClose }: Props) {

    const dispatch = useDispatch<AppDispatch>();

    const { categories, loading } = useSelector(
        (state: any) => state.categories
    );

    const { flatList: measurements, loading: measurementLoading } = useSelector(
        (state: any) => state.measurements
    );

    const { flatList: currency, loading: currencyLoading } = useSelector(
        (state: any) => state.currency
    );

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchFlatMeasurement())
        dispatch(fetchFlatCurrency())
    }, [dispatch]);

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

        onSubmit: async (values, { resetForm }) => {
            try {
                const res: any = await CMSservice.quotation(values)

                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                    onClose()
                }
            } catch (error) {
                toast.error("Quotation not sent. Please try again.")
            }
        },
    });

    const categoryOptions = useMemo(() => {
        return categories?.map((cat: any) => ({
            label: cat.name,
            value: cat.id
        }));
    }, [categories]);

    const selectedCategory = categories?.find(
        (cat: any) => cat.id === formik.values.category
    );

    const subCategoryOptions = useMemo(() => {
        if (!selectedCategory) return [];

        return selectedCategory.children?.map((sub: any) => ({
            label: sub.name,
            value: sub.id
        })) || [];
    }, [selectedCategory]);

    const selectedSubCategory = selectedCategory?.children?.find(
        (sub: any) => sub.id === formik.values.subCategory
    );

    const childCategoryOptions = useMemo(() => {
        if (!selectedSubCategory) return [];

        return selectedSubCategory.children?.map((child: any) => ({
            label: child.name,
            value: child.id
        })) || [];
    }, [selectedSubCategory]);

    const unitOptions = useMemo(() => {
        return measurements?.map((item: any) => ({
            label: item.name,
            value: item.id
        }));
    }, [measurements]);

    const currencyOptions = useMemo(() => {
        return currency?.map((item: any) => ({
            label: item.name,
            value: item.id
        }));
    }, [currency]);

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
                                    {categoryOptions?.map((cat: any) => (
                                        <MenuItem key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </MenuItem>
                                    ))}
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
                                    disabled={!formik.values.category}
                                >
                                    {subCategoryOptions?.map((sub: any) => (
                                        <MenuItem key={sub.value} value={sub.value}>
                                            {sub.label}
                                        </MenuItem>
                                    ))}
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
                                    disabled={!formik.values.subCategory}
                                >
                                    {childCategoryOptions?.map((child: any) => (
                                        <MenuItem key={child.value} value={child.value}>
                                            {child.label}
                                        </MenuItem>
                                    ))}
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
                                    {unitOptions?.map((unit: any) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </MenuItem>
                                    ))}
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
                                    {currencyOptions?.map((unit: any) => (
                                        <MenuItem key={unit.value} value={unit.value}>
                                            {unit?.label}
                                        </MenuItem>
                                    ))}
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
                                    <MenuItem value="100% advance against purchase order">100% advance against purchase order</MenuItem>
                                    <MenuItem value="100% Cash and Carry">100% Cash and Carry</MenuItem>
                                    <MenuItem value="50% advance against P.O. & Rest 50% against scan copy of bill of landing">50% advance against P.O. & Rest 50% against scan copy of bill of landing</MenuItem>
                                    <MenuItem value="20% advance and Remaining 80% against Irreversible LIC at sight or as usance">20% advance and Remaining 80% against Irreversible LIC at sight or as usance</MenuItem>
                                    <MenuItem value="DA (Credit) should be after credit application processing">DA (Credit) should be after credit application processing</MenuItem>
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