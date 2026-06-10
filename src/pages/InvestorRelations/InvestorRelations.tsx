import {
    Box,
    Divider,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCategories } from "../../store/slice/categoriesSlice";
import InquiryForm from "./InquiryForm";
import FinancialService from "./FinancialService";
import ProductSelection from "./ProductSelection";
import PageMainLayout from "../../commonUI/PageMainLayout";
import ProjectSelection from "./ProjectSelection";

export default function InvestorRelations() {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const [activeTab, setActiveTab] = useState('product');
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [activeSubCategory, setActiveSubCategory] = useState<string>("");
    const [activeProduct, setActiveProduct] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedService, setSelectedService] = useState<any>(null);

    const { categories, loading: categoriesLoading } = useSelector(
        (state: any) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const selectedCountryData = useMemo(() => {
        return (Array.isArray(categories) ? categories : []).find(
            (item: any) => item.country === selectedCountry
        ) || null;
    }, [categories, selectedCountry]);

    const categoryList = useMemo(() => {
        return selectedCountryData?.categories || [];
    }, [selectedCountryData]);

    const selectedCategoryData = useMemo(() => {
        return (Array.isArray(categoryList) ? categoryList : []).find(
            (cat: any) => String(cat.id) === activeCategory
        ) || null;
    }, [categoryList, activeCategory]);

    const subcategoryList = useMemo(() => {
        return selectedCategoryData?.subcategories || [];
    }, [selectedCategoryData]);

    const selectedSubCategoryData = useMemo(() => {
        return (Array.isArray(subcategoryList) ? subcategoryList : []).find(
            (sub: any) => String(sub.id) === activeSubCategory
        ) || null;
    }, [subcategoryList, activeSubCategory]);

    const productList = useMemo(() => {
        return selectedSubCategoryData?.products || [];
    }, [selectedSubCategoryData]);

    const selectedProduct = useMemo(() => {
        return (Array.isArray(productList) ? productList : []).find(
            (prod: any) => String(prod.id) === activeProduct
        ) || null;
    }, [productList, activeProduct]);

    useEffect(() => {
        setActiveCategory("");
        setActiveSubCategory("");
        setActiveProduct("");
    }, [selectedCountry]);

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
            <PageMainLayout title="Investor Relations" slug="investor_relations" image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" activeCountry="" setActiveCountry={() => { }} />

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

                <Divider sx={{ my: 4 }} />

                {activeTab === 'product' && (
                    <ProductSelection
                        activeCountry={selectedCountry}
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
                )}

                {activeTab === 'project' && (
                    <ProjectSelection activeCountry={selectedCountry} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                )}

                <Divider sx={{ my: 5 }} />

                <FinancialService activeCountry={selectedCountry} selectedService={selectedService} setSelectedService={setSelectedService} />

                <Divider sx={{ my: 5 }} />

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        {selectedService && (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2, md: 3 },
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 3,
                                    bgcolor: "background.default",
                                    height: "100%",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "secondary.main",
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    {selectedService?.name} Details
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        lineHeight: 1.8,
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            selectedService?.description ||
                                            "No description available.",
                                    }}
                                />
                            </Paper>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <InquiryForm activeCountry={selectedCountry} selectedProduct={selectedProduct} selectedProject={selectedProject} selectedService={selectedService} activeTab={activeTab} />
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}