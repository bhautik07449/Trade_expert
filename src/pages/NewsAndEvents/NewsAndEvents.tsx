import {
    Box,
    Typography,
    Container,
    Divider,
} from "@mui/material";
import SEO from "../../component/SEO";
import Multilingual from "./Multilingual";
import PreambleAndUpcoming from "./PreambleAndUpcoming";
import { useEffect, useState } from "react";
import CountryTab from "../../commonUI/CountryTab";
import Eventsection from "../../component/Eventsection";
import NewsandeventService from "../../service/newsandevent.service";
import { toast } from "react-toastify";

export default function NewsAndEvents() {
    const [activeCountry, setActiveCountry] = useState<string>("");
    const [multilingual, setMultilingual] = useState([]);
    const [multilingualLoading, setMultilingualLoading] = useState(false);

    const getMultilingual = async (country: string) => {
        if (!country) return;

        try {
            setMultilingualLoading(true);
            const res = await NewsandeventService.getMultilingual(country);

            if (res) {
                setMultilingual(res?.data?.data || []);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
            setMultilingual([]);
        } finally {
            setMultilingualLoading(false);
        }
    };

    useEffect(() => {
        getMultilingual(activeCountry);
    }, [activeCountry]);

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
                <CountryTab activeCountry={activeCountry} setActiveCountry={setActiveCountry} />

                <Box sx={{ textAlign: "center", mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "secondary.main",
                            fontWeight: 800,
                            mb: 1,
                        }}
                    >
                        {activeCountry}
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
                    <Multilingual multilingualTiles={multilingual} loading={multilingualLoading} />
                </Box>

                <Box component="section">
                    <PreambleAndUpcoming country={activeCountry} />
                </Box>
            </Container>

            <Eventsection country={activeCountry} />
        </Box>
    );
}