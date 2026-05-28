import { Container, Grid, Box, Typography, Divider, Skeleton } from "@mui/material"
import ProductGallery from "../../component/Product/ProductGallery"
import ProductSpecsTabs from "../../component/Product/ProductSpecsTabs"
import CtaButtons from "../../component/Product/CtaButtons"
import CertificationPanel from "../../component/Product/CertificationPanel"
import MarketDataTable from "../../component/Product/MarketDataTable"
import { useEffect, useState } from "react"
import ProductDetailsservice from "../../service/productDetails.service"
import { useParams } from "react-router-dom"
import SEO from "../../component/SEO"

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const getData = async (id: any) => {
        setLoading(true)
        try {
            const res = await ProductDetailsservice.getProduct(id)

            if (res) {
                const apiProduct = res?.data?.data

                const formattedProduct = {
                    name: apiProduct.name,
                    description: apiProduct.description,
                    images: apiProduct.images || [],
                    seasonalChart: apiProduct?.seasonalChart,
                    certification: apiProduct?.certification,
                    pageTitle: apiProduct?.pageTitle,
                    metaKeywords: apiProduct?.metaKeywords,
                    metaDescription: apiProduct?.metaDescription,
                    dmrs: apiProduct?.dmrs || [],
                    specs: {
                        "Commercial Aspect":
                            apiProduct.commercialAspect?.map((item: any) => ({
                                label: item.key,
                                value: item.value,
                            })) || [],
                        "Technical Specification":
                            apiProduct.technicalSpecification?.map((item: any) => ({
                                label: item.key,
                                value: item.value,
                            })) || [],
                        "Shipment Manual":
                            apiProduct.shipmentmanual?.map((item: any) => ({
                                label: item.key,
                                value: item.value,
                            })) || [],
                    },
                }

                setProduct(formattedProduct)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) getData(id)
    }, [id])

    return (
        <>
            {product && (
                <SEO 
                    title={product?.pageTitle || product?.name || 'Product Details'} 
                    description={product?.metaDescription || product?.name || 'View product details on Tradexpert'} 
                    keywords={product?.metaKeywords || product?.name} 
                    type="product"
                    image={product?.images?.[0]}
                />
            )}

            <Container sx={{ maxWidth: "1400px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, py: { xs: 4, md: 8 } }}>
                {loading ? (
                    <Grid container spacing={{ xs: 3, md: 4 }}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Skeleton variant="text" height={60} width="60%" sx={{ mb: 2 }} />
                            <Skeleton variant="text" height={20} />
                            <Skeleton variant="text" height={20} />
                            <Skeleton variant="text" height={20} width="80%" sx={{ mb: 4 }} />
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
                        </Grid>
                    </Grid>
                ) : product ? (
                    <>
                        <Grid container spacing={{ xs: 3, md: 4 }}>

                            <Grid size={{ xs: 12, md: 5 }}>
                                <ProductGallery images={product.images} title={product.name} />
                            </Grid>

                            <Grid size={{ xs: 12, md: 7 }}>
                                <Box mb={2}>
                                    <Typography
                                        variant="h4"
                                        component="h1"
                                        fontWeight={700}
                                        sx={{
                                            fontSize: { xs: "1.6rem", md: "2.1rem" },
                                        }}
                                    >
                                        {product.name}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        mb: 2,
                                        "& p": { color: "text.secondary" },
                                    }}
                                    dangerouslySetInnerHTML={{ __html: product?.description }}
                                />

                                <ProductSpecsTabs specs={product.specs} />

                                <Box mt={2}>
                                    <CtaButtons product={product} />
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 3 }}>
                            <Grid size={{ xs: 12 }}>
                                <MarketDataTable dmrs={product.dmrs} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mt: 3 }}>

                            <Grid size={{ md: 12 }}>
                                <CertificationPanel product={product} />
                            </Grid>

                        </Grid>

                        <Divider sx={{ my: { xs: 3, md: 5 } }} />
                    </>
                ) : (
                    <Box textAlign="center" py={10}>
                        <Typography variant="h6">Product Not Found</Typography>
                    </Box>
                )}
            </Container>
        </>
    )
}