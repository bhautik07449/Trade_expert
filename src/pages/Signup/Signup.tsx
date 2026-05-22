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
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import PhoneIcon from "@mui/icons-material/Phone"
import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Buyerservice from "../../service/buyes.service"
import UpcommingFeatures from "../../commonUI/UpcommingFeatures"

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
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password required"),
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
      try {
        const res = await Buyerservice.buyerRegister(values)

        if (res) {
          toast.success("Buyer registered successfully")
          resetForm()
          navigate("/login")
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Email or Mobile already exists")
      }
    },
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
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        pb: { xs: 5, md: 8 },
      }}
    >
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
          src="https://sourceseas.itcoders.in/img/front-end/supplier.jpg"
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
              Buyer Registration
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                mt: 1,
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              Supplying & Tie-up Benefits at Sourceseas
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "950px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          mt: { xs: -4, md: -6 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 4,
            animation: `${flipExit ? flipOut : flipIn} 0.35s ease`,
            transformStyle: "preserve-3d",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1f2937",
                fontSize: { xs: "24px", sm: "32px" },
              }}
            >
              Create Buyer Account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
              }}
            >
              Fill in your business details to register with Sourceseas.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField
                  select
                  fullWidth
                  name="gender"
                  label="Title"
                  size="small"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <MenuItem value="Mr">Mr.</MenuItem>
                  <MenuItem value="Mrs">Mrs.</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  name="firstName"
                  label="First Name"
                  size="small"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName &&
                    Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 5 }}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  size="small"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Company Name"
                  name="companyName"
                  fullWidth
                  size="small"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Business Email"
                  name="email"
                  fullWidth
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Business Contact"
                  name="phone"
                  fullWidth
                  size="small"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Business Address"
                  name="address"
                  multiline
                  size="small"
                  rows={3}
                  fullWidth
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ alignSelf: "flex-start", mt: 1 }}
                      >
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Business Website"
                  name="website"
                  fullWidth
                  size="small"
                  placeholder="https://example.com"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  label="Business Type"
                  name="businessType"
                  fullWidth
                  size="small"
                  value={formik.values.businessType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.businessType &&
                    Boolean(formik.errors.businessType)
                  }
                  helperText={
                    formik.touched.businessType && formik.errors.businessType
                  }
                >
                  <MenuItem value="Distributor">Distributor</MenuItem>
                  <MenuItem value="Retailer">Retailer</MenuItem>
                  <MenuItem value="Manufacturing and Processing">
                    Manufacturing and Processing
                  </MenuItem>
                  <MenuItem value="Buying house">Buying house</MenuItem>
                  <MenuItem value="Trading unit">Trading unit</MenuItem>
                  <MenuItem value="Warehousing and Distribution">
                    Warehousing and Distribution
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={formik.isSubmitting}
                  sx={{
                    mt: 1,
                    py: 1.2,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 600
                  }}
                  startIcon={
                    formik.isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Already have an account?
            </Typography>

            <Button
              size="small"
              onClick={goToLogin}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Sign in
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button
              size="small"
              variant="text"
              onClick={() => navigate("/credit-account")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Credit Account Form
            </Button>
          </Box>
        </Paper>
      </Box>

      <UpcommingFeatures />
    </Box>
  )
}