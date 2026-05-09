import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import { Typography, Box, CircularProgress } from "@mui/material";
import SEO from "../../component/SEO";

export default function Resource() {
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        if (slug) {
            dispatch(fetchFlatPageBySlug(slug));
        }
    }, [slug, dispatch]);

    return (
        <Box sx={{ p: 3 }}>
            {pageDetail && (
                <SEO 
                    title={pageDetail.page_meta_title || pageDetail.page_title || 'Resource'} 
                    description={pageDetail.meta_description || ''} 
                    keywords={pageDetail.meta_keyword || ''} 
                />
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                    <CircularProgress />
                </Box>
            ) : pageDetail?.content ? (
                <Box>
                    <Typography
                        variant="h4"
                        sx={{ mb: 4, fontWeight: 700, color: "secondary.main" }}
                    >
                        {pageDetail.page_title}
                    </Typography>
                    <Typography
                        component="div"
                        dangerouslySetInnerHTML={{
                            __html: decodeHTML(pageDetail.content),
                        }}
                    />
                </Box>
            ) : (
                <Typography sx={{ textAlign: 'center', py: 5 }}>
                    No content found
                </Typography>
            )}
        </Box>
    );
}