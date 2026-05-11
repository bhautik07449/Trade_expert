import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { category } = useParams();
    
    return (
        <Box>
            <h1>Category Page {category}</h1>
        </Box>
    )
}