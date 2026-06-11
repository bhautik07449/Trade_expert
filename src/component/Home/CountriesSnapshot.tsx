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

    const economicItems = [
        { label: "GDP", value: "18" },
        { label: "Growth", value: "20" },
        { label: "Export", value: "115" },
        { label: "Import", value: "35" }
    ];

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
                        bgcolor: "white"
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
                                {(Array.isArray(economicItems) ? economicItems : []).map((item, index) => (
                                    <Box key={index}>
                                        <Box
                                            sx={{
                                                height: 42,
                                                borderRadius: 1,
                                                border: `1px solid ${theme.palette.divider}`,
                                                bgcolor: "primary.light",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                mb: 0.5
                                            }}
                                        >
                                            <Typography variant="body2" fontWeight={600}>
                                                {item.value}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary" align="center" display="block">
                                            {item.label}
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
                                <MiniChart label="Buyer" value="120" />
                                <MiniChart label="Seller" value="120" />
                                <MiniChart label="Both" value="120" />
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
                                ) : (Array.isArray(activeCategories) ? activeCategories : []).length > 0 ? (
                                    <>
                                        {(Array.isArray(activeCategories) ? activeCategories : []).slice(0, (Array.isArray(activeCategories) ? activeCategories : []).length > 9 ? 8 : 9).map((item: any, index: number) => (
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
                                        {(Array.isArray(activeCategories) ? activeCategories : []).length > 9 && (
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
                                                    +{(Array.isArray(activeCategories) ? activeCategories : []).length - 8} more
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

function MiniChart({ label = "Buyer", value = "120" }: { label?: string, value?: string }) {
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
                    mb: 0.5,
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    {value}
                </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" align="center" display="block">
                {label}
            </Typography>
        </Box>
    );
}