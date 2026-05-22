import {
    Box,
    Typography,
    Tabs,
    Tab,
    Skeleton,
    Stack,
} from "@mui/material"
import CardUi from "../../commonUI/CardUi"
import { useEffect, useState } from "react"
import Homeservice from "../../service/home.service"
import InquiryDialog from "../Dialog/inquiry-dialog"
import EnquiryDialog from "../Dialog/enquiry-dialog"
import LabelTitle from "../../commonUI/labelTitle"

export default function ProductListByCountry({ country }: { country?: string }) {
    const [open, setOpen] = useState(false)
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [activeCategory, setActiveCategory] = useState<Record<number, number>>({})

    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)

    const getProducts = async (country: string) => {
        setLoading(true)

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
        if (country) {
            getProducts(country)
        }
    }, [country])

    const handleTabChange = (groupIndex: number, categoryIndex: number) => {
        setActiveCategory((prev) => ({
            ...prev,
            [groupIndex]: categoryIndex,
        }))
    }

    const handleSelectProduct = (product: any) => {
        setSelectedProduct({
            name: product.name,
            description: product?.description,
            images: product?.images?.[0],
            id: product.id,
        })
    }

    return (
        <Box
            sx={{
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 5, md: 8 },
                maxWidth: "1200px",
                mx: "auto",
            }}
        >
            <LabelTitle title="Product List" label="By Country" />

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
                Browse verified, high-demand products by category and country.
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
            ) : allProducts.length > 0 ? (
                allProducts.map((pro, groupIndex) => {
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
                                    {pro?.item?.map((item: any, categoryIndex: number) => (
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
                                    onEnquire={(product: any) => {
                                        handleSelectProduct(product)
                                        setOpenEnquiry(true)
                                    }}
                                    onRequestSample={(product: any) => {
                                        handleSelectProduct(product)
                                        setOpen(true)
                                    }}
                                    products={selectedCategory?.product_data || []}
                                    loading={loading}
                                    visiblecard={3}
                                />
                            ) : (
                                <Box sx={{ py: 4, textAlign: "center" }}>
                                    <Typography variant="body2" color="text.secondary">
                                        No category products available.
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )
                })
            ) : (
                <Box sx={{ py: 6, textAlign: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}
                    >
                        No products available
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        No products are available for this country.
                    </Typography>
                </Box>
            )}

            <InquiryDialog
                open={open}
                onClose={() => setOpen(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id,
                }}
            />

            <EnquiryDialog
                open={openEnquiry}
                onClose={() => setOpenEnquiry(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id,
                }}
            />
        </Box>
    )
}