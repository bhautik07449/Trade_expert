import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCountry } from '../../store/slice/countrySlice';
import { Box, Typography, Skeleton, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Brandservice from "../../service/brand.service";
import { getImageUrl } from "../../utils/imageUtils";
import SubCategoryTab from "../../commonUI/SubCategoryTab";
import BrandsProductView from "../../commonUI/BrandsProductView";
import PageMainLayout from "../../commonUI/PageMainLayout";

interface BrandItem {
    id?: number;
    logo: string;
    name: string;
    description: string;
    country?: string;
}

interface SubCategoryItem {
    id?: number;
    name: string;
}

interface ProductItem {
    id: number
    name: string
    images: string[]
    category: string
    categoryColor: string
    description: string
    subcategory: {
        name?: string
    }
}

interface BrandCategoryGroup {
    category: {
        id?: number;
        name: string;
    };
    brands: BrandItem[];
    subcategories: SubCategoryItem[];
    products: ProductItem[];
}

interface BrandCountryGroup {
    country: string;
    category: BrandCategoryGroup[];
}

export default function Brand() {
    const [list, setList] = useState<BrandCountryGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";
    const dispatch = useDispatch();

    const [activeSubCategory, setActiveSubCategory] = useState<
        Record<string, string>
    >({});


    const getList = async (country: string) => {
        setLoading(true);

        try {
            const res = await Brandservice.getList(country);

            if (res) {
                setList(res?.data?.data || []);
            }
        } catch (error) {
            toast.error("Brand not found");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getList(activeCountry);
    }, [activeCountry]);

    const getSubCategoryKey = (country: string, categoryName: string) => {
        return `${country}-${categoryName}`;
    };

    const getActiveSubCategory = (
        country: string,
        categoryName: string,
        subcategories: SubCategoryItem[]
    ) => {
        const key = getSubCategoryKey(country, categoryName);

        if (activeSubCategory[key]) {
            return activeSubCategory[key];
        }

        return subcategories?.[0]?.name || "";
    };

    const handleSubCategoryChange = (
        country: string,
        categoryName: string,
        value: string
    ) => {
        const key = getSubCategoryKey(country, categoryName);

        setActiveSubCategory((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getFilteredProducts = (
        products: ProductItem[],
        activeSubCategory: string
    ) => {
        if (!activeSubCategory) {
            return products || [];
        }

        return (products || []).filter(
            (product) => product?.subcategory?.name === activeSubCategory
        );
    };

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
            <PageMainLayout title="Brands" slug="brands" image="https://sourceseas.itcoders.in/img/front-end/brands.jpg" country={true} activeCountry={activeCountry} setActiveCountry={(c: string) => dispatch(setSelectedCountry(c))} />

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
                <Box sx={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {loading ? (
                        Array.from(new Array(3)).map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    maxWidth: "1400px",
                                    mx: "auto",
                                    width: "100%",
                                    py: 4,
                                    textAlign: "center",
                                }}
                            >
                                <Skeleton
                                    variant="text"
                                    width="25%"
                                    height={50}
                                    sx={{ mx: "auto", mb: 2 }}
                                />

                                <Skeleton
                                    variant="rectangular"
                                    height={50}
                                    width="100%"
                                    sx={{ borderRadius: 2, mb: 4 }}
                                />

                                <Skeleton
                                    variant="circular"
                                    width={100}
                                    height={100}
                                    sx={{ mx: "auto", mb: 3 }}
                                />

                                <Skeleton
                                    variant="text"
                                    width="30%"
                                    sx={{ mx: "auto", mb: 2 }}
                                />
                                <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                                <Skeleton variant="text" width="75%" sx={{ mx: "auto" }} />
                            </Box>
                        ))
                    ) : list.length > 0 ? (
                        list.map((countryGroup, countryIndex) => {
                            const filteredCategoryGroups = countryGroup.category;

                            return (
                                <Box key={countryGroup.country || countryIndex}>
                                    {filteredCategoryGroups.map((categoryGroup, categoryIndex) => {
                                        const activeSubCategory = getActiveSubCategory(
                                            countryGroup.country,
                                            categoryGroup.category.name,
                                            categoryGroup.subcategories || []
                                        );

                                        const filteredProducts = getFilteredProducts(
                                            categoryGroup.products || [],
                                            activeSubCategory
                                        );

                                        return (
                                            <Box
                                                key={
                                                    categoryGroup.category.id ||
                                                    categoryGroup.category.name ||
                                                    categoryIndex
                                                }
                                            >
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        textAlign: "center",
                                                        fontWeight: 600,
                                                        color: "secondary.main",
                                                        mb: 3,
                                                    }}
                                                >
                                                    {categoryGroup.category.name}
                                                </Typography>

                                                {categoryGroup.brands.map((brand, brandIndex) => (
                                                    <Box key={brand.id || brandIndex}>
                                                        <Box
                                                            sx={{
                                                                maxWidth: "900px",
                                                                mx: "auto",
                                                                py: 3,
                                                                px: { xs: 1, sm: 2 },
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                alignItems: "center",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={getImageUrl(brand?.logo)}
                                                                alt={brand?.name}
                                                                sx={{
                                                                    width: 110,
                                                                    height: 110,
                                                                    objectFit: "contain",
                                                                    mb: 3,
                                                                }}
                                                            />

                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    color: "secondary.main",
                                                                    mb: 2,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {brand?.name}
                                                            </Typography>

                                                            <Typography
                                                                sx={{
                                                                    color: "text.secondary",
                                                                    lineHeight: 1.8,
                                                                    maxWidth: "850px",
                                                                    mb: 3,
                                                                }}
                                                            >
                                                                {brand?.description}
                                                            </Typography>

                                                            <SubCategoryTab
                                                                subcategory={categoryGroup?.subcategories || []}
                                                                activeSubCategory={activeSubCategory}
                                                                setActiveSubCategory={(value) =>
                                                                    handleSubCategoryChange(
                                                                        countryGroup.country,
                                                                        categoryGroup.category.name,
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        </Box>

                                                        {brandIndex !== categoryGroup.brands.length - 1 && (
                                                            <Divider
                                                                sx={{
                                                                    maxWidth: "850px",
                                                                    mx: "auto",
                                                                    my: 3,
                                                                    borderColor: "divider",
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                ))}

                                                <BrandsProductView products={filteredProducts} />

                                                {categoryIndex !== filteredCategoryGroups.length - 1 && (
                                                    <Divider
                                                        sx={{
                                                            maxWidth: "1000px",
                                                            mx: "auto",
                                                            my: 6,
                                                            borderColor: "divider",
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        );
                                    })}

                                    {countryIndex !== list.length - 1 && (
                                        <Divider
                                            sx={{
                                                maxWidth: "1400px",
                                                mx: "auto",
                                                my: 7,
                                                borderColor: "divider",
                                            }}
                                        />
                                    )}
                                </Box>
                            );
                        })
                    ) : (
                        <Box sx={{ textAlign: "center", py: 5 }}>
                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 600,
                                }}
                            >
                                No brands found.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}