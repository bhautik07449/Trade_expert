import * as React from "react"
import {
    Box,
    Paper,
    Typography,
    Grid,
    Avatar,
    Chip,
    Button,
    Divider,
    Card,
    CardContent,
    Skeleton,
    Container,
    Stack,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import BusinessIcon from "@mui/icons-material/Business"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import LanguageIcon from "@mui/icons-material/Language"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import LogoutIcon from "@mui/icons-material/Logout"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import CategoryIcon from "@mui/icons-material/Category"
import LockIcon from "@mui/icons-material/Lock"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Investorservice from "../../service/investor.service"

export default function InvestorProfile() {
    const navigate = useNavigate()
    const [profile, setProfile] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    const fetchInvestorProfile = async () => {
        setLoading(true)
        try {
            const rawToken = sessionStorage.getItem("token")
            if (!rawToken) {
                toast.error("Session expired, please login again")
                navigate("/investors/login")
                return
            }
            const id = rawToken.replace(/^"|"$/g, '')
            const res = await Investorservice.getProfile(id)
            if (res?.data) {
                setProfile(res?.data?.data || res?.data)
            }
        } catch (error) {
            console.error("Error fetching investor profile:", error)
            toast.error("Failed to load investor profile")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchInvestorProfile()
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem("investor")
        sessionStorage.removeItem("token")
        toast.info("Logged out successfully")
        navigate("/investors/login")
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc", py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
            <Container maxWidth="lg">
                {/* Header Banner */}
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 4 },
                        mb: 4,
                        borderRadius: 4,
                        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                        color: "#fff",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                        <Avatar
                            sx={{
                                width: 72,
                                height: 72,
                                bgcolor: "primary.main",
                                fontSize: "2rem",
                                fontWeight: 700,
                                border: "3px solid rgba(255,255,255,0.2)",
                            }}
                        >
                            {profile?.firstName ? profile?.firstName[0]?.toUpperCase() : "I"}
                        </Avatar>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Typography variant="h4" fontWeight={800} sx={{ color: "#fff" }}>
                                    {loading ? <Skeleton width={180} /> : `${profile?.firstName || "Investor"} ${profile?.lastName || ""}`}
                                </Typography>
                                <Chip
                                    icon={<VerifiedUserIcon style={{ color: "#10b981", fontSize: 16 }} />}
                                    label="Verified Investor"
                                    size="small"
                                    sx={{ bgcolor: "rgba(16, 185, 129, 0.15)", color: "#10b981", fontWeight: 600, border: "1px solid rgba(16, 185, 129, 0.3)" }}
                                />
                            </Box>
                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                                MONETILE Product Access Portal & Investor Profile
                            </Typography>
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{
                            color: "#fff",
                            borderColor: "rgba(255,255,255,0.3)",
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "#fff",
                                bgcolor: "rgba(255,255,255,0.1)",
                            },
                        }}
                    >
                        Sign Out
                    </Button>
                </Paper>

                <Grid container spacing={3}>
                    {/* Left Column: Investor Profile Details */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                bgcolor: "#fff",
                            }}
                        >
                            <Typography variant="h6" fontWeight={700} sx={{ mb: 3, color: "#0f172a" }}>
                                Investor Profile Information
                            </Typography>

                            {loading ? (
                                <Stack spacing={2}>
                                    <Skeleton height={40} />
                                    <Skeleton height={40} />
                                    <Skeleton height={40} />
                                </Stack>
                            ) : (
                                <Grid container spacing={2.5}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <PersonIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Full Name</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.firstName} {profile?.lastName}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <EmailIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.email || "N/A"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <PhoneIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.phone || "N/A"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <BusinessIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Company Name</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.company_name || "N/A"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <CategoryIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Service Type</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.service_type || "N/A"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                                            <LanguageIcon color="primary" />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Website</Typography>
                                                <Typography variant="body1" fontWeight={600}>{profile?.website || "N/A"}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Divider sx={{ my: 1 }} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                                            <LocationOnIcon color="primary" sx={{ mt: 0.5 }} />
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Location</Typography>
                                                <Typography variant="body1" fontWeight={600}>
                                                    {[profile?.address, profile?.city, profile?.state, profile?.country].filter(Boolean).join(", ") || "N/A"}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            )}
                        </Paper>
                    </Grid>

                    {/* Right Column: MONETILE Product Card */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Card
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                border: "1px solid #e2e8f0",
                                background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardContent sx={{ p: 0 }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                    <Chip label="NEW PRODUCT" size="small" color="primary" sx={{ fontWeight: 700 }} />
                                    <LockIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                                </Box>

                                <Typography variant="h5" fontWeight={800} sx={{ color: "#0f172a", mb: 1 }}>
                                    MONETILE
                                </Typography>
                                <Typography variant="subtitle2" color="primary" fontWeight={600} sx={{ mb: 2 }}>
                                    monetile.sourceseas.com
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                                    MONETILE is an exclusive financial performance & equity management portal for authenticated investors. Track real-time live performance, equity holdings, and micro-to-macro economic metrics.
                                </Typography>

                                <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2.5, border: "1px solid #e2e8f0", mb: 3 }}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <TrendingUpIcon color="success" fontSize="small" />
                                        <Typography variant="body2" fontWeight={700}>
                                            Live Performance Tracker
                                        </Typography>
                                    </Stack>
                                    <Typography variant="caption" color="text.secondary">
                                        Watch | Wallet | Wizard — Powered for every instance recurrence.
                                    </Typography>
                                </Box>
                            </CardContent>

                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                onClick={() => {
                                    const rawToken = sessionStorage.getItem("token")?.replace(/^"|"$/g, '') || ""
                                    
                                    const targetBase = process.env.REACT_APP_MONETILE_URL
                                    const redirectUrl = `${targetBase}?token=${encodeURIComponent(rawToken)}`;
                                    window.open(redirectUrl, "_blank", "noopener,noreferrer");
                                }}
                                sx={{
                                    py: 1.5,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    fontSize: "15px",
                                    boxShadow: "0 10px 20px rgba(15, 23, 42, 0.15)",
                                }}
                            >
                                Launch MONETILE Live Platform
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
