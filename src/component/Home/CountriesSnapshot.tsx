import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
    useTheme,
    Skeleton
} from "@mui/material";
import LabelTitle from "../../commonUI/labelTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePageservice from "../../service/homepages.service";
import { useSelector } from "react-redux";
import NoDataFound from "../../commonUI/NoDataFound";

export default function CountriesSnapshot() {
    const navigate = useNavigate()
    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";
    const [activeCategories, setActiveCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme();

    const getCategory = async (country: string) => {
        try {
            setLoading(true)
            const res = await HomePageservice.getCategoriesByCountry(country)

            if (res) {
                setActiveCategories(res?.data || [])
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message)
            setActiveCategories([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategory(activeCountry)
    }, [activeCountry])

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                color: "text.primary",
            }}
        >
            <Stack spacing={3}>
                <LabelTitle title="Countries" label="Snapshot" tagLine="Get a comprehensive overview of the global market and the economic standing of different countries." />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "2fr 1fr",
                        },
                        gap: 3,
                        bgcolor: "white",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            bgcolor: "transparent",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Active Categories
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1.5
                                }}
                            >
                                {loading ? (
                                    Array.from({ length: 12 }).map((_, index) => (
                                        <Skeleton key={index} variant="rounded" height={42} width={80 + Math.random() * 60} animation="wave" />
                                    ))
                                ) : (Array.isArray(activeCategories) ? activeCategories : []).length > 0 ? (
                                    <>
                                        {(Array.isArray(activeCategories) ? activeCategories : []).slice(0, (Array.isArray(activeCategories) ? activeCategories : []).length > 12 ? 11 : 12).map((item: any, index: number) => (
                                            <Box
                                                key={item?.id || index}
                                                sx={{
                                                    height: 42,
                                                    borderRadius: 1,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    bgcolor: "primary.light",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    px: 2,
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        bgcolor: "primary.main",
                                                        color: "white",
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                                                    {item?.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                        {(Array.isArray(activeCategories) ? activeCategories : []).length > 12 && (
                                            <Box
                                                sx={{
                                                    height: 42,
                                                    borderRadius: 1,
                                                    border: `1px dashed ${theme.palette.primary.main}`,
                                                    bgcolor: "transparent",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    px: 2,
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        bgcolor: "primary.light",
                                                    }
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontWeight: 600, color: "primary.dark" }}>
                                                    +{(Array.isArray(activeCategories) ? activeCategories : []).length - 11} more
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                ) : (
                                    <Box sx={{ gridColumn: { xs: "span 2", sm: "span 3", md: "span 4" }, py: 4 }}>
                                        <NoDataFound message="No categories found." />
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            bgcolor: "transparent",
                        }}
                    >
                        <CardContent>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{ mb: 1.5, color: "secondary.main" }}
                                    >
                                        Ongoing Deals
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: "primary.main",
                                            color: "primary.dark",
                                        }}
                                        onClick={() => navigate("/trade-offers")}
                                    >
                                        Go to Offer
                                    </Button>
                                </Box>

                                <Divider />

                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={700}
                                        sx={{ mb: 1.5, color: "secondary.main" }}
                                    >
                                        Trade Diversity
                                    </Typography>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderColor: "primary.main",
                                            color: "primary.dark",
                                        }}
                                        onClick={() => navigate("/abc")}
                                    >
                                        Go to ABC
                                    </Button>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Stack>
        </Box>
    );
}
