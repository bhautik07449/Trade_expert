import { Box, Typography } from "@mui/material";
import SEO from "../../component/SEO";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function CSR() {
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("csr"));
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
            <img src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" alt="Quality Policies" style={{ width: '100%', minHeight: '200px', maxHeight: '400px', objectFit: 'cover' }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                    CSR
                </Typography>
            </Box>


            <Box sx={{ maxWidth: "1100px", mx: "auto", px: 2 }}>
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