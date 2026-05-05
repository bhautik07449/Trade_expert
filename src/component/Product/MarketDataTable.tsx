import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    useTheme,
    alpha,
} from "@mui/material";

interface MarketDetail {
    id: number;
    country: string;
    quality: string;
    rate: string;
    packing: string;
    delivery: string;
    categoryType: string;
    noOfPacking: string;
}

interface DMR {
    id: number;
    name: string;
    market: MarketDetail[];
}

interface MarketDataTableProps {
    dmrs: DMR[];
}

const MarketDataTable = ({ dmrs }: MarketDataTableProps) => {
    const theme = useTheme();

    if (!dmrs || dmrs.length === 0) return null;

    // Flatten all market details into a single array
    const allMarketData = dmrs.flatMap((dmr) =>
        dmr.market.map((item) => ({
            ...item,
            reportName: dmr.name,
        }))
    );

    if (allMarketData.length === 0) return null;

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    "&::after": {
                        content: '""',
                        flex: 1,
                        height: "2px",
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        ml: 2,
                    },
                }}
            >
                Market Data Summary
            </Typography>

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.05)}`,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.background.paper,
                        0.9
                    )} 0%, ${theme.palette.background.paper} 100%)`,
                    backdropFilter: "blur(10px)",
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow
                            sx={{
                                background: `linear-gradient(90deg, ${alpha(
                                    theme.palette.primary.main,
                                    0.05
                                )} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                            }}
                        >
                            {[
                                "Report",
                                "Country",
                                "Quality",
                                "Rate",
                                "Packing",
                                "Delivery",
                                "Category Type",
                                "No. of Packing",
                            ].map((head) => (
                                <TableCell
                                    key={head}
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        py: 2.5,
                                        borderBottom: `2px solid ${alpha(
                                            theme.palette.primary.main,
                                            0.1
                                        )}`,
                                    }}
                                >
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allMarketData.map((item, index) => (
                            <TableRow
                                key={item.id || index}
                                sx={{
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: alpha(theme.palette.primary.main, 0.02),
                                        transform: "translateY(-1px)",
                                        boxShadow: `0 4px 12px ${alpha(
                                            theme.palette.common.black,
                                            0.03
                                        )}`,
                                    },
                                    "&:last-child td, &:last-child th": { border: 0 },
                                }}
                            >
                                <TableCell sx={{ py: 2, color: "text.secondary", fontSize: "0.85rem" }}>
                                    {item.reportName}
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>{item.country}</TableCell>
                                <TableCell sx={{ py: 2 }}>{item.quality}</TableCell>
                                <TableCell
                                    sx={{
                                        py: 2,
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    {item.rate}
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>{item.packing}</TableCell>
                                <TableCell sx={{ py: 2 }}>{item.delivery}</TableCell>
                                <TableCell sx={{ py: 2 }}>{item.categoryType}</TableCell>
                                <TableCell sx={{ py: 2 }}>{item.noOfPacking}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default MarketDataTable;
