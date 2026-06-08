import { Box } from "@mui/material"
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

    const dispatch = useDispatch();
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    useEffect(() => {
        const decoded = selectedCountry ? decodeURIComponent(selectedCountry) : "";
        if (decoded && decoded !== selectedCountry) {
            dispatch(setSelectedCountry(decoded));
        }
    }, [selectedCountry, dispatch]);

    const getAnalyticalData = async (country: string) => {
        setLoading(true);
        setAnalyticsData([]);
        try {
            const response = await HomePageservice.getAnalyticalByCountry(country);
            setLoading(false)
            if (response) {
                setAnalyticsData(response?.data?.data || []);
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (selectedCountry) {
            getAnalyticalData(selectedCountry);
        }
    }, [selectedCountry]);

    return (
        <Box component="main">
            <PageMainLayout image="https://sourceseas.itcoders.in/img/front-end/quality.jpg" title={`Trade Opportunities in ${selectedCountry}`} slug="country" activeCountry={selectedCountry} setActiveCountry={() => { }} />

            <Box
                sx={{
                    mt: { xs: -5, md: -7 },
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box component="section">
                    <CategoryTab />
                </Box>

                <Box component="section">
                    <ProductListByCountry />
                </Box>

                <Box component="section">
                    <Analytical analyticsData={analyticsData} loading={loading} title="Important" label="Stats" />
                </Box>

                <Box component="section">
                    <TradeHistory />
                </Box>

                <Box component="section">
                    <AbcTradeoffer />
                </Box>

                <Box component="section">
                    <SupplierTab country={selectedCountry} />
                </Box>
            </Box>
        </Box>
    )
}