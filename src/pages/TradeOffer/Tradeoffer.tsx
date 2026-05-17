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
    Skeleton,
} from "@mui/material";
import { useEffect } from "react";
import CMSservice from "../../service/cms.service";
import { toast } from "react-toastify";
import SEO from "../../component/SEO";
import { useSearchParams } from "react-router-dom";

export default function Tradeoffer() {
    const [searchParams] = useSearchParams();
    const country = searchParams.get("country");

    const [selectedOffer, setSelectedOffer] = useState();
    const [stockLots, setStockLots] = useState<any[]>([]);
    const [stockLotsId, setStockLotsId] = useState<any>();
    const [stockLotsData, setStockLotsData] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getTradeOffer = async (country: string) => {
            setLoading(true);
            try {
                const res = await CMSservice.getTradeOffer(country);
                if (res) {
                    setStockLots(res?.data?.data);
                    setSelectedOffer(res?.data?.data[0]?.trade_type?.name)
                    setStockLotsId(res?.data?.data[0]?.id)
                }
            } catch (error: any) {
                console.log(error?.response?.data?.message, "something went wrong")
            } finally {
                setLoading(false);
            }
        }

        if (country) {
            getTradeOffer(country);
        }

    }, [country]);

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
            <SEO
                title="Trade Offers - Tradexpert"
                description="Explore the latest trade offers and stock lots on Tradexpert."
            />
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
            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, pt: 4 }}>
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

            <Container sx={{ maxWidth: "1200px !important", mx: "auto", px: { xs: 2, sm: 3, md: 4 }, mt: 5 }}>
                {loading ? (
                    <Box sx={{ py: 2 }}>
                        {Array.from(new Array(2)).map((_, i) => (
                            <Box key={i} sx={{ border: "1px solid #ccc", p: 3, bgcolor: "white", mb: 3 }}>
                                <Skeleton variant="rectangular" width="40%" height={32} sx={{ mx: "auto", mb: 2 }} />
                                <Skeleton variant="rectangular" width="30%" height={24} sx={{ mx: "auto", mb: 3 }} />
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {Array.from(new Array(8)).map((_, j) => (
                                                <TableCell key={j}><Skeleton variant="text" /></TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            {Array.from(new Array(8)).map((_, j) => (
                                                <TableCell key={j}><Skeleton variant="rectangular" height={40} /></TableCell>
                                            ))}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        ))}
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