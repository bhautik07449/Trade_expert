import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Skeleton,
    Paper,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";
import NoDataFound from "../../commonUI/NoDataFound";
import Stocklots from "./Stocklots";
import Dealer from "./Dealer";
import Tender from "./Tender";
import Association from "./Association";

export default function Tradeoffer() {
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const [stockLots, setStockLots] = useState<any[]>([]);
    const [selectedOfferId, setSelectedOfferId] = useState<number | string>("");
    const [selectedOfferName, setSelectedOfferName] = useState("");
    const [stockLotsData, setStockLotsData] = useState<any>(null);
    const navigate = useNavigate();

    const [offerLoading, setOfferLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    const getTradeOffer = async (country: string) => {
        setOfferLoading(true);
        setStockLots([]);
        setStockLotsData(null);
        setSelectedOfferId("");
        setSelectedOfferName("");

        try {
            const res = await CMSservice.getTradeOffer(country);
            const data = res?.data?.data || [];

            setStockLots(data);
        } catch (error: any) {
            console.log(error?.response?.data?.message || "Something went wrong");
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setOfferLoading(false);
        }
    };

    const getStockLotsById = async (id: number | string) => {
        setDetailLoading(true);
        setStockLotsData(null);

        try {
            const res = await CMSservice.getStocklots(id);

            if (res) {
                setStockLotsData(res?.data);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            setDetailLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCountry) {
            getTradeOffer(selectedCountry);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedOfferId) {
            getStockLotsById(selectedOfferId);
        }
    }, [selectedOfferId]);

    const handleOfferSelect = (offer: any) => {
        const name = offer?.trade_type?.name || "";
        const lowerName = name.toLowerCase();

        if (lowerName.includes("dealer")) {
            navigate("/trade-offers/dealer", { state: { offer } });
        } else if (lowerName.includes("tender")) {
            navigate("/trade-offers/tender", { state: { offer } });
        } else if (lowerName.includes("association") || lowerName.includes("joint")) {
            navigate("/trade-offers/association", { state: { offer } });
        } else if (lowerName.includes("stock")) {
            navigate("/trade-offers/stocklots", { state: { offer } });
        } else {
            navigate("/trade-offers/stocklots", { state: { offer } });
        }
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                pb: { xs: 6, md: 10 },
            }}
        >
            <PageMainLayout
                title="Trade Offer"
                image="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                slug="trade_offer"
                activeCountry=""
                setActiveCountry={() => { }}
            />

                <Box
                    sx={{
                        maxWidth: "1400px !important",
                        mx: "auto",
                        px: { xs: 2, sm: 3, md: 4 },
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 4,
                            p: { xs: 2.5, sm: 3, md: 4 },
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "0 18px 45px rgba(12, 10, 7, 0.08)",
                        }}
                    >
                        <Grid container spacing={2} justifyContent="center">
                            {offerLoading ? (
                                Array.from(new Array(4)).map((_, i) => (
                                    <Grid key={i}>
                                        <Skeleton
                                            variant="rectangular"
                                            width={120}
                                            height={36}
                                            sx={{ borderRadius: 1 }}
                                        />
                                    </Grid>
                                ))
                            ) : stockLots.length > 0 ? ((Array.isArray(stockLots) ? stockLots : []).map((offer) => {
                                return (
                                    <Grid key={offer?.id}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleOfferSelect(offer)}
                                            sx={{
                                                borderColor: "primary.main",
                                                color: "primary.dark",
                                                bgcolor: "transparent",
                                                fontSize: "12px",
                                                px: 2,
                                                py: 1,
                                                fontWeight: 700,
                                                "&:hover": {
                                                    bgcolor: "primary.light",
                                                    borderColor: "primary.dark",
                                                },
                                            }}
                                        >
                                            {offer?.trade_type?.name}
                                        </Button>
                                    </Grid>
                                );
                            })
                            ) : (
                                <Grid size={{ xs: 12 }}>
                                    <NoDataFound message="No Trade Offers Found" />
                                </Grid>
                            )}
                        </Grid>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            p: 5,
                            bgcolor: "background.paper",
                            textAlign: "center",
                            borderRadius: 3,
                            boxShadow: "0 10px 30px rgba(59,48,39,0.06)",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: "secondary.main",
                            }}
                        >
                            Select a Trade Offer above to view details
                        </Typography>
                    </Paper>
                </Box>
        </Box>
    );
}