import * as React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
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
import PublicIcon from "@mui/icons-material/Public"
import LocationCityIcon from "@mui/icons-material/LocationCity"
import MapIcon from "@mui/icons-material/Map"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Investorservice from "../../service/investor.service"
import UpcommingFeatures from "../../commonUI/UpcommingFeatures"
import AbcTradeoffer from "../../component/AbcTradeoffer"

export default function SignupForm() {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    company_name: Yup.string().required("Company name required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string().required("Contact required"),
    address: Yup.string().required("Address required"),
    city: Yup.string().required("City required"),
    state: Yup.string().required("State required"),
    country: Yup.string().required("Country required"),
    website: Yup.string().url("Invalid URL"),
    service_type: Yup.string().required("Service type required"),
  })

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      company_name: "",
      phone: "",
      service_type: "",
      address: "",
      city: "",
      state: "",
      country: "",
      website: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await Investorservice.investorRegister(values)

        if (res) {
          toast.success("Investor registered successfully")
          resetForm()
          navigate("/investors/login")
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Email or Mobile already exists")
      }
    },
  })

  function goToLogin() {
    setTimeout(() => {
      navigate("/investors/login")
    }, 250)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb"
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
              Investor / Trader Registration
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#fff",
                mt: 1,
                fontSize: { xs: "14px", sm: "16px" },
              }}
            >
              Investment & Trading Opportunities at Sourceseas
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "950px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          pb: { xs: 6, md: 10 },
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
              Create Investor Account
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "text.secondary",
              }}
            >
              Fill in your details to register with Sourceseas.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12, sm: 6 }}>
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

              <Grid size={{ xs: 12, sm: 6 }}>
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
                  name="company_name"
                  fullWidth
                  size="small"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.company_name &&
                    Boolean(formik.errors.company_name)
                  }
                  helperText={
                    formik.touched.company_name && formik.errors.company_name
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

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  size="small"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCityIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="State"
                  name="state"
                  fullWidth
                  size="small"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="Country"
                  name="country"
                  fullWidth
                  size="small"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon fontSize="small" />
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
                  label="Service Type"
                  name="service_type"
                  fullWidth
                  size="small"
                  value={formik.values.service_type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.service_type &&
                    Boolean(formik.errors.service_type)
                  }
                  helperText={
                    formik.touched.service_type && formik.errors.service_type
                  }
                >
                  <MenuItem value="Equity">Equity</MenuItem>
                  <MenuItem value="Commodities">Commodities</MenuItem>
                  <MenuItem value="Real Estate">Real Estate</MenuItem>
                  <MenuItem value="Venture Capital">Venture Capital</MenuItem>
                  <MenuItem value="Crypto">Crypto</MenuItem>
                  <MenuItem value="Forex">Forex</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
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

      <AbcTradeoffer />

      <UpcommingFeatures />
    </Box >
  )
}