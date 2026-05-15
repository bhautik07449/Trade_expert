import {
    Box,
    Typography,
    Skeleton,
    Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchFlatCategories } from "../../store/slice/categoriesSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelTitle from "../../commonUI/labelTitle";
import HomePageservice from "../../service/homepages.service";

export default function CategoryTab({ country }: any) {
    const navigate = useNavigate();

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const getCategories = async (country: string) => {
        try {
            const res = await HomePageservice.getCategoriesByCountry(country)
            if (res) {
                setLoading(false)
                setCategories(res?.data)
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (country) {
            getCategories(country)
        }
    }, [country]);

    const handleCategoryClick = (slug: string) => {
        navigate(`/category/${slug}`);
    };

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 5, md: 8 }, boxSizing: "border-box" }}>
            <LabelTitle title="Categories" label="Sectors" />

            <Typography
                variant="body1"
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    maxWidth: "680px",
                    mx: "auto",
                    mb: { xs: 4, md: 6 },
                    mt: { xs: -1.5, md: -2.5 },
                    fontSize: { xs: "0.88rem", sm: "1rem" },
                    lineHeight: 1.5,
                }}
            >
                Browse our verified, high-demand product sectors tailored for seamless bilateral wholesale trade and prioritized export opportunities.
            </Typography>

            {loading ? (
                <Grid container spacing={2.5}>
                    {[...Array(8)].map((_, i) => (
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={i}>
                            <Skeleton
                                variant="rounded"
                                height={110}
                                sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Grid container spacing={2.5}>
                    {categories.map((cat: any, index: number) => (
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={cat.id ?? cat.slug ?? index}>
                            <Box
                                id={`category-card-${index}-${cat.slug || cat.id}`}
                                onClick={() => handleCategoryClick(cat?.id)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 1.2,
                                    p: { xs: 2, sm: 2.5 },
                                    borderRadius: 3,
                                    cursor: "pointer",
                                    border: "1px solid",
                                    borderColor: hoveredIndex === index ? "secondary.main" : "rgba(0, 0, 0, 0.06)",
                                    minHeight: { xs: 100, sm: 110 },
                                    textAlign: "center",
                                    position: "relative",
                                    background: hoveredIndex === index
                                        ? "linear-gradient(145deg, #ffffff, #fffcf5)"
                                        : "#ffffff",
                                    boxShadow: hoveredIndex === index
                                        ? "0 12px 28px rgba(244, 160, 36, 0.12)"
                                        : "0 4px 16px rgba(0, 0, 0, 0.02)",
                                    transform: hoveredIndex === index ? "translateY(-4px)" : "translateY(0)",
                                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                                    overflow: "hidden",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "4px",
                                        background: hoveredIndex === index
                                            ? "secondary.main"
                                            : "transparent",
                                        transition: "background 0.3s ease",
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        background: hoveredIndex === index
                                            ? "radial-gradient(circle, rgba(244, 160, 36, 0.12) 0%, transparent 70%)"
                                            : "radial-gradient(circle, rgba(0, 0, 0, 0.01) 0%, transparent 70%)",
                                        top: -10,
                                        right: -10,
                                        transition: "all 0.4s ease",
                                        transform: hoveredIndex === index ? "scale(1.5)" : "scale(1)",
                                    }}
                                />

                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "0.95rem" },
                                        color: hoveredIndex === index ? "secondary.main" : "#1e293b",
                                        lineHeight: 1.3,
                                        letterSpacing: "0.2px",
                                        transition: "color 0.3s ease",
                                        zIndex: 1,
                                    }}
                                >
                                    {cat.name}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: hoveredIndex === index ? "#f59e0b" : "text.secondary",
                                        fontWeight: 600,
                                        fontSize: "0.68rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px",
                                        opacity: hoveredIndex === index ? 1 : 0.5,
                                        transition: "all 0.3s ease",
                                        zIndex: 1,
                                    }}
                                >
                                    Explore →
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 6,
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        No categories available
                    </Typography>
                </Box>
            )}
        </Box>
    );
}