import { Box, Container, Typography, Skeleton, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";
import CardUi from "../../commonUI/CardUi";
import InquiryDialog from "../../component/Dialog/inquiry-dialog";
import EnquiryDialog from "../../component/Dialog/enquiry-dialog";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import { useSearchParams } from "react-router-dom";

export default function Abc() {
    const [searchParams] = useSearchParams();
    const country = searchParams.get("country");

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

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("abc"));
    }, [dispatch]);

    const getList = async (country: string) => {
        setLoading(true)
        try {
            const res = await CMSservice.getAbc(country)
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
        if (country) {
            getList(country)
        }
    }, [country])

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Abc'}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
                />
            )}

            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg"
                    alt="Supplier Banner"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            Abc Menus
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Container maxWidth="lg">

                {pageDetail?.content && (
                    <Typography
                        sx={{
                            color: "secondary.main",
                            mb: 5,
                            fontSize: { xs: "14px", sm: "16px", md: "18px" },
                            textAlign: "center",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: pageDetail?.content || null,
                        }}
                    />
                )}

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
                ) : list?.length > 0 ? (
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
                ) : (
                    <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 2 }}>
                        <Typography variant="h6" color="textSecondary">
                            No Abc data Found
                        </Typography>
                    </Grid>
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