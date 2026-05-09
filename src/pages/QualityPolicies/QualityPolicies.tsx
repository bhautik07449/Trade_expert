import { Box, Typography, Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import CMSservice from "../../service/cms.service";
import { getImageUrl } from "../../utils/imageUtils";
import { toast } from "react-toastify";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

interface Props {
    logo: string,
    name: string,
    description: string
    category: {
        name: string
    }
}

export default function QualityPolicies() {
    const [list, setList] = useState<Props[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading: pageLoading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("quality_policies"));
    }, [dispatch]);

    const getList = async () => {
        setLoading(true)
        try {
            const res = await CMSservice.getList()
            if (res) {
                setList(res?.data?.data)
            }
        } catch (error) {
            toast.error("Quality Policies not fetch")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Career'}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
                />
            )}

            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                alt="Quality Policies"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "350px" },
                    objectFit: "cover",
                }}
            />

            <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "secondary.main" }}
                >
                    Quality Policies
                </Typography>
            </Box>

            <Container maxWidth="lg">

                <Box sx={{ p: 4, textAlign: 'center' }}>
                    {pageLoading ? (
                        <PageContentSkeleton />
                    ) : pageDetail?.content && (
                        <Typography
                            sx={{
                                color: "secondary.main",
                                mb: 5,
                                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                                textAlign: "justify",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: pageDetail?.content || null,
                            }}
                        />
                    )}
                </Box>

                {loading ? (
                    Array.from(new Array(3)).map((_, i) => (
                        <Box key={i} sx={{ mb: 8 }}>
                            <Skeleton variant="rectangular" height={50} sx={{ mb: 6 }} />
                            <Grid container spacing={4} alignItems="center">
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Skeleton variant="rectangular" height={150} width={150} sx={{ mx: "auto", borderRadius: "50%" }} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Skeleton variant="text" height={40} width="60%" sx={{ mb: 2 }} />
                                    <Skeleton variant="text" height={20} />
                                    <Skeleton variant="text" height={20} />
                                    <Skeleton variant="text" height={20} width="80%" />
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                ) : (
                    list?.map((item, index) => (
                        <Box key={index} sx={{ mb: 8 }}>
                            <Box
                                sx={{
                                    border: "2px solid #3E3126",
                                    textAlign: "center",
                                    py: 1.5,
                                    mb: 6,
                                    fontWeight: 600,
                                }}
                            >
                                {item?.category?.name}
                            </Box>

                            <Grid
                                container
                                spacing={4}
                                alignItems="center"
                            >
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Box
                                        component="img"
                                        src={getImageUrl(item?.logo)}
                                        alt={item?.name}
                                        sx={{
                                            width: "100%",
                                            maxWidth: "200px",
                                            mx: "auto",
                                            display: "block",
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{ color: "secondary.main", mb: 2, fontWeight: 600 }}
                                    >
                                        {item?.name}
                                    </Typography>

                                    <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
                                        {item?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                )}
            </Container>
        </Box>
    );
}