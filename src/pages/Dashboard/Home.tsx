import {
    Box
} from '@mui/material';
import InteractiveWorldMap from '../../component/Home/InteractiveWorldMap';
import Analytical from '../../component/Home/Analytical';
import Events from '../../component/Home/Events';
import OurProcess from '../../component/OurProcess';
import Values from '../../component/Values';
import { useEffect, useState } from 'react';
import HomePageservice from '../../service/homepages.service';
import SEO from '../../component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFlatPageBySlug } from '../../store/slice/pageSlice';
import CountriesSnapshot from '../../component/Home/CountriesSnapshot';
import ESG from '../../component/Home/ESG';
import UpcomingCollabration from '../../component/Home/UpcomingCollabration';
import ProductListByCountry from '../../component/Home/ProductListByCountry';
import PreambleAndUpcoming from '../NewsAndEvents/PreambleAndUpcoming';
import TradeHistory from '../../component/Home/TradeHistory';
import SupplierTab from '../../component/SupplierTab';

export default function Home() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";
    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("home"));
    }, [dispatch]);


    const getAnalyticalData = async (country?: string) => {
        try {
            const response = await HomePageservice.getAnalyticalData(country);
            setLoading(false)
            if (response) {
                setAnalyticsData(response?.data?.data);
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error?.response?.data?.message || "Analytical data not fetch")
        }
    }

    useEffect(() => {
        getAnalyticalData(activeCountry);
    }, [activeCountry]);

    return (
        <>
            {pageDetail && (
                <SEO
                    title={pageDetail.page_title}
                    description={pageDetail.meta_description || ""}
                    keywords={pageDetail.meta_keyword || ""}
                />
            )}

            <Box>
                <Box component="section">
                    <InteractiveWorldMap />
                </Box>

                <Box component="section">
                    <CountriesSnapshot />
                </Box>

                <Box component="section">
                    <Analytical analyticsData={analyticsData} loading={loading} title="Important" label="Stats" />
                </Box>

                <Box component="section">
                    <ProductListByCountry />
                </Box>

                <Box component="section">
                    <Events />
                </Box>

                <Box component="section">
                    <ESG />
                </Box>

                <Box component="section">
                    <PreambleAndUpcoming country={activeCountry} />
                </Box>

                <Box component="section">
                    <TradeHistory />
                </Box>

                <Box component="section">
                    <OurProcess />
                </Box>

                <Box component="section">
                    <Values />
                </Box>

                <Box component="section">
                    <SupplierTab />
                </Box>

                <Box component="section">
                    <UpcomingCollabration />
                </Box>
            </Box>
        </>
    );
}