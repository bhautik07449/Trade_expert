import {
    Box,
    Typography,
    Skeleton,
    Chip,
    Grid,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchFlatCategories } from "../../store/slice/categoriesSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelTitle from "../../commonUI/labelTitle";

export default function CategoryTab() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { categories, loading } = useSelector((state: any) => state.categories);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(fetchFlatCategories());
        }
    }, [dispatch, categories]);

    const handleCategoryClick = (slug: string) => {
        navigate(`/category/${slug}`);
    };

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 8 }, boxSizing: "border-box" }}>
            <LabelTitle title="Categories" label="" />

            {loading ? (
                <Grid container spacing={2}>
                    {[...Array(8)].map((_, i) => (
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={i}>
                            <Skeleton
                                variant="rounded"
                                height={100}
                                sx={{ borderRadius: 3 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Grid container spacing={2}>
                    {categories.map((cat: any, index: number) => (
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={cat.id ?? cat.slug ?? index}>
                            <Box
                                onClick={() => handleCategoryClick(cat.slug)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 0.8,
                                    p: { xs: 1.5, sm: 2 },
                                    borderRadius: 1,
                                    cursor: "pointer",
                                    border: "1.5px solid",
                                    minHeight: 80,
                                    textAlign: "center",
                                    position: "relative",
                                    background: "white"
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                                        color: hoveredIndex === index ? "primary.dark" : "text.primary",
                                        lineHeight: 1.3,
                                        transition: "color 0.2s ease",
                                    }}
                                >
                                    {cat.name}
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