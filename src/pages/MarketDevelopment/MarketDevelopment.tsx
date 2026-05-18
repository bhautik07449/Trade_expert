import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Stack,
    Divider,
    Slider,
    Chip,
} from "@mui/material"

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import PublicIcon from "@mui/icons-material/Public"
import CategoryIcon from "@mui/icons-material/Category"

export default function MarketDevelopment() {
    const processSteps = [
        "Industry Research",
        "Competitor Mapping",
        "Market Positioning",
        "Business Strategy",
        "Execution Support",
    ]

    const stages = [
        "Concept",
        "Research",
        "Planning",
        "Licensing",
        "Vendor Setup",
        "Product Setup",
        "Marketing",
        "Launch",
    ]

    const processItems = [
        "Land",
        "Licensing",
        "Services",
        "Product / Manpower",
        "Components",
    ]

    return (
        <Box sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 10 }}>
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
                    src="https://sourceseas.itcoders.in/img/front-end/brands.jpg"
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
                            Market Development
                        </Typography>

                        <Typography
                            sx={{
                                color: "#fff",
                                mt: 1,
                                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            }}
                        >
                            Experience turnkey delivered differently
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1180px",
                    mx: "auto",
                    px: { xs: 2, sm: 3 },
                    mt: { xs: -3, md: -4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 2.5, sm: 4 },
                        borderRadius: 4,
                        mb: 4,
                    }}
                >
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: "#1f2937",
                                fontSize: { xs: "24px", sm: "32px" },
                            }}
                        >
                            Choose Industry
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                                mt: 1,
                            }}
                        >
                            Choose country-specific category and understand the complete
                            development process.
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Choose Country"
                                defaultValue=""
                                InputProps={{
                                    startAdornment: (
                                        <PublicIcon
                                            fontSize="small"
                                            sx={{ mr: 1, color: "text.secondary" }}
                                        />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Country</MenuItem>
                                <MenuItem value="India">India</MenuItem>
                                <MenuItem value="USA">USA</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                                <MenuItem value="UAE">UAE</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Choose Industry"
                                defaultValue=""
                                InputProps={{
                                    startAdornment: (
                                        <BusinessCenterIcon
                                            fontSize="small"
                                            sx={{ mr: 1, color: "text.secondary" }}
                                        />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Industry</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Textile">Textile</MenuItem>
                                <MenuItem value="Agriculture">Agriculture</MenuItem>
                                <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                                <MenuItem value="Export">Export</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Choose Category"
                                defaultValue=""
                                InputProps={{
                                    startAdornment: (
                                        <CategoryIcon
                                            fontSize="small"
                                            sx={{ mr: 1, color: "text.secondary" }}
                                        />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                <MenuItem value="Startup">Startup</MenuItem>
                                <MenuItem value="Expansion">Expansion</MenuItem>
                                <MenuItem value="Export Setup">Export Setup</MenuItem>
                                <MenuItem value="Turnkey Project">Turnkey Project</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Specification"
                                placeholder="Enter specific product / service requirement"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Categorizer"
                                placeholder="Enter business category"
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2.5, sm: 4 },
                        borderRadius: 4,
                        mb: 4,
                    }}
                >
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 800,
                                color: "#1f2937",
                                fontSize: { xs: "24px", sm: "32px" },
                            }}
                        >
                            Understand the Process & Select the Component
                        </Typography>

                        <Typography sx={{ color: "text.secondary", mt: 1 }}>
                            Follow each step to review your market development journey.
                        </Typography>
                    </Box>

                    <Grid container spacing={2} alignItems="stretch">
                        {processSteps.map((step, index) => (
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 2.4 }}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        height: "100%",
                                        borderRadius: 3,
                                        textAlign: "center",
                                        bgcolor: "#fbf8f4",
                                        position: "relative",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            width: 34,
                                            height: 34,
                                            borderRadius: "50%",
                                            bgcolor: "#F4A62A",
                                            color: "#fff",
                                            mx: "auto",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 800,
                                            mb: 1.5,
                                        }}
                                    >
                                        {index + 1}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: "#374151",
                                            fontSize: "14px",
                                        }}
                                    >
                                        {step}
                                    </Typography>

                                    {index !== processSteps.length - 1 && (
                                        <ArrowForwardIcon
                                            sx={{
                                                display: { xs: "none", md: "block" },
                                                position: "absolute",
                                                right: -20,
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                color: "#9ca3af",
                                                zIndex: 2,
                                            }}
                                        />
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                <Grid container spacing={3.5}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 2.5, sm: 3 },
                                borderRadius: 4,
                                height: "100%",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    mb: 2,
                                    color: "#1f2937",
                                }}
                            >
                                Stages
                            </Typography>

                            <Stack spacing={1.2}>
                                {stages.map((stage, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            p: 1.2,
                                            borderRadius: 2,
                                            border: "1px solid #e5e7eb",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            bgcolor: index === 0 ? "#fff7ed" : "#fff",
                                        }}
                                    >
                                        <Chip
                                            label={index + 1}
                                            size="small"
                                            sx={{
                                                bgcolor: index === 0 ? "#F4A62A" : "#e5e7eb",
                                                color: index === 0 ? "#fff" : "#374151",
                                                fontWeight: 700,
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                                color: "#374151",
                                            }}
                                        >
                                            {stage}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 2.5, sm: 3 },
                                borderRadius: 4,
                                height: "100%",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 800,
                                    mb: 0.5,
                                    color: "#1f2937",
                                    textAlign: "center",
                                }}
                            >
                                Monitor Your Process
                            </Typography>

                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    textAlign: "center",
                                    mb: 2.5,
                                    fontSize: "14px",
                                }}
                            >
                                Select components required for your turnkey development.
                            </Typography>

                            <Stack spacing={1.5}>
                                {processItems.map((item, index) => (
                                    <Paper
                                        key={index}
                                        variant="outlined"
                                        sx={{
                                            p: 1.6,
                                            borderRadius: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 2,
                                            bgcolor: "#fafafa",
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <CheckCircleIcon
                                                sx={{ color: "#F4A62A", fontSize: 22 }}
                                            />

                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#374151",
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </Box>

                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Select
                                        </Button>
                                    </Paper>
                                ))}
                            </Stack>

                            <Grid container spacing={1.5} sx={{ mt: 2.5 }}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField fullWidth size="small" label="Category" />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField fullWidth size="small" label="Sub Category" />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <TextField fullWidth size="small" label="Product" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: { xs: 2.5, sm: 3 },
                                borderRadius: 4,
                            }}
                        >
                            <Grid container spacing={3} alignItems="center">
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                            color: "#1f2937",
                                        }}
                                    >
                                        Select Your Budget
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontSize: "14px",
                                            mt: 1,
                                        }}
                                    >
                                        Choose an estimated budget range for your project.
                                    </Typography>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Slider
                                        defaultValue={40}
                                        valueLabelDisplay="auto"
                                        step={10}
                                        marks
                                        min={0}
                                        max={100}
                                        sx={{
                                            color: "#F4A62A",
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Estimated Budget"
                                        placeholder="Example: 10,00,000"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            bgcolor: "#3E3126",
                                            py: 1.2,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            fontWeight: 700,
                                            "&:hover": {
                                                bgcolor: "#2c231c",
                                            },
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}