import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ImageSlider from "../../commonUI/ImageSlider";
import SpotMarketTable from "../../commonUI/spotMarket";
import ProductOverView from "../../component/Home/ProductOverView";
import OverViewContent from "../../component/Home/OverViewContent";

export default function CategoryPage() {
    const { category } = useParams();

    return (
        <Box>
            <ImageSlider />
            <OverViewContent />
            <SpotMarketTable />
            <ProductOverView />
        </Box>
    )
}