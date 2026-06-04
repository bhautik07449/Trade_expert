import {
    Box,
    Divider,
    Tab,
    Tabs
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCategories } from "../../store/slice/categoriesSlice";
import InquiryForm from "./InquiryForm";
import FinancialService from "./FinancialService";
import ProductSelection from "./ProductSelection";
import PageMainLayout from "../../commonUI/PageMainLayout";

export default function InvestorRelations() {
    const dispatch = useDispatch<AppDispatch>();

    const [activeTab, setActiveTab] = useState('product');
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [activeSubCategory, setActiveSubCategory] = useState<string>("");
    const [activeProduct, setActiveProduct] = useState<string>("");
    const [selectedService, setSelectedService] = useState<any>(null);

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const selectedCountryData = useMemo(() => {
        return categories?.find(
            (item: any) => item.country === activeCountry
        ) || null;
    }, [categories, activeCountry]);

    const categoryList = useMemo(() => {
        return selectedCountryData?.categories || [];
    }, [selectedCountryData]);

    const selectedCategoryData = useMemo(() => {
        return categoryList.find(
            (cat: any) => String(cat.id) === activeCategory
        ) || null;
    }, [categoryList, activeCategory]);

    const subcategoryList = useMemo(() => {
        return selectedCategoryData?.subcategories || [];
    }, [selectedCategoryData]);

    const selectedSubCategoryData = useMemo(() => {
        return subcategoryList.find(
            (sub: any) => String(sub.id) === activeSubCategory
        ) || null;
    }, [subcategoryList, activeSubCategory]);

    const productList = useMemo(() => {
        return selectedSubCategoryData?.products || [];
    }, [selectedSubCategoryData]);

    const selectedProduct = useMemo(() => {
        return productList.find(
            (prod: any) => String(prod.id) === activeProduct
        ) || null;
    }, [productList, activeProduct]);

    useEffect(() => {
        setActiveCategory("");
        setActiveSubCategory("");
        setActiveProduct("");
    }, [activeCountry]);

    useEffect(() => {
        if (categoryList.length > 0) {
            setActiveCategory(String(categoryList[0].id));
        } else {
            setActiveCategory("");
        }
    }, [categoryList]);

    useEffect(() => {
        setActiveSubCategory("");
        setActiveProduct("");
        if (subcategoryList.length > 0) {
            setActiveSubCategory(String(subcategoryList[0].id));
        }
    }, [activeCategory, subcategoryList]);

    useEffect(() => {
        setActiveProduct("");
        if (productList.length > 0) {
            setActiveProduct(String(productList[0].id));
        }
    }, [activeSubCategory, productList]);

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
                    px: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={(_, newValue) => setActiveTab(newValue)}
                        centered
                    >
                        <Tab label="Product" value="product" />
                        <Tab label="Project" value="project" />
                    </Tabs>
                </Box>

                {activeTab === 'product' && (
                    <>
                        <Divider sx={{ my: 4 }} />

                        <ProductSelection
                            activeCountry={activeCountry}
                            categoriesLoading={categoriesLoading}
                            categoryList={categoryList}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            subcategoryList={subcategoryList}
                            activeSubCategory={activeSubCategory}
                            setActiveSubCategory={setActiveSubCategory}
                            productList={productList}
                            activeProduct={activeProduct}
                            setActiveProduct={setActiveProduct}
                            selectedProduct={selectedProduct}
                        />

                        <Divider sx={{ my: 5 }} />

                        <FinancialService activeCountry={activeCountry} selectedService={selectedService} setSelectedService={setSelectedService} />

                        <Divider sx={{ my: 5 }} />

                        <InquiryForm activeCountry={activeCountry} selectedProduct={selectedProduct} selectedService={selectedService} />
                    </>
                )}

                {activeTab === 'project' && (
                    <Box>
                        Project selection
                    </Box>
                )}
            </Box>
        </Box>
    );
}