import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../commonUI/ImageSlider"
import CategoryTab from "../../component/Home/CaterogyTab"
import Analytical from "../../component/Home/Analytical"
import ProductListByCountry from "../../component/Home/ProductListByCountry"
import TradeHistory from "../../component/Home/TradeHistory"

const tab = [
    {
        value: "Go to ABC",
        button: "ABC",
        link: "/abc",
    },
    {
        value: "Go to Trade Offer",
        button: "Trade Offer",
        link: "/trade-offers",
    },
];

export default function CountryPage() {
    const { country } = useParams()
    const navigate = useNavigate();

    return (
        <Box>
            <ImageSlider />
            <CategoryTab />
            <ProductListByCountry />
            <TradeHistory />
            <Analytical />

            <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff" }}>
                <Container sx={{ maxWidth: "1200px", mx: "auto" }}>
                    <Grid container spacing={4}>
                        {tab.map((item, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                <Box
                                    sx={{
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 3,
                                        p: { xs: 4, md: 6 },
                                        textAlign: "center",
                                        transition: "0.3s",
                                        "&:hover": {
                                            boxShadow: 4,
                                        },
                                    }}
                                >
                                    <Box mb={4}>
                                        <Typography
                                            component="span"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: {
                                                    xs: "18px",
                                                    md: "22px",
                                                },
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        fullWidth={true}
                                        sx={{
                                            bgcolor: "#f4a024",
                                            py: 1.3,
                                            fontSize: {
                                                xs: "14px",
                                                md: "16px",
                                            },
                                            textTransform: "none",
                                            "&:hover": {
                                                bgcolor: "#e0931f",
                                            },
                                        }}
                                        onClick={() => navigate(item.link)}
                                    >
                                        {item.button}
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}