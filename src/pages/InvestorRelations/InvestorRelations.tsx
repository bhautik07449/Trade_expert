import {
    Box,
    Container,
    Typography,
    Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import SEO from "../../component/SEO";
import CountryTab from "../../commonUI/CountryTab";
import HomePageservice from "../../service/homepages.service";
import InquiryForm from "./InquiryForm";
import FinancialService from "./FinancialService";
import ProductSelection from "./ProductSelection";

export default function InvestorRelations() {
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [activeProduct, setActiveProduct] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const [product, setProduct] = useState<any[]>([]);

    const [productLoading, setProductLoading] = useState<boolean>(false);

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
            <SEO
                title="Investor Relations - SourceSeas"
                description="Explore investment opportunities, product selections, financial services, and international trade support with SourceSeas."
                keywords="investor relations, investment support, export assistance, international trade, product sourcing"
            />

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
                    alt="Investor Relations Banner"
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

            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 4, md: 6 },
                }}
            >
                <CountryTab
                    activeCountry={activeCountry}
                    setActiveCountry={setActiveCountry}
                />

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
            </Container>
        </Box>
    );
}