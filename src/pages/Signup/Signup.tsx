"use client"

import * as React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { keyframes } from "@mui/material/styles"
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
  Grid
} from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Buyerservice from "../../service/buyesservice"

const flipIn = keyframes`
from { transform: rotateY(-90deg); opacity: 0; }
to { transform: rotateY(0); opacity: 1; }
`

const flipOut = keyframes`
from { transform: rotateY(0); opacity: 1; }
to { transform: rotateY(90deg); opacity: 0; }
`

export default function SignupForm() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [flipExit, setFlipExit] = React.useState(false)

  const validationSchema = Yup.object({
    gender: Yup.string().required("Required"),
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    companyName: Yup.string().required("Company name required"),
    password: Yup.string().min(8, "Minimum 8 characters").required("Password required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string().required("Contact required"),
    address: Yup.string().required("Address required"),
    website: Yup.string().url("Invalid URL"),
    businessType: Yup.string().required("Business type required"),
  })

  const formik = useFormik({
    initialValues: {
      gender: "Mr",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      phone: "",
      businessType: "",
      address: "",
      website: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values", values)

      try {
        const res = await Buyerservice.buyerRegister(values)
        if (res) {
          toast.success("Buyer Register sucessfully")
          resetForm()
          navigate('/login')
        }
      } catch (error) {
        toast.error("buyer not Register")
      }
    }
  })

  function goToLogin() {
    setFlipExit(true)
    setTimeout(() => {
      navigate("/login")
    }, 250)
  }

  return (
    <Box
      sx={{
        perspective: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 700,
          p: 4,
          borderRadius: 3,
          animation: `${flipExit ? flipOut : flipIn} 500ms ease`
        }}
      >

        <Typography variant="h5" sx={{ mb: 3 }}>Create your account</Typography>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>

            <Grid size={{ xs: 12, sm: 2 }}>
              <TextField
                select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                fullWidth
              >
                <MenuItem value="Mr">Mr.</MenuItem>
                <MenuItem value="Mrs">Mrs.</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 5 }}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 5 }}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Company Name"
                name="companyName"
                fullWidth
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Business Email"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Business Contact"
                name="phone"
                fullWidth
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Business Address"
                name="address"
                multiline
                rows={4}
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Business Website"
                name="website"
                fullWidth
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                label="Business Type"
                name="businessType"
                fullWidth
                value={formik.values.businessType}
                onChange={formik.handleChange}
                error={formik.touched.businessType && Boolean(formik.errors.businessType)}
                helperText={formik.touched.businessType && formik.errors.businessType}
              >
                <MenuItem value="Distributor">Distributor</MenuItem>
                <MenuItem value="Retailer">Retailer</MenuItem>
                <MenuItem value="Manufacturing and Processing">Manufacturing and Processing</MenuItem>
                <MenuItem value="Buying house">Buying house</MenuItem>
                <MenuItem value="Trading unit">Trading unit</MenuItem>
                <MenuItem value="Warehousing and Distribution">Warehousing and Distribution</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" fullWidth>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2">
            Already have account?
            <Button size="small" onClick={goToLogin}>
              Sign in
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}