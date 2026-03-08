import { Container, Grid, Box, Typography, Divider } from "@mui/material"
import ProductGallery from "../../component/Product/ProductGallery"
import ProductSpecsTabs from "../../component/Product/ProductSpecsTabs"
import CtaButtons from "../../component/Product/CtaButtons"
import CertificationPanel from "../../component/Product/CertificationPanel"
import NewsletterSignup from "../../component/Product/NewsletterSignup"
import { useEffect, useState } from "react"
import ProductDetailsservice from "../../service/productDetails.service"
import { useParams } from "react-router-dom"

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
                    specs: {
                        "Commercial Aspect": apiProduct.commercialAspect?.map((item: any) => ({
                            label: item.key,
                            value: item.value,
                        })) || [],
                        "Technical Specification": apiProduct.technicalSpecification?.map((item: any) => ({
                            label: item.key,
                            value: item.value,
                        })) || [],
                    },
                }

                setProduct(formattedProduct)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 6 } }}>
            {product ? (
                <>
                    <Grid container spacing={4}>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <ProductGallery images={product.images} title={product.name} />
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box component="header" mb={1}>
                                <Typography variant="h4" component="h1" fontWeight={700}>
                                    {product.name}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                            </Typography>

                            <ProductSpecsTabs specs={product.specs} />

                            <Box mt={2}>
                                <CtaButtons />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CertificationPanel product={product} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Box
                                sx={{
                                    bgcolor: "background.paper",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    p: 3,
                                    borderRadius: 2,
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                aria-label="Seasonal chart placeholder"
                            >
                                <Typography color="text.secondary">Seasonal Chart (Placeholder)</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />
                </>
            ) : <Box>Product Not Found</Box>}
        </Container>
    )
}
