import { Box, Container } from "@mui/material"
import { useParams } from "react-router-dom"
import ImageSlider from "../../commonUI/ImageSlider"
import CategoryTab from "../../component/Home/CaterogyTab"
import Analytical from "../../component/Home/Analytical"
import ProductListByCountry from "../../component/Home/ProductListByCountry"
import TradeHistory from "../../component/Home/TradeHistory"
import SEO from "../../component/SEO"
import { useEffect, useState } from "react"
import HomePageservice from "../../service/homepages.service"
import SupplierTab from "../../component/SupplierTab"
import AbcTradeoffer from "../../component/AbcTradeoffer"
import CardImageSlider from "../../commonUI/CardImageSlider"

const data = [
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" },
    { image: "https://res.cloudinary.com/dr0xw4ztr/image/upload/v1778127798/o68lemrjsl1owjn15fkk.png" }
]

export default function CountryPage() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [slides, setSlides] = useState<any[]>([])
    const [imageLoading, setImageLoading] = useState(true)

    const { country } = useParams()

    const displayCountry = country ? decodeURIComponent(country) : "Global";

    const getAnalyticalData = async (country: string) => {
        try {
            const response = await HomePageservice.getAnalyticalByCountry(country);
            setLoading(false)
            if (response) {
                setAnalyticsData(response?.data?.data);
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error?.response?.data?.message || error.message)
        }
    }

    const getSlide = async (country: string) => {
        try {
            const res = await HomePageservice.getImageSliderByCountry(country)
            if (res) {
                setImageLoading(false)
                setSlides(res?.data?.data)
            }
        } catch (error: any) {
            setImageLoading(false)
            console.log(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (country) {
            getAnalyticalData(country);
            getSlide(country)
        }
    }, [country]);

    return (
        <Box component="main">
            <SEO
                title={`Tradexpert - Trade Opportunities in ${displayCountry}`}
                description={`Explore verified B2B spot markets, seasonal export products, trade history, and real-time business opportunities tailored for ${displayCountry} on Tradexpert.`}
                keywords={`B2B, marketplace, ${displayCountry}, trade, export, import, wholesale, suppliers`}
            />

            <ImageSlider slides={slides} loading={imageLoading} />

            <Box component="section">
                <Analytical analyticsData={analyticsData} loading={loading} />
            </Box>

            <Box component="section">
                <CategoryTab country={country} />
            </Box>

            <Box component="section">
                <ProductListByCountry country={displayCountry} />
            </Box>

            <Box component="section">
                <TradeHistory country={country} />
            </Box>

            <Box component="section">
                <SupplierTab country={country} />
            </Box>

            <Box component="section">
                <AbcTradeoffer country={country} />
            </Box>

            <Box
                component="section"
                sx={{
                    position: "relative",
                    py: { xs: 6, md: 10 },
                    bgcolor: "background.default",
                    overflow: "hidden",
                }}
            >
                <Container
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "1200px !important",
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                            },
                            gap: { xs: 7, md: 5, lg: 7 },
                            alignItems: "stretch",
                        }}
                    >
                        <CardImageSlider
                            title="Membership Resources"
                            description="Explore useful membership documents and visual resources."
                            loading={false}
                            cardImages={data}
                        />

                        <CardImageSlider
                            title="Affiliation Resources"
                            description="View affiliation-related resources and supporting material."
                            loading={false}
                            cardImages={data}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}