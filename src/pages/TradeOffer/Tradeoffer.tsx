import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Skeleton,
    Paper,
} from "@mui/material";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";
import PageMainLayout from "../../commonUI/PageMainLayout";
import { getImageUrl } from "../../utils/imageUtils";

export default function Tradeoffer() {
    const selectedCountry = useSelector((state: any) => state.country.selectedCountry);

    const [stockLots, setStockLots] = useState<any[]>([]);
    const [selectedOfferId, setSelectedOfferId] = useState<number | string>("");
    const [selectedOfferName, setSelectedOfferName] = useState("");
    const [stockLotsData, setStockLotsData] = useState<any>(null);

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

            if (data.length > 0) {
                const firstOffer = data[0];

                setSelectedOfferId(firstOffer?.id);
                setSelectedOfferName(firstOffer?.trade_type?.name || "");
            }
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
        setSelectedOfferId(offer?.id);
        setSelectedOfferName(offer?.trade_type?.name || "");
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
                        ) : stockLots.length > 0 ? (
                            stockLots.map((offer) => {
                                const isActive = selectedOfferId === offer?.id;

                                return (
                                    <Grid key={offer?.id}>
                                        <Button
                                            variant={isActive ? "contained" : "outlined"}
                                            onClick={() => handleOfferSelect(offer)}
                                            sx={{
                                                borderColor: "primary.main",
                                                color: isActive ? "#fff" : "primary.dark",
                                                bgcolor: isActive ? "primary.main" : "transparent",
                                                fontSize: "12px",
                                                px: 2,
                                                py: 1,
                                                fontWeight: 700,
                                                "&:hover": {
                                                    bgcolor: isActive
                                                        ? "primary.dark"
                                                        : "primary.light",
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
                            <Grid size={{ xs: 12 }} sx={{ textAlign: "center", py: 2 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No Trade Offers Found
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Box>

            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    mt: 5,
                }}
            >
                {detailLoading ? (
                    <Box sx={{ py: 2 }}>
                        {Array.from(new Array(2)).map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    border: "1px solid",
                                    borderColor: "divider",
                                    p: 3,
                                    bgcolor: "background.paper",
                                    mb: 3,
                                    borderRadius: 3,
                                }}
                            >
                                <Skeleton
                                    variant="rectangular"
                                    width="40%"
                                    height={32}
                                    sx={{ mx: "auto", mb: 2 }}
                                />
                                <Skeleton
                                    variant="rectangular"
                                    width="30%"
                                    height={24}
                                    sx={{ mx: "auto", mb: 3 }}
                                />

                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Array.from(new Array(8)).map((_, j) => (
                                                <TableCell key={j}>
                                                    <Skeleton variant="text" />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <TableRow>
                                            {Array.from(new Array(8)).map((_, j) => (
                                                <TableCell key={j}>
                                                    <Skeleton variant="rectangular" height={40} />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        ))}
                    </Box>
                ) : stockLotsData?.data?.items?.length > 0 ? (
                    stockLotsData.data.items.map((item: any) => (
                        <Paper
                            key={item.id}
                            elevation={0}
                            sx={{
                                border: "1px solid",
                                borderColor: "divider",
                                p: { xs: 2, md: 3 },
                                bgcolor: "background.paper",
                                overflowX: "auto",
                                mb: 3,
                                borderRadius: 3,
                                boxShadow: "0 10px 30px rgba(59,48,39,0.06)",
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    textAlign: "center",
                                    color: "secondary.main",
                                }}
                            >
                                {item?.category?.name}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 700,
                                    mb: 3,
                                    textAlign: "center",
                                    color: "text.secondary",
                                }}
                            >
                                {item?.subCategory?.name}
                            </Typography>

                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>HSN Code</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Unit Measure</TableCell>
                                        <TableCell>Packing Config</TableCell>
                                        <TableCell>Actual Price</TableCell>
                                        <TableCell>Discounted Price</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box
                                                component="img"
                                                src={getImageUrl(item?.product?.images?.[0])}
                                                alt={item?.product?.name}
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    objectFit: "contain",
                                                    bgcolor: "background.default",
                                                    borderRadius: 1,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>{item?.product?.name || "-"}</TableCell>
                                        <TableCell>{item?.hsncode || "-"}</TableCell>
                                        <TableCell>{item?.quantity || "-"}</TableCell>
                                        <TableCell>{item?.unit_measurement || "-"}</TableCell>
                                        <TableCell>{item?.packing_configure || "-"}</TableCell>
                                        <TableCell>₹{item?.actual_price || "-"}</TableCell>
                                        <TableCell>₹{item?.discounted_price || "-"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    ))
                ) : (
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
                            {selectedOfferName || "No Trade Offer Selected"}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "16px",
                                color: "text.secondary",
                                mb: 3,
                            }}
                        >
                            {stockLotsData?.tradeoffer?.description ||
                                "No data found for this offer at the moment."}
                        </Typography>
                    </Paper>
                )}
            </Container>
        </Box>
    );
}