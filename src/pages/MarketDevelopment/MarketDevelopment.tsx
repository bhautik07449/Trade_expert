import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    Stack,
    Slider,
    Chip,
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import PublicIcon from "@mui/icons-material/Public"
import CategoryIcon from "@mui/icons-material/Category"
import { useEffect, useMemo, useState } from "react"
import MarketDevelopmentService from "../../service/marketdevelopment.service"
import { AppDispatch } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../store/slice/categoriesSlice"
import { useFormik } from "formik"
import { toast } from "react-toastify"

type ProcessStep = {
    label?: string
}

type StageField = {
    label?: string
    type?: string
    options?: string[]
}

type Stage = {
    name?: string
    fields?: StageField[]
}

type MarketDevelopmentData = {
    market_data?: {
        processSteps?: ProcessStep[]
        stages?: Stage[]
    }
}

type FormValues = {
    country: string
    category: string
    subCategory: string
    product: string
    budget: string
    budget_range: number
    stages: {
        [stageName: string]: {
            [fieldLabel: string]: string
        }
    }
}

export default function MarketDevelopment() {
    const [data, setData] = useState<MarketDevelopmentData | null>(null)
    const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0)

    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);
    const dispatch = useDispatch<AppDispatch>();

    const { categories } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const getMarketDevelopmentData = async () => {
        try {
            const response = await MarketDevelopmentService.getMarketDevelopment()
            setData(response?.data?.data?.[0])
        }
        catch (error) {
            console.error("Error fetching market development data:", error)
        }
    }

    useEffect(() => {
        getMarketDevelopmentData()
    }, [])

    const processSteps: ProcessStep[] = data?.market_data?.processSteps || []

    const stages: Stage[] = data?.market_data?.stages || []

    const selectedStage = stages[selectedStageIndex]

    const processItems: StageField[] = selectedStage?.fields || []

    const formik = useFormik<FormValues>({
        initialValues: {
            country: selectedCountry || "",
            category: "",
            subCategory: "",
            product: "",
            budget: "",
            budget_range: 40,
            stages: {},
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {

                const response = await MarketDevelopmentService.addMarketDevelopment(values)

                if (response) {
                    resetForm()
                    toast.success(response?.data?.message || "Market development data submitted successfully!")
                }
            } catch (error: any) {
                toast.error(error?.response.data?.message || "Failed to submit market development data.")
            } finally {
                setSubmitting(false)
            }
        },
    })

    useEffect(() => {
        if (selectedCountry) {
            formik.setFieldValue("country", selectedCountry);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCountry]);

    const countryOptions = useMemo(() => {
        return categories?.map((country: any) => ({
            label: country.country,
            value: country.country,
        })) || [];
    }, [categories]);

    const selectedCountryObj = useMemo(() => {
        return categories?.find((c: any) => c.country === formik.values.country);
    }, [categories, formik.values.country]);

    const categoryOptions = useMemo(() => {
        return selectedCountryObj?.categories?.map((cat: any) => ({
            label: cat.name,
            value: String(cat.id),
        })) || [];
    }, [selectedCountryObj]);

    const selectedCategory = selectedCountryObj?.categories?.find(
        (cat: any) => String(cat.id) === formik.values.category
    );

    const subCategoryOptions = useMemo(() => {
        return selectedCategory?.subcategories?.map((sub: any) => ({
            label: sub.name,
            value: String(sub.id),
        })) || [];
    }, [selectedCategory]);

    const selectedSubCategory = selectedCategory?.subcategories?.find(
        (sub: any) => String(sub.id) === formik.values.subCategory
    );

    const productOptions = useMemo(() => {
        return selectedSubCategory?.products?.map((product: any) => ({
            label: product.name,
            value: String(product.id),
        })) || [];
    }, [selectedSubCategory]);

    return (
        <Box
            sx={{ bgcolor: "#f5f7fb", minHeight: "100vh", pb: 10 }}
            component="form"
            onSubmit={formik.handleSubmit}
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
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="country"
                                label="Choose Country"
                                value={formik.values.country}
                                onChange={(e) => {
                                    formik.setFieldValue("country", e.target.value)
                                    formik.setFieldValue("category", "")
                                    formik.setFieldValue("subCategory", "")
                                    formik.setFieldValue("product", "")
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <PublicIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Country</MenuItem>
                                {countryOptions.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="category"
                                label="Choose Category"
                                value={formik.values.category}
                                onChange={(e) => {
                                    formik.setFieldValue("category", e.target.value)
                                    formik.setFieldValue("subCategory", "")
                                    formik.setFieldValue("product", "")
                                }}
                                disabled={!formik.values.country}
                                InputProps={{
                                    startAdornment: (
                                        <BusinessCenterIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Category</MenuItem>
                                {categoryOptions.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="subCategory"
                                label="Choose Sub Category"
                                value={formik.values.subCategory}
                                onChange={(e) => {
                                    formik.setFieldValue("subCategory", e.target.value)
                                    formik.setFieldValue("product", "")
                                }}
                                disabled={!formik.values.category}
                                InputProps={{
                                    startAdornment: (
                                        <CategoryIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                                    ),
                                }}
                            >
                                <MenuItem value="">Select Sub Category</MenuItem>
                                {subCategoryOptions.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="product"
                                label="Choose Product"
                                value={formik.values.product}
                                onChange={formik.handleChange}
                                disabled={!formik.values.subCategory}
                            >
                                <MenuItem value="">Select Product</MenuItem>
                                {productOptions.map((item: any) => (
                                    <MenuItem key={item.value} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
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

                    <Grid container spacing={2} alignItems="stretch" justifyContent="center">
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
                                        {step?.label}
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
                                {stages.map((stage: Stage, index: number) => (
                                    <Box
                                        key={index}
                                        onClick={() => setSelectedStageIndex(index)}
                                        sx={{
                                            p: 1.2,
                                            borderRadius: 2,
                                            border:
                                                selectedStageIndex === index
                                                    ? "2px solid #F4A62A"
                                                    : "1px solid #e5e7eb",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            bgcolor: selectedStageIndex === index ? "#fff7ed" : "#fff",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Chip
                                            label={index + 1}
                                            size="small"
                                            sx={{
                                                bgcolor: selectedStageIndex === index ? "#F4A62A" : "#e5e7eb",
                                                color: selectedStageIndex === index ? "#fff" : "#374151",
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
                                            {stage?.name}
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
                                {processItems.length > 0 ? (
                                    processItems.map((item: StageField, index: number) => {
                                        const stageName = selectedStage?.name || `stage_${selectedStageIndex}`
                                        const fieldName = item?.label || `field_${index}`
                                        const formikName = `stages.${stageName}.${fieldName}`

                                        return item?.type === "text" ? (
                                            <TextField
                                                key={index}
                                                fullWidth
                                                size="small"
                                                name={formikName}
                                                label={item?.label}
                                                placeholder={item?.label}
                                                value={formik.values.stages?.[stageName]?.[fieldName] || ""}
                                                onChange={formik.handleChange}
                                            />
                                        ) : item?.type === "select" ? (
                                            <TextField
                                                key={index}
                                                select
                                                fullWidth
                                                size="small"
                                                name={formikName}
                                                label={item?.label}
                                                value={formik.values.stages?.[stageName]?.[fieldName] || ""}
                                                onChange={formik.handleChange}
                                            >
                                                <MenuItem value="">Select {item?.label}</MenuItem>

                                                {(item?.options || []).map((option: string, idx: number) => (
                                                    <MenuItem key={idx} value={option.trim()}>
                                                        {option.trim()}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : null
                                    })
                                ) : (
                                    <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                                        No fields found for this stage.
                                    </Typography>
                                )}
                            </Stack>
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
                                        name="budget_range"
                                        value={formik.values.budget_range}
                                        valueLabelDisplay="auto"
                                        step={10}
                                        marks
                                        min={0}
                                        max={100}
                                        onChange={(_, value) => {
                                            formik.setFieldValue("budget_range", value)
                                        }}
                                        sx={{
                                            color: "#F4A62A",
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="budget"
                                        label="Estimated Budget"
                                        placeholder="Example: 10,00,000"
                                        value={formik.values.budget}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 2 }}>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        disabled={formik.isSubmitting}
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
                                        {formik.isSubmitting ? "Submitting..." : "Submit"}
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