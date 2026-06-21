import { Box, Tabs, Tab } from "@mui/material"
import Title from "../../commonUI/labelTitle"
import { useEffect, useState, useCallback } from "react"
import HomePageservice from "../../service/homepages.service"
import CMSservice from "../../service/cms.service"
import ProductView from "../../commonUI/ProductView"

export default function ProductOverView({ category }: any) {
    const [allProducts, setAllProducts] = useState([])
    const [currentProducts, setCurrentProducts] = useState([])
    const [upcomingProducts, setUpcomingProducts] = useState([])

    const [allLoading, setAllLoading] = useState(true)
    const [currentLoading, setCurrentLoading] = useState(true)
    const [upcomingLoading, setUpcomingLoading] = useState(true)

    const [subcategories, setSubcategories] = useState<any[]>([])

    const [activeAllSubcategory, setActiveAllSubcategory] = useState<string>("All")
    const [activeCurrentSubcategory, setActiveCurrentSubcategory] = useState<string>("All")
    const [activeUpcomingSubcategory, setActiveUpcomingSubcategory] = useState<string>("All")

    const [showAllSection, setShowAllSection] = useState(false)
    const [showCurrentSection, setShowCurrentSection] = useState(false)
    const [showUpcomingSection, setShowUpcomingSection] = useState(false)

    const [prevCategory, setPrevCategory] = useState(category)

    if (category !== prevCategory) {
        setPrevCategory(category)
        setActiveAllSubcategory("All")
        setActiveCurrentSubcategory("All")
        setActiveUpcomingSubcategory("All")
        setShowAllSection(false)
        setShowCurrentSection(false)
        setShowUpcomingSection(false)
        setAllProducts([])
        setCurrentProducts([])
        setUpcomingProducts([])
    }

    const getCategoryDetails = async (id: string) => {
        try {
            const res = await CMSservice.getCategoryById(id)
            const children = res?.data?.children || []
            setSubcategories(children)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (category) {
            getCategoryDetails(category)
        }
    }, [category])

    const fetchProducts = useCallback(async (season: string, subCategory: string, setProducts: any, setLoading: any, setShowSection: any) => {
        setLoading(true)
        try {
            const res = await HomePageservice.getProductsByCategory(category, season, subCategory)
            const data = res?.data?.data || []
            setProducts(data)
            setShowSection(data.length > 0)
        } catch (error) {
            console.log(`Error fetching ${season} products`, error)
            setProducts([])
            setShowSection(false)
        } finally {
            setLoading(false)
        }
    }, [category])

    useEffect(() => {
        if (category) {
            fetchProducts('All', activeAllSubcategory, setAllProducts, setAllLoading, setShowAllSection)
        }
    }, [category, activeAllSubcategory, fetchProducts])

    useEffect(() => {
        if (category) {
            fetchProducts('Current', activeCurrentSubcategory, setCurrentProducts, setCurrentLoading, setShowCurrentSection)
        }
    }, [category, activeCurrentSubcategory, fetchProducts])

    useEffect(() => {
        if (category) {
            fetchProducts('Upcoming', activeUpcomingSubcategory, setUpcomingProducts, setUpcomingLoading, setShowUpcomingSection)
        }
    }, [category, activeUpcomingSubcategory, fetchProducts])

    const renderSubcategoryTabs = (value: string, onChange: (val: string) => void) => {
        if (!subcategories || subcategories.length === 0) return null;
        return (
            <Box
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    WebkitOverflowScrolling: "touch",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    mb: 4,
                    mt: 1
                }}
            >
                <Tabs
                    value={value}
                    onChange={(_, val: string) => onChange(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="subcategory tabs"
                    sx={{
                        minHeight: 52,

                        "& .MuiTabs-scroller": {
                            overflowX: "auto !important",
                            overflowY: "hidden",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                        },

                        "& .MuiTabs-indicator": {
                            display: "none",
                        },

                        "& .MuiTabs-flexContainer": {
                            gap: 1,
                            justifyContent: {
                                xs: "flex-start",
                                md: "center",
                            },
                            flexWrap: "nowrap",
                        },

                        "& .MuiTabs-scrollButtons": {
                            color: "secondary.main",
                            width: 34,
                            "&.Mui-disabled": {
                                opacity: 0.25,
                            },
                        },

                        "& .MuiTab-root": {
                            minHeight: 44,
                            minWidth: "auto",
                            px: { xs: 2.2, sm: 3 },
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700,
                            color: "text.secondary",
                            border: "1px solid",
                            borderColor: "divider",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                        },

                        "& .MuiTab-root:hover": {
                            bgcolor: "primary.light",
                            color: "secondary.dark",
                        },

                        "& .Mui-selected": {
                            bgcolor: "primary.main",
                            color: "#fff !important",
                            borderColor: "primary.main",
                        },
                    }}
                >
                    <Tab label="All" value="All" />
                    {(Array.isArray(subcategories) ? subcategories : []).map((item) => (
                        <Tab
                            key={item?.id || item?.name}
                            label={item?.name}
                            value={item?.id}
                        />
                    ))}
                </Tabs>
            </Box>
        );
    }

    return (
        <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 6, md: 10 }, bgcolor: "white" }}>
            <Box sx={{ maxWidth: "1400px", mx: "auto", }}>

                {showAllSection && (
                    <Box sx={{ mb: 6 }}>
                        <Title title='All Season' label='Availability' />
                        {renderSubcategoryTabs(activeAllSubcategory, setActiveAllSubcategory)}
                        <ProductView
                            products={allProducts}
                        />
                    </Box>
                )}

                {showCurrentSection && (
                    <Box sx={{ mb: 6 }}>
                        <Title title='Current' label='Season' />
                        {renderSubcategoryTabs(activeCurrentSubcategory, setActiveCurrentSubcategory)}
                        <ProductView
                            products={currentProducts}
                        />
                    </Box>
                )}

                {showUpcomingSection && (
                    <Box sx={{ mb: 6 }}>
                        <Title title='Upcoming' label='Season' />
                        {renderSubcategoryTabs(activeUpcomingSubcategory, setActiveUpcomingSubcategory)}
                        <ProductView
                            products={upcomingProducts}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}