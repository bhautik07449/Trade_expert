import * as React from "react"
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import Buyerservice from "../../service/buyes.service"
import Supplierservice from "../../service/supplier.service"
import CMSservice from "../../service/cms.service"
import Investorservice from "../../service/investor.service"
import { toast } from "react-toastify"

export default function ForgotPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get role from state, default to buyer
  const role = location.state?.role || "buyer"
  const [showPassword, setShowPassword] = React.useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("New password is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        let res
        if (role === "supplier") {
          res = await Supplierservice.forgotPassword(values)
        } else if (role === "career") {
          res = await CMSservice.forgotPassword(values)
        } else if (role === "investor") {
          res = await Investorservice.forgotPassword(values)
        } else {
          res = await Buyerservice.forgotPassword(values)
        }

        if (res) {
          toast.success(res?.data?.message || "Password has been successfully reset")
          resetForm()
          if (role === "supplier") {
            navigate("/suppliers/login")
          } else if (role === "career") {
            navigate("/public_private_login")
          } else if (role === "investor") {
            navigate("/investors/login")
          } else {
            navigate("/login")
          }
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to reset password")
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #eef4ff 0%, #f7fbff 45%, #ffffff 100%)",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 3, sm: 5 },
          borderRadius: { xs: 4, md: 6 },
          boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
          border: "1px solid rgba(226, 232, 240, 0.9)",
          bgcolor: "#fff",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 1,
            display: "block",
            textAlign: "center"
          }}
        >
          {role === "supplier" ? "Supplier Portal" : role === "career" ? "Public / Private Personnel" : role === "investor" ? "Investor / Trader Portal" : "Buyer Portal"}
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 800,
            mt: 1,
            textAlign: "center",
            color: "#111827",
            fontSize: { xs: "24px", md: "28px" },
          }}
        >
          Forgot Password
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, mb: 4, textAlign: "center" }}
        >
          Enter your email address and a new password to reset your account credentials.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            size="medium"
            margin="normal"
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
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f9fafb",
              },
            }}
          />

          <TextField
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            size="medium"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword as any}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
                bgcolor: "#f9fafb",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{
              mt: 3,
              py: 1.35,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "15px",
              boxShadow: "0 12px 24px rgba(25, 118, 210, 0.25)",
            }}
            startIcon={
              formik.isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {formik.isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              onClick={() => navigate(role === "supplier" ? "/suppliers/login" : role === "career" ? "/public_private_login" : role === "investor" ? "/investors/login" : "/login")}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
