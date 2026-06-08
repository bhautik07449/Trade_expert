import { Box } from "@mui/material"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setSelectedCountry } from "../../store/slice/countrySlice"
import CategoryTab from "../../component/Home/CaterogyTab"
import Analytical from "../../component/Home/Analytical"
import ProductListByCountry from "../../component/Home/ProductListByCountry"
import TradeHistory from "../../component/Home/TradeHistory"
import { useEffect, useState } from "react"
import HomePageservice from "../../service/homepages.service"
import SupplierTab from "../../component/SupplierTab"
import AbcTradeoffer from "../../component/AbcTradeoffer"
import PageMainLayout from "../../commonUI/PageMainLayout"

export default function CountryPage() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { country } = useParams()
    const dispatch = useDispatch();
    const globalCountry = useSelector((state: any) => state.country.selectedCountry);

    useEffect(() => {
        const decoded = country ? decodeURIComponent(country) : "";
        if (decoded && decoded !== globalCountry) {
            dispatch(setSelectedCountry(decoded));
        }
    }, [country, dispatch]);

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
            <PageMainLayout image="https://sourceseas.itcoders.in/img/front-end/quality.jpg" title={`Trade Opportunities in ${displayCountry}`} slug="country" activeCountry={displayCountry} setActiveCountry={() => { }} />

            <Box
                sx={{
                    mt: { xs: -5, md: -7 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box component="section">
                    <CategoryTab country={country} />
                </Box>

                <Box component="section">
                    <ProductListByCountry country={displayCountry} />
                </Box>

                <Box component="section">
                    <Analytical analyticsData={analyticsData} loading={loading} title="Important" label="Stats" />
                </Box>

                <Box component="section">
                    <TradeHistory country={country} />
                </Box>

                <Box component="section">
                    <AbcTradeoffer country={country} />
                </Box>

                <Box component="section">
                    <SupplierTab country={country} />
                </Box>
            </Box>
        </Box>
    )
}