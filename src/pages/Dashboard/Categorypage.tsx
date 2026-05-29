import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../commonUI/ImageSlider";
import SpotMarketTable from "../../commonUI/spotMarket";
import ProductOverView from "../../component/Home/ProductOverView";
import OverViewContent from "../../component/Home/OverViewContent";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";
import CardImageSlider from "../../commonUI/CardImageSlider";
import CategoryInsight from "../../component/Category/CategoryInsight";
import StateStanding from "../../component/Category/StateStanding";
import ComodityProfile from "../../component/Category/ComodityProfile";
import CommodityProcessFlow from "../../component/Category/CommodityProcessFlow";
import Events from "../../component/Home/Events";

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
            <CategoryInsight category={category} />
            <StateStanding category={category} />
            <ProductOverView category={category} />
            <ComodityProfile category={category} />
            <CommodityProcessFlow />
            <Events />

            <Box
                component="section"
                sx={{
                    position: "relative",
                    py: { xs: 5, sm: 6, md: 8, lg: 10 },
                    bgcolor: "background.default",
                    overflow: "hidden",
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "1400px",
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4, lg: 5 },
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                md: "repeat(2, minmax(0, 1fr))",
                            },
                            gap: { xs: 5, sm: 6, md: 4, lg: 6 },
                            alignItems: "stretch",
                        }}
                    >
                        <CardImageSlider
                            title="Membership"
                            label="Resources"
                            description="Explore useful membership documents and visual resources."
                            loading={membershipLoading}
                            cardImages={membership}
                        />

                        <CardImageSlider
                            title="Affiliation"
                            label="Resources"
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