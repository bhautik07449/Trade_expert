"use client"

import * as React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import CMSservice from "../service/cms.service";
import { toast } from "react-toastify";

export default function Email() {
    const [sent, setSent] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email")
                .required("Email is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            setSent(true)

            try {
                const res = await CMSservice.newsletter(values)
                if (res) {
                    resetForm()
                    setSent(false)
                    toast.success(res?.data?.message)
                }
            } catch (error: any) {
                toast.error(error?.data?.message || "email not send to admin");

            } finally {
                setSent(false)
                resetForm()
            }
        },
        validateOnMount: true,
    })

    return (
        <Box
            sx={{
                background: "linear-gradient(to right, #b7e3a1, #9ee37d)",
                py: { xs: 2, md: 3 },
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        gap: { xs: 2, md: 3 },
                        maxWidth: "1150px",
                        mx: "auto",
                        px: 3,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            color: "#1a1a1a",
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        NEWSLETTER SIGNUP
                    </Typography>

                    <Box sx={{ flex: 1, width: "100%" }}>
                        <TextField
                            fullWidth
                            size="medium"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={(e) => {
                                formik.handleChange(e)
                                setSent(false)
                            }}
                            onBlur={formik.handleBlur}
                            error={(formik.touched.email || formik.submitCount > 0) && Boolean(formik.errors.email)}
                            aria-label="Email address"
                            sx={{
                                bgcolor: "#ffffff",
                                borderRadius: 2,
                            }}
                        />

                        {(formik.touched.email || formik.submitCount > 0) && formik.errors.email && (
                            <Typography
                                sx={{
                                    color: "error.main",
                                    fontSize: "12px",
                                    mt: 0.5,
                                    ml: 1,
                                }}
                            >
                                {formik.errors.email}
                            </Typography>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#5bc0de",
                            textTransform: "none",
                            px: 3,
                            py: 1,
                            fontSize: "14px",
                            whiteSpace: "nowrap",
                            width: { xs: "100%", md: "auto" },
                            "&:hover": {
                                backgroundColor: "#46b8da",
                            },
                        }}
                        type="submit"
                        disabled={formik.isSubmitting}
                        startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {formik.isSubmitting ? "Subscribing..." : sent ? "Subscribed" : "Subscribe"}
                    </Button>
                </Box>
            </form>
        </Box>
    );
}