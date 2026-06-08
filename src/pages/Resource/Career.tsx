import { useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    MenuItem,
    Chip,
    Divider,
    Stack,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material"
import { useState } from "react"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import CMSservice from "../../service/cms.service"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import PageMainLayout from "../../commonUI/PageMainLayout"
import { useNavigate } from "react-router-dom"

export default function Career() {
    const navigate = useNavigate()

    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            contact: "",
            email: "",
            family_member: "",
            age: "Metric Ton",
            marital_status: "shipment",
            gender: "Mr",
            education: "",
            certification: "",
            experience: "",
            work_interest: "",
            personal_initiative: "",
            nationality: "",
            caste: "",
            race: "",
            hobbies: "",
            culture: "",
            faith: "",
            income_class: "",
            hourly_income: "",
            monthly_income: "",
            yearly_income: "",
            tax_payer_class: "",
            house_ownership: "",
            economic_class: "",
            business_model: "",
            password: "",
            country: selectedCountry
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await CMSservice.careerForm(values)
                if (res) {
                    toast.success(res?.data?.message)
                    resetForm()
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "not send resubmit")
            }
        },
    })

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: { xs: 6, md: 10 }, }}>
            <PageMainLayout title="career" slug="career" image="https://sourceseas.itcoders.in/img/my_account_bg1.jpg" activeCountry="" setActiveCountry={() => { }} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: 4,
                        p: { xs: 2.5, sm: 4 },
                        bgcolor: "#fff",
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
                            Explore the Way You Want to Work
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                color: "primary.main",
                                fontWeight: 700,
                                letterSpacing: 1,
                                fontSize: { xs: "14px", sm: "16px" },
                            }}
                        >
                            #EQUALEMPLOYMENTOPPORTUNITY
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            flexWrap="wrap"
                            justifyContent="center"
                            sx={{ mt: 2 }}
                        >
                            <Chip label="Equity" color="primary" variant="outlined" />
                            <Chip label="Diversity" color="primary" variant="outlined" />
                            <Chip label="Inclusivity" color="primary" variant="outlined" />
                            <Chip label="Accessibility" color="primary" variant="outlined" />
                        </Stack>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 3 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 1,
                                        height: "100%",
                                        bgcolor: "#fafafa",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "primary.main",
                                            mb: 2,
                                            borderBottom: "2px solid",
                                            borderColor: "primary.main",
                                            pb: 1,
                                        }}
                                    >
                                        Personal Profile
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Name"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Contact"
                                            name="contact"
                                            value={formik.values.contact}
                                            onChange={formik.handleChange}
                                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                                            helperText={formik.touched.contact && formik.errors.contact}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Family Member"
                                            name="family_member"
                                            value={formik.values.family_member}
                                            onChange={formik.handleChange}
                                            error={formik.touched.family_member && Boolean(formik.errors.family_member)}
                                            helperText={formik.touched.family_member && formik.errors.family_member}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Age"
                                            name="age"
                                            value={formik.values.age}
                                            onChange={formik.handleChange}
                                            error={formik.touched.age && Boolean(formik.errors.age)}
                                            helperText={formik.touched.age && formik.errors.age}
                                        />
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Marital Status"
                                            name="marital_status"
                                            value={formik.values.marital_status}
                                            onChange={formik.handleChange}
                                            error={formik.touched.marital_status && Boolean(formik.errors.marital_status)}
                                            helperText={formik.touched.marital_status && formik.errors.marital_status}
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Gender"
                                            name="gender"
                                            value={formik.values.gender}
                                            onChange={formik.handleChange}
                                            error={formik.touched.gender && Boolean(formik.errors.gender)}
                                            helperText={formik.touched.gender && formik.errors.gender}
                                        >
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 1,
                                        height: "100%",
                                        bgcolor: "#fafafa",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "primary.main",
                                            mb: 2,
                                            borderBottom: "2px solid",
                                            borderColor: "primary.main",
                                            pb: 1,
                                        }}
                                    >
                                        Socio-Cultural
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Nationality"
                                            name="nationality"
                                            value={formik.values.nationality}
                                            onChange={formik.handleChange}
                                            error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                                            helperText={formik.touched.nationality && formik.errors.nationality}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Caste"
                                            name="caste"
                                            value={formik.values.caste}
                                            onChange={formik.handleChange}
                                            error={formik.touched.caste && Boolean(formik.errors.caste)}
                                            helperText={formik.touched.caste && formik.errors.caste}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Race"
                                            name="race"
                                            value={formik.values.race}
                                            onChange={formik.handleChange}
                                            error={formik.touched.race && Boolean(formik.errors.race)}
                                            helperText={formik.touched.race && formik.errors.race}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Hobbies"
                                            name="hobbies"
                                            value={formik.values.hobbies}
                                            onChange={formik.handleChange}
                                            error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
                                            helperText={formik.touched.hobbies && formik.errors.hobbies}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Culture"
                                            name="culture"
                                            value={formik.values.culture}
                                            onChange={formik.handleChange}
                                            error={formik.touched.culture && Boolean(formik.errors.culture)}
                                            helperText={formik.touched.culture && formik.errors.culture}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Faith"
                                            name="faith"
                                            value={formik.values.faith}
                                            onChange={formik.handleChange}
                                            error={formik.touched.faith && Boolean(formik.errors.faith)}
                                            helperText={formik.touched.faith && formik.errors.faith}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 1,
                                        height: "100%",
                                        bgcolor: "#fafafa",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "primary.main",
                                            mb: 2,
                                            borderBottom: "2px solid",
                                            borderColor: "primary.main",
                                            pb: 1,
                                        }}
                                    >
                                        Professional Interest
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Education"
                                            name="education"
                                            value={formik.values.education}
                                            onChange={formik.handleChange}
                                            error={formik.touched.education && Boolean(formik.errors.education)}
                                            helperText={formik.touched.education && formik.errors.education}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Certification"
                                            name="certification"
                                            value={formik.values.certification}
                                            onChange={formik.handleChange}
                                            error={formik.touched.certification && Boolean(formik.errors.certification)}
                                            helperText={formik.touched.certification && formik.errors.certification}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            rows={3}
                                            label="Experience"
                                            name="experience"
                                            value={formik.values.experience}
                                            onChange={formik.handleChange}
                                            error={formik.touched.experience && Boolean(formik.errors.experience)}
                                            helperText={formik.touched.experience && formik.errors.experience}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            rows={3}
                                            label="Work Interest"
                                            name="work_interest"
                                            value={formik.values.work_interest}
                                            onChange={formik.handleChange}
                                            error={formik.touched.work_interest && Boolean(formik.errors.work_interest)}
                                            helperText={formik.touched.work_interest && formik.errors.work_interest}
                                        />
                                        <TextField
                                            fullWidth size="small"
                                            label="Personal Initiative"
                                            name="personal_initiative"
                                            value={formik.values.personal_initiative}
                                            onChange={formik.handleChange}
                                            error={formik.touched.personal_initiative && Boolean(formik.errors.personal_initiative)}
                                            helperText={formik.touched.personal_initiative && formik.errors.personal_initiative}
                                        />
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, md: 3 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 1,
                                        height: "100%",
                                        bgcolor: "#fafafa",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "primary.main",
                                            mb: 2,
                                            borderBottom: "2px solid",
                                            borderColor: "primary.main",
                                            pb: 1,
                                        }}
                                    >
                                        Economical Identity
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Income Class"
                                            name="income_class"
                                            value={formik.values.income_class}
                                            onChange={formik.handleChange}
                                            error={formik.touched.income_class && Boolean(formik.errors.income_class)}
                                            helperText={formik.touched.income_class && formik.errors.income_class}
                                        >
                                            <MenuItem value="Hourly">Hourly</MenuItem>
                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                            <MenuItem value="Yearly">Yearly</MenuItem>
                                        </TextField>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Hourly Income"
                                            name="hourly_income"
                                            value={formik.values.hourly_income}
                                            onChange={formik.handleChange}
                                            error={formik.touched.hourly_income && Boolean(formik.errors.hourly_income)}
                                            helperText={formik.touched.hourly_income && formik.errors.hourly_income}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Monthly Income"
                                            name="monthly_income"
                                            value={formik.values.monthly_income}
                                            onChange={formik.handleChange}
                                            error={formik.touched.monthly_income && Boolean(formik.errors.monthly_income)}
                                            helperText={formik.touched.monthly_income && formik.errors.monthly_income}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Yearly Income"
                                            name="yearly_income"
                                            value={formik.values.yearly_income}
                                            onChange={formik.handleChange}
                                            error={formik.touched.yearly_income && Boolean(formik.errors.yearly_income)}
                                            helperText={formik.touched.yearly_income && formik.errors.yearly_income}
                                        />

                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Tax Payer Class"
                                            name="tax_payer_class"
                                            value={formik.values.tax_payer_class}
                                            onChange={formik.handleChange}
                                            error={formik.touched.tax_payer_class && Boolean(formik.errors.tax_payer_class)}
                                            helperText={formik.touched.tax_payer_class && formik.errors.tax_payer_class}
                                        >
                                            <MenuItem value="OAHU">OAHU</MenuItem>
                                            <MenuItem value="Inclusive">Inclusive</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>

                                        <TextField
                                            fullWidth size="small"
                                            label="House Ownership"
                                            name="house_ownership"
                                            value={formik.values.house_ownership}
                                            onChange={formik.handleChange}
                                            error={formik.touched.house_ownership && Boolean(formik.errors.house_ownership)}
                                            helperText={formik.touched.house_ownership && formik.errors.house_ownership}
                                        />

                                        <TextField
                                            select
                                            fullWidth size="small"
                                            label="Economic Class"
                                            name="economic_class"
                                            value={formik.values.economic_class}
                                            onChange={formik.handleChange}
                                            error={formik.touched.economic_class && Boolean(formik.errors.economic_class)}
                                            helperText={formik.touched.economic_class && formik.errors.economic_class}
                                        >
                                            <MenuItem value="Cooperative">Cooperative</MenuItem>
                                            <MenuItem value="Collective">Collective</MenuItem>
                                            <MenuItem value="Individual">Individual</MenuItem>
                                        </TextField>

                                        <TextField
                                            select
                                            fullWidth
                                            size="small"
                                            label="Business Model"
                                            name="business_model"
                                            value={formik.values.business_model}
                                            onChange={formik.handleChange}
                                            error={formik.touched.business_model && Boolean(formik.errors.business_model)}
                                            helperText={formik.touched.business_model && formik.errors.business_model}
                                        >
                                            <MenuItem value="Equity">Equity</MenuItem>
                                            <MenuItem value="Worker">Worker</MenuItem>
                                            <MenuItem value="Partner">Partner</MenuItem>
                                        </TextField>
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: { xs: "center", sm: "flex-end" },
                                        alignItems: { xs: "stretch", sm: "flex-start" },
                                        gap: 2,
                                        mt: 2,
                                        width: "100%",

                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        fullWidth
                                        size="small"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.password && Boolean(formik.errors.password)
                                        }
                                        helperText={formik.touched.password && formik.errors.password}
                                        InputProps={{
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
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            px: 5,
                                            py: 1.2,
                                            borderRadius: 1,
                                            textTransform: "none",
                                            fontWeight: 700,
                                            minWidth: { xs: "100%", sm: 180 },
                                        }}
                                        disabled={formik.isSubmitting}
                                        startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                                    >
                                        {formik.isSubmitting ? "Submitting..." : "Submit"}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>

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
                                onClick={() => navigate('/public_private_login')}
                                sx={{ textTransform: "none", fontWeight: 600 }}
                            >
                                Sign in
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Box>
    )
}