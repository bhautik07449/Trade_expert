import {
    Box,
    Typography,
    Tabs,
    Tab,
    Skeleton,
    Stack,
    Paper,
} from "@mui/material"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import LabelTitle from "../../commonUI/labelTitle"
import { useSelector } from "react-redux"
import NoDataFound from "../../commonUI/NoDataFound"

export default function ProductListByCountry() {
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState<Record<number, number>>({})
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const getProducts = async (country: string) => {
        setLoading(true)
        setAllProducts([])

        try {
            const resAll = await Homeservice.getProductBygroup(country)

            if (resAll) {
                const data = resAll?.data?.data || []
                setAllProducts(data)

                const defaultTabs: Record<number, number> = {}
                data.forEach((_: any, index: number) => {
                    defaultTabs[index] = 0
                })

                setActiveCategory(defaultTabs)
            }
        } catch (error) {
            console.log("Error fetching products", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (selectedCountry) {
            getProducts(selectedCountry)
        }
    }, [selectedCountry])

    const handleTabChange = (groupIndex: number, categoryIndex: number) => {
        setActiveCategory((prev) => ({
            ...prev,
            [groupIndex]: categoryIndex,
        }))
    }

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 },
                maxWidth: "1400px",
                mx: "auto",
            }}
        >
            <LabelTitle title="Product List" label="By Country" tagLine={`Explore the diverse range of products available in ${selectedCountry}, showcasing the unique offerings and trade opportunities within the country.`} />

            <Typography
                variant="body1"
                sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    maxWidth: "680px",
                    mx: "auto",
                    mb: { xs: 4, md: 6 },
                    mt: { xs: -1.5, md: -2.5 },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    lineHeight: 1.8,
                }}
            >

            </Typography>

            {loading ? (
                <Box>
                    {[...Array(2)].map((_, index) => (
                        <Box key={index} sx={{ mb: { xs: 5, md: 7 } }}>
                            <Skeleton
                                variant="text"
                                width={220}
                                height={42}
                                sx={{ bgcolor: "primary.light", mb: 2 }}
                            />

                            <Stack direction="row" spacing={1.2} sx={{ mb: 3 }}>
                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={42}
                                    sx={{ borderRadius: 99, bgcolor: "primary.light" }}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={42}
                                    sx={{ borderRadius: 99, bgcolor: "primary.light" }}
                                />
                            </Stack>

                            <Skeleton
                                variant="rounded"
                                height={260}
                                sx={{ borderRadius: 3, bgcolor: "primary.light" }}
                            />
                        </Box>
                    ))}
                </Box>
            ) : allProducts.length > 0 ? ((Array.isArray(allProducts) ? allProducts : []).map((pro, groupIndex) => {
                    const selectedIndex = activeCategory[groupIndex] || 0
                    const selectedCategory = pro?.item?.[selectedIndex]

                    return (
                        <Box key={pro?.productname?.id || groupIndex} sx={{ mb: { xs: 5, md: 7 } }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,
                                    mb: 2,
                                    color: "text.primary",
                                    textTransform: "uppercase",
                                    letterSpacing: 1,
                                    fontSize: { xs: "1.15rem", sm: "1.4rem" },
                                    position: "relative",
                                    display: "inline-block",
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        left: 0,
                                        bottom: -6,
                                        width: "55%",
                                        height: 3,
                                        borderRadius: 99,
                                        bgcolor: "primary.main",
                                    },
                                }}
                            >
                                {pro?.productname?.name}
                            </Typography>

                            <Box
                                sx={{
                                    mt: 3,
                                    mb: 3,
                                    overflowX: "auto",
                                    pb: 0.8,
                                    "&::-webkit-scrollbar": {
                                        height: 4,
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        bgcolor: "primary.light",
                                        borderRadius: 99,
                                    },
                                }}
                            >
                                <Tabs
                                    value={selectedIndex}
                                    onChange={(_, value) => handleTabChange(groupIndex, value)}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    TabIndicatorProps={{ sx: { display: "none" } }}
                                    sx={{
                                        minHeight: "auto",

                                        "& .MuiTabs-flexContainer": {
                                            gap: 1.2,
                                        },

                                        "& .MuiTab-root": {
                                            minHeight: "auto",
                                            minWidth: "auto",
                                            px: { xs: 1.8, sm: 2.5 },
                                            py: 1,
                                            borderRadius: 99,
                                            textTransform: "none",
                                            fontWeight: 800,
                                            color: "text.secondary",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            bgcolor: "background.paper",
                                            transition: "all 0.3s ease",
                                        },

                                        "& .MuiTab-root:hover": {
                                            color: "primary.dark",
                                            borderColor: "primary.main",
                                            bgcolor: "primary.light",
                                        },

                                        "& .Mui-selected": {
                                            color: "#fff !important",
                                            bgcolor: "primary.main",
                                            borderColor: "primary.main",
                                            boxShadow: "0 8px 20px rgba(59, 48, 39, 0.16)",
                                        },
                                    }}
                                >
                                    {(Array.isArray(pro?.item) ? pro?.item : []).map((item: any, categoryIndex: number) => (
                                        <Tab
                                            key={item?.category?.id || categoryIndex}
                                            label={item?.category?.name}
                                        />
                                    ))}
                                </Tabs>
                            </Box>

                            {selectedCategory ? (
                                <CardUi
                                    label=""
                                    products={selectedCategory?.product_data || []}
                                    loading={loading}
                                />
                            ) : (
                                <Box sx={{ py: 4 }}>
                                    <NoDataFound message="No category products available." />
                                </Box>
                            )}
                        </Box>
                    )
                })
            ) : (
                <Paper
                    elevation={0}
                    sx={{
                        maxWidth: 520,
                        mx: "auto",
                        py: 6,
                        px: 3,
                        textAlign: "center",
                        borderRadius: 4,
                        border: "1px dashed",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        boxShadow: "0 10px 30px rgba(59, 48, 39, 0.05)",
                    }}
                >
                    <NoDataFound message="No products available" />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Products for this country will appear here once available.
                    </Typography>
                </Paper>
            )}
        </Box>
    )
}