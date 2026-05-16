import { Box, Grid, Typography, Paper, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import LabelTitle from "../../commonUI/labelTitle";

type OverviewData = {
    country_background?: any;
    category_specific?: any;
    global_importance?: any;
    global_impotance?: any;
    globalImportance?: any;
};

export default function OverViewContent({ category }: any) {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(false);

    const getdata = async (category: string) => {
        try {
            setLoading(true);
            const res = await HomePageservice.getContentOverViewByCategory(category);
            setData(res?.data?.data || null);
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category) {
            getdata(category);
        }
    }, [category]);

    const extractContent = (val: any) => {
        if (val && typeof val === 'object') {
            return val.content || val.name || "";
        }
        return val;
    };

    const global_importance_raw = data?.global_importance || data?.global_impotance || data?.globalImportance;
    const globalItems: string[] = Array.isArray(global_importance_raw)
        ? global_importance_raw.map(extractContent)
        : global_importance_raw
            ? String(global_importance_raw).split(",").map(s => s.trim())
            : [];

    return (
        <Box
            sx={{
                maxWidth: "1050px",
                mx: "auto",
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 4, md: 6 },
            }}
        >
            <LabelTitle title="Content" label="OverView" />

            <Typography
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    maxWidth: "720px",
                    mx: "auto",
                    mb: { xs: 4, md: 6 },
                    mt: { xs: -1, md: -2 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.6,
                }}
            >
                Explore market dynamics, understand key economic indicators, and view
                featured listings for this category.
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 3, md: 4 },
                }}
            >
                <OverviewRow
                    title="Country Background"
                    loading={loading}
                    content={extractContent(data?.country_background)}
                />

                <OverviewRow
                    title="Category Specific"
                    loading={loading}
                    content={extractContent(data?.category_specific)}
                />

                <GlobalImportanceRow loading={loading} items={globalItems} />
            </Box>
        </Box>
    );
}

function OverviewRow({
    title,
    content,
    loading,
}: {
    title: string;
    content?: string;
    loading: boolean;
}) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "160px 60px 1fr",
                    md: "180px 80px 1fr",
                },
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 },
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.25,
                    textAlign: { xs: "left", sm: "right" },
                }}
            >
                {title}
            </Typography>

            <ArrowLine />

            <Paper
                elevation={0}
                sx={{
                    minHeight: { xs: 90, sm: 100 },
                    border: "1.5px solid",
                    borderColor: "grey.400",
                    borderRadius: 1.5,
                    p: { xs: 2, sm: 2.5 },
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                }}
            >
                {loading ? (
                    <Box sx={{ width: "100%" }}>
                        <Skeleton height={24} />
                        <Skeleton height={24} width="85%" />
                    </Box>
                ) : (
                    <Typography
                        sx={{
                            color: content ? "text.secondary" : "text.disabled",
                            fontSize: { xs: "0.88rem", sm: "0.95rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        {content || "No content available."}
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}

function GlobalImportanceRow({
    items,
    loading,
}: {
    items: string[];
    loading: boolean;
}) {
    
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "160px 60px 1fr",
                    md: "180px 80px 1fr",
                },
                alignItems: "center",
                gap: { xs: 1.5, sm: 2 },
            }}
        >
            <Typography
                sx={{
                    fontWeight: 700,
                    color: "text.primary",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.25,
                    textAlign: { xs: "left", sm: "right" },
                }}
            >
                Global Importance
            </Typography>

            <ArrowLine />

            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid size={{ xs: 6, sm: 3 }} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                minHeight: { xs: 95, sm: 110 },
                                border: "1.5px solid",
                                borderColor: "grey.400",
                                borderRadius: 1.5,
                                p: 1.5,
                                backgroundColor: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            {loading ? (
                                <Skeleton variant="rounded" width="100%" height={60} />
                            ) : (
                                <Typography
                                    sx={{
                                        color: item ? "text.secondary" : "text.disabled",
                                        fontSize: { xs: "0.8rem", sm: "0.88rem" },
                                        lineHeight: 1.45,
                                    }}
                                >
                                    {item || "No data"}
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function ArrowLine() {
    return (
        <Box
            sx={{
                display: { xs: "none", sm: "block" },
                width: "100%",
                height: "1px",
                backgroundColor: "text.primary",
                position: "relative",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    right: -1,
                    top: "50%",
                    width: 8,
                    height: 8,
                    borderTop: "1.5px solid",
                    borderRight: "1.5px solid",
                    borderColor: "text.primary",
                    transform: "translateY(-50%) rotate(45deg)",
                },
            }}
        />
    );
}