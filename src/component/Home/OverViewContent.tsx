import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import LabelTitle from "../../commonUI/labelTitle";

export default function OverViewContent({ category }: any) {
    const [data, setData] = useState<any>(null)
    console.log("data", data)

    const getdata = async (category: string) => {
        try {
            const res = await HomePageservice.getContentOverViewByCategory(category)
            if (res) {
                setData(res?.data?.data)
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (category) {
            getdata(category)
        }
    }, [category])

    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 } }}>
            <LabelTitle title="Content" label="OverView" />

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
                Explore market dynamics, understand key economic indicators, and view featured listings for this category.
            </Typography>

            <Grid size={{ xs: 12, md: 12 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, sm: 1.5 },
                        width: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            minWidth: { xs: 52, sm: 70 },
                            fontWeight: 700,
                            fontSize: { xs: "0.85rem", sm: "1rem" },
                            color: "text.primary",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Country Background
                    </Typography>

                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: { xs: 35, sm: 55 },
                            height: "1px",
                            backgroundColor: "text.primary",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                right: -1,
                                top: "50%",
                                width: 7,
                                height: 7,
                                borderTop: "1px solid",
                                borderRight: "1px solid",
                                borderColor: "text.primary",
                                transform: "translateY(-50%) rotate(45deg)",
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            minHeight: 82,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "#fff",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                p: { xs: 1.2, sm: 1.8 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                minWidth: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.82rem", sm: "0.95rem" },
                                    lineHeight: 1.35,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {data?.country_background}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: { xs: 1, sm: 1.5 },
                        width: "100%",
                    }}
                >
                    <Typography
                        sx={{
                            minWidth: { xs: 52, sm: 70 },
                            fontWeight: 700,
                            fontSize: { xs: "0.85rem", sm: "1rem" },
                            color: "text.primary",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Category Specific
                    </Typography>

                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: { xs: 35, sm: 55 },
                            height: "1px",
                            backgroundColor: "text.primary",
                            position: "relative",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                right: -1,
                                top: "50%",
                                width: 7,
                                height: 7,
                                borderTop: "1px solid",
                                borderRight: "1px solid",
                                borderColor: "text.primary",
                                transform: "translateY(-50%) rotate(45deg)",
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flex: 1,
                            minHeight: 82,
                            borderRadius: 1,
                            border: "1px solid",
                            borderColor: "divider",
                            backgroundColor: "#fff",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                flex: 1,
                                p: { xs: 1.2, sm: 1.8 },
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                minWidth: 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.82rem", sm: "0.95rem" },
                                    lineHeight: 1.35,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {data?.category_specific}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}