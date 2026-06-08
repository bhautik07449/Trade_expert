import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Paper,
    Skeleton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LabelTitle from "../../commonUI/labelTitle";
import HomePageservice from "../../service/homepages.service";
import NewsandeventService from "../../service/newsandevent.service";
import NoDataFound from "../../commonUI/NoDataFound";

type Category = {
    id: string;
    name: string;
    slug: string;
    country?: string;
};

type PreambleItem = {
    image: string;
    title: string;
    description: string;
    category: string | Category;
};

export default function PreambleAndUpcoming({ country }: { country: string }) {
    const [activeCategory, setActiveCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [preamble, setPreamble] = useState<PreambleItem[]>([]);
    const [categoryLoading, setCategoryLoading] = useState(false);
    const [preambleLoading, setPreambleLoading] = useState(false);

    const getCategories = async (country: string) => {
        try {
            setCategoryLoading(true);
            setCategories([]);
            setActiveCategory("");

            const res = await HomePageservice.getCategoriesByCountry(country);

            const categoryList = res?.data || [];
            setCategories(categoryList);

            setActiveCategory(categoryList?.[0]?.name || "");
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message);
            setCategories([]);
            setActiveCategory("");
        } finally {
            setCategoryLoading(false);
        }
    };

    const getPreambleData = async () => {
        try {
            setPreambleLoading(true);
            const res = await NewsandeventService.getPolicypreamble();

            if (res) {
                setPreamble(res?.data?.data || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message);
            setPreamble([]);
        } finally {
            setPreambleLoading(false);
        }
    };

    useEffect(() => {
        if (country) {
            getCategories(country);
            getPreambleData();
        }
    }, [country]);

    const filteredPreamble = activeCategory
        ? preamble.filter((item) => {
            const itemCategory =
                typeof item.category === "object"
                    ? item.category?.name
                    : item.category;

            return itemCategory === activeCategory;
        })
        : [];

    return (
        <Box sx={{ mb: 4 }}>
            <LabelTitle title="Policy - Preamble" label=" & Upcoming Updates" />

            <Paper
                elevation={0}
                sx={{
                    mb: 5,
                    p: 1,
                    bgcolor: "transparent",
                }}
            >
                {categoryLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "flex-start", md: "center" },
                            gap: 1,
                            overflowX: "auto",
                        }}
                    >
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rounded"
                                animation="wave"
                                width={120}
                                height={42}
                                sx={{ borderRadius: 2, flexShrink: 0 }}
                            />
                        ))}
                    </Box>
                ) : (
                    <Tabs
                        value={activeCategory || false}
                        onChange={(_, value) => setActiveCategory(value)}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            minHeight: 48,
                            "& .MuiTabs-indicator": {
                                display: "none",
                            },
                            "& .MuiTabs-flexContainer": {
                                justifyContent: { xs: "flex-start", md: "center" },
                            },
                            "& .MuiTab-root": {
                                minHeight: 42,
                                mx: 0.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 700,
                                color: "text.secondary",
                                border: "1px solid",
                                borderColor: "divider",
                            },
                            "& .MuiTab-root:hover": {
                                bgcolor: "primary.light",
                                color: "secondary.dark",
                            },
                            "& .Mui-selected": {
                                bgcolor: "secondary.main",
                                color: "#fff !important",
                                borderColor: "secondary.main",
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <Tab
                                key={category.id}
                                label={category.name}
                                value={category.name}
                            />
                        ))}
                    </Tabs>
                )}
            </Paper>

            <Grid container spacing={4}>
                {preambleLoading
                    ? [...Array(3)].map((_, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    height={220}
                                />
                                <CardContent>
                                    <Skeleton
                                        variant="rounded"
                                        animation="wave"
                                        width={90}
                                        height={28}
                                        sx={{ mb: 2 }}
                                    />
                                    <Skeleton animation="wave" height={30} />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" width="75%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    : filteredPreamble.map((item, index) => {
                        const categoryLabel =
                            typeof item.category === "object"
                                ? item.category?.name
                                : item.category;

                        return (
                            <Grid key={index} size={{ xs: 12, md: 4 }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 3,
                                        bgcolor: "background.paper",
                                        overflow: "hidden",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                        sx={{
                                            height: { xs: 180, sm: 220 },
                                            objectFit: "cover",
                                        }}
                                    />

                                    <CardContent>
                                        <Chip
                                            label={categoryLabel}
                                            sx={{
                                                mb: 2,
                                                bgcolor: "primary.light",
                                                color: "secondary.dark",
                                                fontWeight: 700,
                                            }}
                                        />

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: "secondary.main",
                                                fontWeight: 700,
                                                mb: 1.5,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                lineHeight: 1.8,
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>

            {!preambleLoading && activeCategory && filteredPreamble.length === 0 && (
                <NoDataFound message="No policy updates found for this category." />
            )}
        </Box>
    );
}