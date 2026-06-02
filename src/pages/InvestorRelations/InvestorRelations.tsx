import {
    Box,
    Divider
} from "@mui/material";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import InquiryForm from "./InquiryForm";
import FinancialService from "./FinancialService";
import ProductSelection from "./ProductSelection";
import PageMainLayout from "../../commonUI/PageMainLayout";

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
                pb: { xs: 6, md: 10 }
            }}
        >
            <PageMainLayout title="Investor Relations" slug="investor_relations" image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" country={true} activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

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