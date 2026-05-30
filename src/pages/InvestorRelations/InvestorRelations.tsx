import {
    Box,
    Typography,
    Divider,
    Paper
} from "@mui/material";
import { useEffect, useState } from "react";
import SEO from "../../component/SEO";
import CountryTab from "../../commonUI/CountryTab";
import HomePageservice from "../../service/homepages.service";
import InquiryForm from "./InquiryForm";
import FinancialService from "./FinancialService";
import ProductSelection from "./ProductSelection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchFlatPageBySlug } from "../../store/slice/pageSlice";
import PageContentSkeleton from "../../component/PageContentSkeleton";

export default function InvestorRelations() {
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [activeProduct, setActiveProduct] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const [product, setProduct] = useState<any[]>([]);

    const [productLoading, setProductLoading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail, loading } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("investor_relations"));
    }, [dispatch]);

    const getProductData = async (country: string) => {
        try {
            setProductLoading(true);
            setProduct([]);
            setActiveProduct("");
            setSelectedProduct(null);

            const res = await HomePageservice.getProduct(country);
            const productList = Array.isArray(res?.data?.data)
                ? res?.data?.data
                : [];

            setProduct(productList);

            if (productList.length > 0) {
                setActiveProduct(productList[0]?.name || "");
                setSelectedProduct(productList[0]);
            }
        } catch (error: any) {
            setProduct([]);
            setActiveProduct("");
            setSelectedProduct(null);
        } finally {
            setProductLoading(false);
        }
    };

    useEffect(() => {
        if (activeCountry) {
            getProductData(activeCountry);
        } else {
            setProduct([]);
            setActiveProduct("");
            setSelectedProduct(null);
        }
    }, [activeCountry]);

    const handleProductSelect = (selectedName: string) => {
        setActiveProduct(selectedName);

        const selected = product.find((item) => item?.name === selectedName);

        setSelectedProduct(selected || null);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
            }}
        >
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
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
                    src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg"
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
                            Investor Relations
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    mt: { xs: -5, md: -7 },
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        mb: 4,
                        p: { xs: 2.5, sm: 3, md: 4 },
                        borderRadius: 4,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                    }}
                >
                    {(loading || pageDetail?.content) && (
                        loading ? (
                            <PageContentSkeleton />
                        ) : (
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: { xs: "14px", sm: "16px" },
                                    lineHeight: 1.8,
                                    textAlign: "justify",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: pageDetail?.content || "",
                                }}
                            />
                        )
                    )}

                    <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />
                </Paper>

                <Divider sx={{ my: 4 }} />

                <ProductSelection
                    handleProductSelect={handleProductSelect}
                    productLoading={productLoading}
                    product={product}
                    activeProduct={activeProduct}
                    selectedProduct={selectedProduct}
                    activeCountry={activeCountry}
                />

                <Divider sx={{ my: 5 }} />

                <FinancialService activeCountry={activeCountry} />

                <Divider sx={{ my: 5 }} />

                <InquiryForm activeCountry={activeCountry} selectedProduct={selectedProduct} />
            </Box>
        </Box>
    );
}