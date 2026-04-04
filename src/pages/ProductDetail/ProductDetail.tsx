import { Container, Grid, Box, Typography, Divider } from "@mui/material"
import ProductGallery from "../../component/Product/ProductGallery"
import ProductSpecsTabs from "../../component/Product/ProductSpecsTabs"
import CtaButtons from "../../component/Product/CtaButtons"
import CertificationPanel from "../../component/Product/CertificationPanel"
import { useEffect, useState } from "react"
import ProductDetailsservice from "../../service/productDetails.service"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<any>(null)

    const getData = async (id: any) => {
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
        }
    }

    useEffect(() => {
        if (id) getData(id)
    }, [id])

    return (
        <>
            {product && (
                <Helmet>
                    <title>{product?.pageTitle || product?.name}</title>
                    <meta
                        name="description"
                        content={product?.metaDescription || product?.name}
                    />

                    <meta
                        name="keywords"
                        content={product?.metaKeywords || product?.name}
                    />

                    <meta property="og:title" content={product?.pageTitle || product?.name} />
                    <meta property="og:description" content={product?.metaDescription} />
                    <meta property="og:image" content={product?.images?.[0]} />
                    <meta property="og:type" content="product" />
                </Helmet>
            )}

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
                {product ? (
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