import { useState } from "react";
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
    CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import CMSservice from "../service/cms.service";
import { toast } from "react-toastify";

export default function Tradeoffer() {
    const [selectedOffer, setSelectedOffer] = useState();
    const [stockLots, setStockLots] = useState<any[]>([]);
    const [stockLotsId, setStockLotsId] = useState<any>();
    const [stockLotsData, setStockLotsData] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTradeOffer = async () => {
            setLoading(true);
            try {
                const res = await CMSservice.getTradeOffer();
                if (res) {
                    setStockLots(res?.data?.data);
                    setSelectedOffer(res?.data?.data[0]?.trade_type?.name)
                    setStockLotsId(res?.data?.data[0]?.id)
                }
            } catch (error) {
                toast.error("something went wrong")
            } finally {
                setLoading(false);
            }
        }
        getTradeOffer();
    }, []);

    useEffect(() => {
        const getStockLotsById = async (id: string) => {
            setLoading(true);
            try {
                const res = await CMSservice.getStocklots(id);
                if (res) {
                    setStockLotsData(res?.data);
                }
            } catch (error) {
                toast.error("something went wrong")
            } finally {
                setLoading(false);
            }
        }
        if (stockLotsId) {
            getStockLotsById(stockLotsId);
        }
    }, [stockLotsId]);

    return (
        <Box sx={{ bgcolor: "white", minHeight: "100vh", pb: 8 }}>
            <Box
                component="img"
                src="https://sourceseas.itcoders.in/img/front-end/quality.jpg"
                alt="Quality Policies"
                sx={{
                    width: "100%",
                    height: { xs: "200px", md: "300px" },
                    objectFit: "cover",
                }}
            />
            <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Grid container spacing={2} justifyContent="center">
                    {stockLots.map((text, i) => (
                        <Grid key={i}>
                            <Button
                                variant={selectedOffer === text?.trade_type?.name ? "contained" : "outlined"}
                                onClick={() => {
                                    setSelectedOffer(text?.trade_type?.name);
                                    setStockLotsId(text?.id)
                                }}
                                sx={{
                                    borderColor: "black",
                                    color: selectedOffer === text?.trade_type?.name ? "white" : "black",
                                    bgcolor: selectedOffer === text?.trade_type?.name ? "#5a3e2b" : "transparent",
                                    fontSize: "12px",
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                {text?.trade_type?.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                        <CircularProgress sx={{ color: "#5a3e2b" }} />
                    </Box>
                ) : stockLotsData?.data?.items?.length > 0 ? (
                    stockLotsData?.data?.items?.map((item: any) => (
                        <Box
                            key={item.id}
                            sx={{
                                border: "1px solid #ccc",
                                p: 3,
                                bgcolor: "white",
                                overflowX: "auto",
                                mb: 3
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 700, textAlign: "center" }}
                            >
                                {item?.category?.name}
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
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
                                        <TableCell><img src={item?.product?.images[0]} alt={item?.product?.name} style={{ width: '50px', height: '50px' }} /></TableCell>
                                        <TableCell>{item?.product?.name}</TableCell>
                                        <TableCell>{item?.hsncode}</TableCell>
                                        <TableCell>{item?.quantity}</TableCell>
                                        <TableCell>{item?.unit_measurement}</TableCell>
                                        <TableCell>{item?.packing_configure}</TableCell>
                                        <TableCell>₹{item?.actual_price}</TableCell>
                                        <TableCell>₹{item?.discounted_price}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    ))
                ) : (
                    <Box
                        sx={{
                            border: "1px solid #ccc",
                            p: 3,
                            bgcolor: "white",
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            {selectedOffer}
                        </Typography>

                        <Typography sx={{ fontSize: "14px", color: "#555" }}>
                            {stockLotsData?.tradeoffer?.description}
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
}