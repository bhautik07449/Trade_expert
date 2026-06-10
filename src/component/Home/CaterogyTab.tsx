import {
    Box,
    Typography,
    Skeleton,
    Grid,
    Paper,
    Stack,
} from "@mui/material"
import CategoryIcon from "@mui/icons-material/Category"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LabelTitle from "../../commonUI/labelTitle"
import HomePageservice from "../../service/homepages.service"
import { useSelector } from "react-redux"
import NoDataFound from "../../commonUI/NoDataFound"

export default function CategoryTab() {
    const navigate = useNavigate()
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const getCategories = async (country: string) => {
        setCategories([])
        try {
            setLoading(true)
            const res = await HomePageservice.getCategoriesByCountry(country)

            if (res) {
                setCategories(res?.data || [])
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (selectedCountry) {
            getCategories(selectedCountry)
        }
    }, [selectedCountry])

    const handleCategoryClick = (slug: string) => {
        navigate(`/category/${slug}`)
    }

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                py: { xs: 6, md: 10 },
                bgcolor: "background.default",
                background: "white",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 70,
                    right: -120,
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(167, 123, 88, 0.22), transparent 68%)",
                    filter: "blur(14px)",
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    bottom: 60,
                    left: -130,
                    width: 270,
                    height: 270,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(95, 75, 59, 0.16), transparent 68%)",
                    filter: "blur(16px)",
                }}
            />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 },
                    boxSizing: "border-box",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <LabelTitle title="Active" label="Categories" tagLine={`Explore the most sought-after product categories in ${selectedCountry ? selectedCountry : "the world"}, and discover the key sectors driving trade and economic growth in your selected region.`} />

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        maxWidth: "720px",
                        mx: "auto",
                        mb: { xs: 4, md: 6 },
                        mt: { xs: -1.5, md: -2.5 },
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        lineHeight: 1.8,
                    }}
                >

                </Typography>

                {loading ? (
                    <Grid container spacing={2.5}>
                        {[...Array(8)].map((_, i) => (
                            <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={i}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 2, sm: 2.5 },
                                        minHeight: 150,
                                        borderRadius: 4,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        bgcolor: "background.paper",
                                        boxShadow: "0 10px 28px rgba(59, 48, 39, 0.05)",
                                    }}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={48}
                                        height={48}
                                        sx={{
                                            mx: "auto",
                                            mb: 2,
                                            bgcolor: "primary.light",
                                        }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="80%"
                                        sx={{
                                            mx: "auto",
                                            bgcolor: "primary.light",
                                        }}
                                    />
                                    <Skeleton
                                        variant="rounded"
                                        width={80}
                                        height={24}
                                        sx={{
                                            mx: "auto",
                                            mt: 1.5,
                                            borderRadius: 99,
                                            bgcolor: "primary.light",
                                        }}
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : categories && categories.length > 0 ? (
                    <Grid container spacing={2.5} justifyContent="center">
                        {(Array.isArray(categories) ? categories : []).map((cat: any, index: number) => (
                            <Grid
                                size={{ xs: 6, sm: 6, md: 4, lg: 3 }}
                                key={cat.id ?? cat.slug ?? index}
                            >
                                <Paper
                                    id={`category-card-${index}-${cat.slug || cat.id}`}
                                    elevation={0}
                                    onClick={() => handleCategoryClick(cat?.id)}
                                    sx={{
                                        height: "100%",
                                        minHeight: { xs: 145, sm: 160 },
                                        p: { xs: 2, sm: 2.5 },
                                        borderRadius: 4,
                                        position: "relative",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        bgcolor: "background.paper",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        boxShadow: "0 10px 30px rgba(59, 48, 39, 0.06)",
                                        transition: "all 0.35s ease",

                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            inset: 0,
                                            background:
                                                "linear-gradient(135deg, rgba(167,123,88,0.16), rgba(232,216,193,0.35))",
                                            opacity: 0,
                                            transition: "opacity 0.35s ease",
                                        },

                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: 4,
                                            background:
                                                "linear-gradient(90deg, #A77B58, #5F4B3B)",
                                            transform: "scaleX(0)",
                                            transformOrigin: "left",
                                            transition: "transform 0.35s ease",
                                        },

                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            borderColor: "primary.main",
                                            boxShadow: "0 22px 45px rgba(59, 48, 39, 0.14)",
                                        },

                                        "&:hover::before": {
                                            opacity: 1,
                                        },

                                        "&:hover::after": {
                                            transform: "scaleX(1)",
                                        },

                                        "&:hover .categoryIcon": {
                                            bgcolor: "primary.main",
                                            color: "#fff",
                                            transform: "scale(1.12) rotate(-6deg)",
                                        },

                                        "&:hover .categoryName": {
                                            color: "primary.dark",
                                        },

                                        "&:hover .exploreText": {
                                            color: "primary.dark",
                                            opacity: 1,
                                            transform: "translateY(0)",
                                        },

                                        "&:hover .arrowIcon": {
                                            transform: "translateX(4px)",
                                        },

                                        "&:hover .circleDecor": {
                                            transform: "scale(1.45)",
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    <Box
                                        className="circleDecor"
                                        sx={{
                                            position: "absolute",
                                            width: 110,
                                            height: 110,
                                            borderRadius: "50%",
                                            top: -38,
                                            right: -38,
                                            background:
                                                "radial-gradient(circle, rgba(167,123,88,0.22), transparent 68%)",
                                            opacity: 0.55,
                                            transition: "all 0.4s ease",
                                        }}
                                    />

                                    <Stack
                                        spacing={1.8}
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            height: "100%",
                                            position: "relative",
                                            zIndex: 1,
                                            textAlign: "center",
                                        }}
                                    >
                                        <Box
                                            className="categoryIcon"
                                            sx={{
                                                width: { xs: 48, sm: 56 },
                                                height: { xs: 48, sm: 56 },
                                                borderRadius: 3,
                                                bgcolor: "primary.light",
                                                color: "primary.dark",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.35s ease",

                                                "& svg": {
                                                    fontSize: { xs: 26, sm: 30 },
                                                },
                                            }}
                                        >
                                            <CategoryIcon />
                                        </Box>

                                        <Box>
                                            <Typography
                                                className="categoryName"
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: {
                                                        xs: "0.82rem",
                                                        sm: "0.92rem",
                                                        md: "0.98rem",
                                                    },
                                                    color: "text.primary",
                                                    lineHeight: 1.35,
                                                    letterSpacing: "0.1px",
                                                    transition: "color 0.3s ease",
                                                }}
                                            >
                                                {cat.name}
                                            </Typography>

                                            <Stack
                                                className="exploreText"
                                                direction="row"
                                                spacing={0.5}
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{
                                                    mt: 1,
                                                    color: "primary.main",
                                                    opacity: { xs: 1, md: 0.7 },
                                                    transform: {
                                                        xs: "translateY(0)",
                                                        md: "translateY(4px)",
                                                    },
                                                    transition: "all 0.35s ease",
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        fontSize: "0.68rem",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.7px",
                                                    }}
                                                >
                                                    Explore
                                                </Typography>

                                                <ArrowForwardIcon
                                                    className="arrowIcon"
                                                    sx={{
                                                        fontSize: 15,
                                                        transition: "transform 0.3s ease",
                                                    }}
                                                />
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            maxWidth: 520,
                            mx: "auto",
                            py: 6,
                            px: 3,
                            textAlign: "center",
                            borderRadius: 4,
                            border: "1px dashed",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            boxShadow: "0 10px 30px rgba(59, 48, 39, 0.05)",
                        }}
                    >
                        <NoDataFound message="No categories available" />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Categories for this country will appear here once available.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    )
}