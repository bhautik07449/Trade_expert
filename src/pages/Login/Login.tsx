import * as React from "react"
import { keyframes } from "@mui/material/styles"
import { Box, Paper, Typography, TextField, InputAdornment, IconButton, Button, CircularProgress } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import Buyerservice from "../../service/buyes.service"
import { toast } from "react-toastify"

const flipIn = keyframes`
  from {
    transform: rotateY(-90deg);
    opacity: 0;
  }
  to {
    transform: rotateY(0);
    opacity: 1;
  }
`

const flipOut = keyframes`
  from {
    transform: rotateY(0);
    opacity: 1;
  }
  to {
    transform: rotateY(90deg);
    opacity: 0;
  }
`
export default function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [flipExit, setFlipExit] = React.useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters required")
      .required("Password is required")
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema,

    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {

        const res = await Buyerservice.buyerLogin(values)

        if (res) {
          toast.success(res?.data?.message)
          localStorage.setItem("buyer", "true")
          localStorage.setItem("token", JSON.stringify(res?.data?.data?.id))
          resetForm()
          navigate('/')
        }

      } catch {
        toast.error("Invalid email or password")
        resetForm()
      } finally {
        setSubmitting(false)
      }
    }
  })



  function goToSignup() {
    setFlipExit(true)
    setTimeout(() => {
      navigate("/sign-up")
    }, 250)
  }

  return (
    <Box
      component="section"
      aria-label="Login section"
      sx={{
        perspective: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F0EB 0%, #E8D8C1 100%)",
        px: 2,
        py: 4,
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          animation: `${flipExit ? flipOut : flipIn} ${flipExit ? "250ms" : "500ms"} ease`,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sign in to continue
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
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
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"

            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

            error={formik.touched.password && Boolean(formik.errors.password)}
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
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ mt: 2 }}
            startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {formik.isSubmitting ? "Signing in..." : "Sign In"}
          </Button>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              {"Don't have an account? "}
              <Button onClick={goToSignup} size="small">
                Create one
              </Button>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
