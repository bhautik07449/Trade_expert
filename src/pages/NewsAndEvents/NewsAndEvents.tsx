import {
    Box,
    Typography,
    Divider,
} from "@mui/material";
import Multilingual from "./Multilingual";
import PreambleAndUpcoming from "./PreambleAndUpcoming";
import { useEffect, useState } from "react";
import Eventsection from "../../component/Eventsection";
import NewsandeventService from "../../service/newsandevent.service";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCountry } from "../../store/slice/countrySlice";

export default function NewsAndEvents() {
    const activeCountry = useSelector((state: any) => state.country.selectedCountry) || "India";
    const dispatch = useDispatch();
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
            <PageMainLayout image="https://sourceseas.itcoders.in/img/front-end/csr-2.jpg" title="News & Events" slug="news_and_events" country={true} activeCountry={activeCountry} setActiveCountry={(c: string) => dispatch(setSelectedCountry(c))} />

            <Box
                sx={{
                    maxWidth: "1400px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 }
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
            </Box>

            <Eventsection country={activeCountry} />
        </Box>
    );
}