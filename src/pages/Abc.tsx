import { Box, Container, Typography, Skeleton, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../service/cms.service";
import { toast } from "react-toastify";
import CardUi from "../commonUI/CardUi";
import InquiryDialog from "../component/Dialog/inquiry-dialog";
import EnquiryDialog from "../component/Dialog/enquiry-dialog";
import SEO from "../component/SEO";

export default function Abc() {
    const [list, setList] = useState<any>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openEnquiry, setOpenEnquiry] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<{
        name?: string
        description?: string
        images?: string
        id?: any
    } | null>(null)

    const getList = async () => {
        setLoading(true)
        try {
            const res = await CMSservice.getAbc()
            if (res) {
                setList(res?.data?.data)
            }
        } catch (error) {
            toast.error("bran not found")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <SEO 
                title="ABC Menus - Tradexpert" 
                description="Explore the ABC Menus on Tradexpert for top-quality agri and food products."
            />
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                alt="Abc Menus"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "300px" },
                    objectFit: "cover",
                }}
            />

            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                    Abc Menus
                </Typography>
            </Box>

            <Container maxWidth="lg">

                <Typography
                    sx={{
                        color: "secondary.main",
                        mb: 5,
                        fontSize: { xs: "14px", sm: "16px", md: "18px" },
                        textAlign: "center",
                    }}
                >
                    We firmly believe in sourcing and supplying top-quality agri and food
                    products. We collaborate only with ISO, FSSAI, HACCP, HALAL, BRC and
                    FDA approved suppliers to ensure global food safety standards.
                </Typography>

                {loading ? (
                    Array.from(new Array(2)).map((_, i) => (
                        <Box key={i} sx={{ mb: 6 }}>
                            <Skeleton variant="rectangular" height={50} sx={{ mb: 6 }} />
                            <Grid container spacing={2}>
                                {Array.from(new Array(3)).map((_, j) => (
                                    <Grid size={{ xs: 12, sm: 4 }} key={j}>
                                        <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    list?.map((entry: any, entryIndex: number) => (
                        <Box key={entryIndex} sx={{ mb: 4 }}>
                            {entry?.abc_type?.name && (
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 3,
                                        color: "secondary.main",
                                        textAlign: "center",
                                        textTransform: "uppercase",
                                        letterSpacing: 1
                                    }}
                                >
                                    {entry.abc_type.name}
                                </Typography>
                            )}

                            {entry?.item?.map((item: any, itemIndex: number) => (
                                <Box
                                    key={itemIndex}
                                    sx={{
                                        mb: 6
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: "2px solid #3E3126",
                                            textAlign: "center",
                                            py: 1.5,
                                            mb: 6,
                                            fontWeight: 600,
                                            fontSize: "1.2rem",
                                            color: "#3E3126"
                                        }}
                                    >
                                        {item?.category?.name}
                                    </Box>

                                    <CardUi
                                        label='Availability'
                                        onEnquire={(product: any) => {
                                            setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                                            setOpenEnquiry(true)
                                        }}
                                        onRequestSample={(product: any) => {
                                            setSelectedProduct({ name: product.name, description: product?.description, images: product?.images?.[0], id: product.id })
                                            setOpen(true)
                                        }}
                                        products={item?.product_data}
                                        visiblecard={3}
                                        loading={loading}
                                    />
                                </Box>
                            ))}
                        </Box>
                    ))
                )}
            </Container>

            <InquiryDialog
                open={open}
                onClose={() => setOpen(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id
                }}
            />

            <EnquiryDialog
                open={openEnquiry}
                onClose={() => setOpenEnquiry(false)}
                product={{
                    name: selectedProduct?.name,
                    description: selectedProduct?.description,
                    images: selectedProduct?.images,
                    id: selectedProduct?.id
                }}
            />
        </Box>
    );
}