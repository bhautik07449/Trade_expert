import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import SEO from "../../component/SEO";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function Career() {
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("career"));
    }, [dispatch]);

    return (
        <Box sx={{ bgcolor: 'white', minHeight: '100vh', pb: 10 }}>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Career'}
                    description={pageDetail.meta_description || ''}
                    keywords={pageDetail.meta_keyword || ''}
                />
            )}

            <img src="https://sourceseas.itcoders.in/img/my_account_bg1.jpg" alt="Quality Policies" style={{ width: '100%', height: 'auto', minHeight: '200px', maxHeight: '400px', }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    Build Career at sourceseas
                </Typography>
            </Box>

            <Box sx={{ p: 4, textAlign: 'center' }} maxWidth="lg" mx="auto">
                {loading ? (
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
        </Box >
    )
}