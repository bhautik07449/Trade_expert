import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Skeleton,
    Paper,
    Container,
} from "@mui/material";
import { getImageUrl } from "../../utils/imageUtils";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CMSservice from "../../service/cms.service";

export default function Stocklots() {
    const location = useLocation();
    const offer = location.state?.offer;
    const selectedOfferName = offer?.trade_type?.name;

    const [detailLoading, setDetailLoading] = useState(false);
    const [stockLotsData, setStockLotsData] = useState<any>(null);

    useEffect(() => {
        if (offer?.id) {
            getStockLotsById(offer.id);
        }
    }, [offer?.id]);

    const getStockLotsById = async (id: number | string) => {
        setDetailLoading(true);
        setStockLotsData(null);

        try {
            const res = await CMSservice.getStocklots(id);

            if (res) {
                setStockLotsData(res?.data);
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setDetailLoading(false);
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
            <Container
                sx={{
                    maxWidth: "1400px !important",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    mt: 5,
                }}
            >
                <Box>
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
                    ) : stockLotsData?.data?.items?.length > 0 ? ((Array.isArray(stockLotsData.data.items) ? stockLotsData.data.items : []).map((item: any) => (
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
                </Box>
            </Container>
        </Box>
    )
}