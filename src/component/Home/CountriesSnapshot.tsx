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

    const economicItems = ["18", "20", "115", "35"];

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
                            md: "1.2fr 1fr 0.9fr",
                        },
                        gap: 3,
                    }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Country Economic Standing
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: 1.5,
                                    mb: 2,
                                }}
                            >
                                {economicItems.map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            height: 42,
                                            borderRadius: 1,
                                            border: `1px solid ${theme.palette.divider}`,
                                            bgcolor: "primary.light",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={600}>
                                            {item}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{ mb: 2, color: "secondary.main" }}
                            >
                                Registered Accounts
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 2,
                                }}
                            >
                                {[1, 2, 3].map((item) => (
                                    <MiniChart key={item} />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
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
                                    display: "grid",
                                    gridTemplateColumns: "repeat(3, 1fr)",
                                    gap: 1.5
                                }}
                            >
                                {loading ? (
                                    Array.from({ length: 9 }).map((_, index) => (
                                        <Skeleton key={index} variant="rounded" height={38} animation="wave" />
                                    ))
                                ) : activeCategories?.length > 0 ? (
                                    <>
                                        {activeCategories.slice(0, activeCategories.length > 9 ? 8 : 9).map((item: any, index: number) => (
                                            <Box
                                                key={item?.id || index}
                                                sx={{
                                                    height: 38,
                                                    borderRadius: 1,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    bgcolor: "background.default",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    px: 1,
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {item?.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                        {activeCategories.length > 9 && (
                                            <Box
                                                sx={{
                                                    height: 38,
                                                    borderRadius: 1,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    bgcolor: "background.default",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    px: 1,
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 600 }}>
                                                    +{activeCategories.length - 8} more
                                                </Typography>
                                            </Box>
                                        )}
                                    </>
                                ) : (
                                    <Box sx={{ gridColumn: "span 3", py: 2 }}>
                                        <NoDataFound message="No categories found." />
                                    </Box>
                                )}
                            </Box>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.paper",
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

function MiniChart() {
    return (
        <Box>
            <Box
                sx={{
                    height: 42,
                    borderRadius: 1,
                    bgcolor: "primary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    120
                </Typography>
            </Box>

            <Box
                sx={{
                    height: 42,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Buyer
            </Box>
        </Box>
    );
}