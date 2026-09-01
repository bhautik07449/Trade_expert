import * as React from "react"
import {
    Box,
    Paper,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    CircularProgress,
    Stack,
    Divider,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import LockIcon from "@mui/icons-material/Lock"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import Supplierservice from "../../service/supplier.service"

export default function SuppliersLogin() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(() => {
        const supplier = localStorage.getItem('supplier')
        const token = localStorage.getItem('token')
        if (supplier === 'true' && token) {
            const cleanToken = token.replace(/^"|"$/g, '')
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.")
            const targetBase = isLocalhost ? "http://192.168.1.6:3003" : "https://supplier.sourceseas.com"
            window.location.href = `${targetBase}?token=${encodeURIComponent(cleanToken)}`
        }
    }, [])

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema,

        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const res = await Supplierservice.supplierLogin(values)

                if (res) {
                    toast.success(res?.data?.message || "Login successful")
                    const supplierData = res?.data?.supplier || res?.data?.data || res?.data || {}
                    const supplierId = supplierData?.id || supplierData?._id || supplierData?.user?.id || supplierData?.token
                    localStorage.setItem("supplier", "true")
                    if (supplierId) {
                        localStorage.setItem("token", JSON.stringify(supplierId))
                    }

                    const domain = window.location.hostname.includes("sourceseas.com") ? ".sourceseas.com" : window.location.hostname
                    document.cookie = `supplier_token=${supplierId}; path=/; domain=${domain}; max-age=86400; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`

                    resetForm()

                    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.startsWith("192.168.")
                    const targetBase = isLocalhost ? "http://localhost:3003" : "https://supplier.sourceseas.com"
                    window.location.href = `${targetBase}?token=${encodeURIComponent(supplierId)}`;
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Invalid email or password")
                resetForm()
            } finally {
                setSubmitting(false)
            }
        },
    })

    function goToSignup() {
        setTimeout(() => {
            navigate("/suppliers/register")
        }, 250)
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4f7fb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, md: 4 },
                background:
                    "linear-gradient(135deg, #eef4ff 0%, #f7fbff 45%, #ffffff 100%)",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    maxWidth: 1100,
                    borderRadius: { xs: 4, md: 6 },
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
                    boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        minHeight: { xs: 320, md: 620 },
                        p: { xs: 3, sm: 4, md: 6 },
                        color: "#fff",
                        backgroundImage:
                            "linear-gradient(rgba(4, 20, 45, 0.72), rgba(4, 20, 45, 0.78)), url('https://sourceseas.itcoders.in/img/front-end/supplier.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                width: 58,
                                height: 58,
                                borderRadius: 3,
                                bgcolor: "rgba(255,255,255,0.18)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <ShoppingBagIcon sx={{ fontSize: 32 }} />
                        </Box>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.15,
                                fontSize: { xs: "30px", sm: "38px", md: "46px" },
                                maxWidth: 520,
                            }}
                        >
                            Welcome to Sourceseas Supplier Portal
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mt: 2,
                                color: "rgba(255,255,255,0.86)",
                                fontSize: { xs: "15px", md: "17px" },
                                lineHeight: 1.8,
                                maxWidth: 520,
                            }}
                        >
                            Sign in to manage your sourcing requirements, connect with trusted
                            suppliers, track deals, and discover quality products for your
                            business.
                        </Typography>
                    </Box>

                    <Stack spacing={2.2} sx={{ mt: 5 }}>
                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                            <VerifiedUserIcon />
                            <Typography variant="body2">
                                Verified supplier network for safe sourcing
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                            <LocalShippingIcon />
                            <Typography variant="body2">
                                Easy product inquiry and order coordination
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                            <ShoppingBagIcon />
                            <Typography variant="body2">
                                Explore categories, deals, and business opportunities
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        p: { xs: 3, sm: 5, md: 6 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fff",
                    }}
                >
                    <Box sx={{ width: "100%", maxWidth: 420 }}>
                        <Paper
                            elevation={0}
                        >
                            <Typography
                                variant="overline"
                                sx={{
                                    color: "primary.main",
                                    fontWeight: 700,
                                    letterSpacing: 1,
                                }}
                            >
                                Supplier Login
                            </Typography>

                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 800,
                                    mt: 0.5,
                                    color: "#111827",
                                    fontSize: { xs: "28px", md: "34px" },
                                }}
                            >
                                Sign in to your account
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1.2, mb: 3 }}
                            >
                                Enter your email and password to access your supplier dashboard.
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
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    margin="normal"
                                    size="medium"
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

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        mt: 1,
                                    }}
                                >
                                    <Button
                                        size="small"
                                        onClick={() => navigate("/forgot-password", { state: { role: 'supplier' } })}
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Forgot password?
                                    </Button>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                    sx={{
                                        mt: 2.5,
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
                                    {formik.isSubmitting ? "Signing in..." : "Sign In"}
                                </Button>

                                <Divider sx={{ my: 3 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        New to Sourceseas?
                                    </Typography>
                                </Divider>

                                <Box sx={{ textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Create your supplier account and start sourcing smarter.
                                    </Typography>

                                    <Button
                                        onClick={goToSignup}
                                        variant="outlined"
                                        fullWidth
                                        sx={{
                                            mt: 1.5,
                                            py: 1.15,
                                            borderRadius: 2.5,
                                            textTransform: "none",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Create Supplier Account
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}