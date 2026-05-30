import { Box, Paper, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import CategoryTab from "../../component/Home/CaterogyTab"
import Analytical from "../../component/Home/Analytical"
import ProductListByCountry from "../../component/Home/ProductListByCountry"
import TradeHistory from "../../component/Home/TradeHistory"
import SEO from "../../component/SEO"
import { useEffect, useState } from "react"
import HomePageservice from "../../service/homepages.service"
import SupplierTab from "../../component/SupplierTab"
import AbcTradeoffer from "../../component/AbcTradeoffer"

export default function CountryPage() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        if (country) {
            getAnalyticalData(country);
        }
    }, [country]);

    return (
        <Box component="main">
            <SEO
                title={`Tradexpert - Trade Opportunities in ${displayCountry}`}
                description={`Explore verified B2B spot markets, seasonal export products, trade history, and real-time business opportunities tailored for ${displayCountry} on Tradexpert.`}
                keywords={`B2B, marketplace, ${displayCountry}, trade, export, import, wholesale, suppliers`}
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
                            {country}
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
                    {country}
                </Paper>

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
            </Box>
        </Box>
    )
}