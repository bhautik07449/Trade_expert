import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../commonUI/ImageSlider";
import SpotMarketTable from "../../commonUI/spotMarket";
import ProductOverView from "../../component/Home/ProductOverView";
import OverViewContent from "../../component/Home/OverViewContent";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import CardImageSlider from "../../commonUI/CardImageSlider";

export default function CategoryPage() {
    const { category } = useParams();

    const [slides, setSlides] = useState<any[]>([])
    const [imageLoading, setImageLoading] = useState(true)
    const [membership, setMembership] = useState<any[]>([])
    const [membershipLoading, setMembershipLoading] = useState(true)
    const [affiliationLoading, setAffiliationLoading] = useState(true)
    const [affiliation, setAffiliation] = useState<any[]>([])

    const getSlide = async (category: string) => {
        try {
            const res = await HomePageservice.getImageSliderByCategory(category)
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
        if (category) {
            getSlide(category)
        }
    }, [category]);


    const getAffiliation = async () => {
        try {
            const res = await HomePageservice.getAffiliation()
            if (res) {
                setAffiliation(res?.data?.data)
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
        } finally {
            setAffiliationLoading(false)
        }
    }

    const getMembership = async () => {
        try {
            const res = await HomePageservice.getMembership()
            if (res) {
                setMembership(res?.data?.data)
            }
        } catch (error: any) {
            console.log(error?.response?.data?.message || error.message)
        } finally {
            setMembershipLoading(false)
        }
    }

    useEffect(() => {
        getAffiliation()
        getMembership()
    }, [])

    return (
        <Box>
            <ImageSlider slides={slides} loading={imageLoading} />
            <OverViewContent category={category} />
            <SpotMarketTable category={category} />
            <ProductOverView category={category} />

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
                        maxWidth: "1400px !important",
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
                            loading={membershipLoading}
                            cardImages={membership}
                        />

                        <CardImageSlider
                            title="Affiliation Resources"
                            description="View affiliation-related resources and supporting material."
                            loading={affiliationLoading}
                            cardImages={affiliation}
                        />
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}