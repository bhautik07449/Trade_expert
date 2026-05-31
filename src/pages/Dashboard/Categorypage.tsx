import { Box, Container, Paper, Typography } from "@mui/material";
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
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";

type Category = {
    name?: string
}

export default function CategoryPage() {
    const { category } = useParams();

    const [categoryName, setCategoryName] = useState<Category>()

    const [membership, setMembership] = useState<any[]>([])
    const [membershipLoading, setMembershipLoading] = useState(true)
    const [affiliationLoading, setAffiliationLoading] = useState(true)
    const [affiliation, setAffiliation] = useState<any[]>([])

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

    const getCategory = async (id: any) => {
        try {
            const res = await CMSservice.getCategoryById(id);
            setCategoryName(res?.data)
        } catch (error: any) {
            toast.error(error?.response?.message || "Category not found");
            return null;
        }
    };

    useEffect(() => {
        getAffiliation()
        getMembership()
        getCategory(category)
    }, [category])

    return (
        <Box>
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
                    src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
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
                            {categoryName?.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: { xs: -5, md: -7 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        mb: 4,
                        maxWidth: "1400px",
                        mx: 'auto',
                        p: { xs: 2.5, sm: 3, md: 4 },
                        borderRadius: 4,
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        boxShadow: "0 18px 45px rgba(62,49,38,0.08)",
                        textAlign: "center",
                        fontSize: { xs: "14px", sm: "16px" },
                    }}
                >
                    {categoryName?.name}
                </Paper>

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
        </Box>
    )
}