import {
    Box
} from '@mui/material';
import InteractiveWorldMap from '../../component/Home/InteractiveWorldMap';
import Analytical from '../../component/Home/Analytical';
import Events from '../../component/Home/Events';
import OurProcess from '../../component/OurProcess';
import Values from '../../component/Values';
import AboutTestimonial from '../About/AboutTestimonial';
import { useEffect, useState } from 'react';
import HomePageservice from '../../service/homepages.service';
import SEO from '../../component/SEO';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFlatPageBySlug } from '../../store/slice/pageSlice';
import CountriesSnapshot from '../../component/Home/CountriesSnapshot';
import ESG from '../../component/Home/ESG';
import UpcomingCollabration from '../../component/Home/UpcomingCollabration';

export default function Home() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    const { pageDetail } = useSelector((state: RootState) => state.page);

    useEffect(() => {
        dispatch(fetchFlatPageBySlug("home"));
    }, [dispatch]);

    const getAnalyticalData = async () => {
        try {
            const response = await HomePageservice.getAnalyticalData();
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
        getAnalyticalData();
    }, []);

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
                <InteractiveWorldMap />
                <CountriesSnapshot />
                <Events />
                <ESG />
                <Analytical analyticsData={analyticsData} loading={loading} />
                <OurProcess />
                <Values />
                <AboutTestimonial />
                <UpcomingCollabration />
            </Box>
        </>
    );
}