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

export default function Home() {
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
            <SEO
                title="Tradexpert - Global Market Insights & Trade Opportunities"
                description="Tradexpert: Your Global Intelligence Hub. Explore real-time trade analytics, B2B spot markets, upcoming seasonal products, and verified supplier connections worldwide."
                keywords="B2B, marketplace, spot market, trade analytics, export, import, wholesale, suppliers, buyers, seasonal products, trade intelligence"
            />

            <Box>
                <InteractiveWorldMap />
                <Analytical analyticsData={analyticsData} loading={loading} />
                <Events />
                <OurProcess />
                <Values />
                <AboutTestimonial />
            </Box>
        </>
    );
}