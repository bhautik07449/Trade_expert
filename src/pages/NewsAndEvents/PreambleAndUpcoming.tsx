import { Box, Card, CardContent, CardMedia, Chip, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import LabelTitle from "../../commonUI/labelTitle";

const categories = ["Policy", "Preamble", "Upcoming Updates"];

const newsData = [
    {
        title: "Canada Import Policy Update",
        category: "Policy",
        description:
            "New import policy updates and documentation changes for Canadian trade.",
        image: "https://sourceseas.itcoders.in/img/front-end/quality.jpg",
    },
    {
        title: "Upcoming Food Trade Event",
        category: "Upcoming Updates",
        description:
            "Upcoming international food and agricultural trade event details.",
        image: "https://sourceseas.itcoders.in/img/front-end/brands.jpg",
    },
    {
        title: "Trade Preamble Notice",
        category: "Preamble",
        description:
            "Important preamble and introductory notes related to overseas trade.",
        image: "https://sourceseas.itcoders.in/img/front-end/quality.jpg",
    },
    {
        title: "Export Regulation Update",
        category: "Policy",
        description:
            "Latest updates regarding export regulations and compliance requirements.",
        image: "https://sourceseas.itcoders.in/img/front-end/brands.jpg",
    },
];

export default function PreambleAndUpcoming() {
    const [activeCategory, setActiveCategory] = useState("Policy");

    const filteredNews = newsData.filter(
        (item) => item.category === activeCategory
    );

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
                            key={category}
                            label={category}
                            value={category}
                        />
                    ))}
                </Tabs>
            </Paper>

            <Grid container spacing={4}>
                {filteredNews.map((item, index) => (
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
                                    label={item.category}
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
                ))}
            </Grid>
        </Box>
    )
}