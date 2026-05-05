import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect } from "react";
import CMSservice from "../service/cms.service";
import { toast } from "react-toastify";

export default function Tradeoffer() {
    const [selectedOffer, setSelectedOffer] = useState();
    const [stockLots, setStockLots] = useState<any[]>([]);
    const [stockLotsId, setStockLotsId] = useState<any>();
    const [stockLotsData, setStockLotsData] = useState<any>();

    const getTradeOffer = async () => {
        try {
            const res = await CMSservice.getTradeOffer();
            if (res) {
                setStockLots(res?.data?.data);
                setSelectedOffer(res?.data?.data[0]?.name)
                setStockLotsId(res?.data?.data[0]?.id)
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        getTradeOffer();
    }, []);

    const getStockLotsById = async (id: string) => {
        try {
            const res = await CMSservice.getStocklots(id);
            if (res) {
                setStockLotsData(res?.data?.data);
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
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
                                variant={selectedOffer === text?.name ? "contained" : "outlined"}
                                onClick={() => {
                                    setSelectedOffer(text?.name);
                                    setStockLotsId(text?.id)
                                }}
                                sx={{
                                    borderColor: "black",
                                    color: selectedOffer === text?.name ? "white" : "black",
                                    bgcolor: selectedOffer === text?.name ? "#5a3e2b" : "transparent",
                                    fontSize: "12px",
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                {text?.name}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Container maxWidth="lg" sx={{ mt: 5 }}>
                {stockLotsData?.category?.length > 0 || stockLotsData?.product?.length > 0 ? (
                    <Box
                        sx={{
                            border: "1px solid #ccc",
                            p: 3,
                            bgcolor: "white",
                            overflowX: "auto",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, textAlign: "center" }}
                        >
                            Category
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}
                        >
                            Sub Category
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
                                    <TableCell>Image</TableCell>
                                    <TableCell>Sample Product</TableCell>
                                    <TableCell>1234</TableCell>
                                    <TableCell>100</TableCell>
                                    <TableCell>PCS</TableCell>
                                    <TableCell>10 x Box</TableCell>
                                    <TableCell>₹500</TableCell>
                                    <TableCell>₹350</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Box>
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
                            With Sourceseas overseas Pvt. Ltd., our affiliate can grow and
                            nurture entrepreneurship skills and achieve success. No collateral
                            or investment required. Work anytime and earn comfortably.
                        </Typography>
                    </Box>
                )}
            </Container>

            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Box sx={{ bgcolor: "white", p: 4 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />

                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#5a3e2b",
                                px: 4,
                                "&:hover": { bgcolor: "#4a3324" },
                            }}
                        >
                            Submit your interest
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}