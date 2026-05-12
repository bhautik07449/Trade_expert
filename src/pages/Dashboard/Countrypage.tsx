import { Box, Button, Container, Grid, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import ImageSlider from "../../commonUI/ImageSlider"
import CategoryTab from "../../component/Home/CaterogyTab"
import Analytical from "../../component/Home/Analytical"
import ProductListByCountry from "../../component/Home/ProductListByCountry"
import TradeHistory from "../../component/Home/TradeHistory"
import SEO from "../../component/SEO"

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
    console.log("country", country);
    const navigate = useNavigate();
    const displayCountry = country ? decodeURIComponent(country) : "Global";

    return (
        <Box component="main">
            <SEO
                title={`Tradexpert - Trade Opportunities in ${displayCountry}`}
                description={`Explore verified B2B spot markets, seasonal export products, trade history, and real-time business opportunities tailored for ${displayCountry} on Tradexpert.`}
                keywords={`B2B, marketplace, ${displayCountry}, trade, export, import, wholesale, suppliers`}
            />

            <ImageSlider />

            <Box component="section">
                <CategoryTab />
            </Box>

            <Box component="section">
                <ProductListByCountry country={displayCountry} />
            </Box>

            <Box component="section">
                <TradeHistory />
            </Box>

            <Box component="section">
                <Analytical />
            </Box>

            <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#f8fafc" }}>
                <Container sx={{ maxWidth: "1200px", mx: "auto" }}>
                    <Grid container spacing={4}>
                        {tab.map((item, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={index}>
                                <Box
                                    sx={{
                                        border: "1px solid",
                                        borderColor: "rgba(0, 0, 0, 0.08)",
                                        borderRadius: 3,
                                        p: { xs: 4, md: 6 },
                                        textAlign: "center",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        background: "#ffffff",
                                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                                        position: "relative",
                                        overflow: "hidden",
                                        "&:hover": {
                                            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                                            transform: "translateY(-4px)",
                                            borderColor: "#f4a024",
                                        },
                                    }}
                                >
                                    {/* Subtle accent top border line */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "4px",
                                            background: index === 0 ? "linear-gradient(to right, #f4a024, #e0931f)" : "linear-gradient(to right, #1976d2, #1565c0)",
                                            opacity: 0.8,
                                        }}
                                    />

                                    <Box mb={4} mt={1}>
                                        <Typography
                                            component="h3"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#1e293b",
                                                fontSize: {
                                                    xs: "1.2rem",
                                                    md: "1.4rem",
                                                },
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>

                                    <Button
                                        id={`country-action-btn-${index}`}
                                        variant="contained"
                                        fullWidth={true}
                                        sx={{
                                            bgcolor: index === 0 ? "#f4a024" : "#1e293b",
                                            color: "#fff",
                                            fontWeight: 600,
                                            py: 1.5,
                                            borderRadius: 2,
                                            boxShadow: index === 0 ? "0 4px 12px rgba(244, 160, 36, 0.25)" : "0 4px 12px rgba(30, 41, 59, 0.25)",
                                            fontSize: {
                                                xs: "0.95rem",
                                                md: "1.05rem",
                                            },
                                            textTransform: "none",
                                            "&:hover": {
                                                bgcolor: index === 0 ? "#e0931f" : "#0f172a",
                                                boxShadow: index === 0 ? "0 6px 16px rgba(244, 160, 36, 0.35)" : "0 6px 16px rgba(30, 41, 59, 0.35)",
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