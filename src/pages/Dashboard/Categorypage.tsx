import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../commonUI/ImageSlider";
import SpotMarketTable from "../../commonUI/spotMarket";
import ProductOverView from "../../component/Home/ProductOverView";
import OverViewContent from "../../component/Home/OverViewContent";
import { useEffect, useState } from "react";
import HomePageservice from "../../service/homepages.service";

export default function CategoryPage() {
    const { category } = useParams();

    const [slides, setSlides] = useState<any[]>([])
    const [imageLoading, setImageLoading] = useState(true)

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

    return (
        <Box>
            <ImageSlider slides={slides} loading={imageLoading} />
            <OverViewContent />
            <SpotMarketTable />
            <ProductOverView />
        </Box>
    )
}