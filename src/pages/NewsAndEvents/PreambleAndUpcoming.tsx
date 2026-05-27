import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LabelTitle from "../../commonUI/labelTitle";
import HomePageservice from "../../service/homepages.service";
import NewsandeventService from "../../service/newsandevent.service";

type Category = {
    id: string;
    name: string;
    slug: string;
    pageTitle?: string;
    metaKeyword?: string;
    metaDescription?: string;
    status?: string;
    country?: string;
    lastUpdatedAt?: string;
    createdAt?: string;
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

    const getCategories = async (country: string) => {
        try {
            const res = await HomePageservice.getCategoriesByCountry(country);

            if (res) {
                setCategories(res?.data || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (country) {
            getCategories(country);
        }
    }, [country]);

    useEffect(() => {
        if (categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0].name);
        }
    }, [categories, activeCategory]);

    const getPreambleData = async () => {
        try {
            const res = await NewsandeventService.getPolicypreamble();

            if (res) {
                setPreamble(res?.data?.data || []);
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        getPreambleData();
    }, [activeCategory]);

    const filteredPreamble = activeCategory
        ? preamble.filter((item) => {
              const itemCategory =
                  typeof item.category === "object"
                      ? item.category?.name
                      : item.category;

              return itemCategory === activeCategory;
          })
        : preamble;

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
                <Tabs
                    value={activeCategory}
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
            </Paper>

            <Grid container spacing={4}>
                {filteredPreamble.map((item, index) => {
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
        </Box>
    );
}