import {
    Box,
    Typography,
    Container,
    Divider,
} from "@mui/material";
import SEO from "../../component/SEO";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Multilingual from "./Multilingual";
import Events from "../../component/Home/Events";
import PreambleAndUpcoming from "./PreambleAndUpcoming";

export default function NewsAndEvents() {

    const selectedCountry = useSelector(
        (state: RootState) => state.country.selectedCountry
    );

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
            }}
        >
            <SEO
                title="News & Events - SourceSeas"
                description="Stay updated with the latest news, events, and updates in the world of international trade and sourcing."
                keywords="trade news, market updates, trade events, import policy, export regulations, sourcing news"
            />

            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, sm: 260, md: 340 },
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box
                    component="img"
                    src="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg"
                    alt="Supplier Banner"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 2,
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: { xs: "28px", sm: "38px", md: "48px" },
                            }}
                        >
                            News & Events
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Container
                sx={{
                    maxWidth: "1200px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 4, md: 6 },
                }}
            >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "secondary.main",
                            fontWeight: 800,
                            mb: 1,
                        }}
                    >
                        {selectedCountry}
                    </Typography>

                    <Divider
                        sx={{
                            width: 120,
                            mx: "auto",
                            borderColor: "primary.main",
                            borderBottomWidth: 2,
                        }}
                    />
                </Box>

                <Box component="section">
                    <Multilingual />
                </Box>

                <Box component="section">
                    <PreambleAndUpcoming />
                </Box>
            </Container>

            <Events />
        </Box>
    );
}