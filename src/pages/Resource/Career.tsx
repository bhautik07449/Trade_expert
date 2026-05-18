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
} from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { useEffect } from "react"
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice"
import SEO from "../../component/SEO"

export default function Career() {
    const dispatch = useDispatch<AppDispatch>()

    const { pageDetail } = useSelector((state: RootState) => state.page)

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("career"))
    }, [dispatch])

    return (
        <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || "Career"}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
                />
            )}

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
                    src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                    alt="Career Banner"
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
                        bgcolor: "rgba(0,0,0,0.45)",
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
                                textTransform: "capitalize",
                            }}
                        >
                            Build Career at Sourceseas
                        </Typography>

                        <Typography
                            sx={{
                                color: "#fff",
                                mt: 1,
                                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            }}
                        >
                            Resources → Work Interest & Career
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1440px",
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

                    <Box component="form">
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
                                        <TextField fullWidth size="small" label="Name" />
                                        <TextField fullWidth size="small" label="Contact" />
                                        <TextField fullWidth size="small" label="Email" />
                                        <TextField fullWidth size="small" label="Family Member" />
                                        <TextField fullWidth size="small" label="Age" />
                                        <TextField select fullWidth size="small" label="Marital Status">
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Married">Married</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                        <TextField select fullWidth size="small" label="Gender">
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
                                        Professional Interest
                                    </Typography>

                                    <Stack spacing={2}>
                                        <TextField fullWidth size="small" label="Education" />
                                        <TextField fullWidth size="small" label="Certification" />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            rows={3}
                                            label="Experience"
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            rows={3}
                                            label="Work Interest"
                                        />
                                        <TextField fullWidth size="small" label="Personal Initiative" />
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
                                        <TextField fullWidth size="small" label="Nationality" />
                                        <TextField fullWidth size="small" label="Caste" />
                                        <TextField fullWidth size="small" label="Race" />
                                        <TextField fullWidth size="small" label="Hobbies" />
                                        <TextField fullWidth size="small" label="Culture" />
                                        <TextField fullWidth size="small" label="Faith" />
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
                                        <TextField select fullWidth size="small" label="Income Class">
                                            <MenuItem value="Hourly">Hourly</MenuItem>
                                            <MenuItem value="Monthly">Monthly</MenuItem>
                                            <MenuItem value="Yearly">Yearly</MenuItem>
                                        </TextField>

                                        <TextField fullWidth size="small" label="Hourly Income" />
                                        <TextField fullWidth size="small" label="Monthly Income" />
                                        <TextField fullWidth size="small" label="Yearly Income" />

                                        <TextField select fullWidth size="small" label="Tax Payer Class">
                                            <MenuItem value="OAHU">OAHU</MenuItem>
                                            <MenuItem value="Inclusive">Inclusive</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>

                                        <TextField fullWidth size="small" label="House Ownership" />

                                        <TextField select fullWidth size="small" label="Economic Class">
                                            <MenuItem value="Cooperative">Cooperative</MenuItem>
                                            <MenuItem value="Collective">Collective</MenuItem>
                                            <MenuItem value="Individual">Individual</MenuItem>
                                        </TextField>

                                        <TextField select fullWidth size="small" label="Business Model">
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
                                        justifyContent: { xs: "center", sm: "flex-end" },
                                        mt: 2,
                                    }}
                                >
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
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}