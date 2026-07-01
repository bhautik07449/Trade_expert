import { Box, Button, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function TradeCompliance({ activeTab }: any) {
    const navigate = useNavigate()

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 4, textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', display: 'block', pb: 0.5, mx: 'auto', width: 'fit-content' }}>
                    {activeTab} Finder
                </Typography>
            </Paper>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={4}>
                <Typography fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
                    Enter HSN Code -
                </Typography>
                <TextField
                    size="small"
                    variant="outlined"
                    sx={{ minWidth: 200, bgcolor: 'white' }}
                />
                <Typography fontWeight="bold" sx={{ color: 'text.secondary' }}>
                    or
                </Typography>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Description"
                    sx={{ flex: 1, minWidth: 200, bgcolor: 'white' }}
                />
                <Button variant="outlined" sx={{ minWidth: 'auto', p: 1 }}>
                    <SearchIcon />
                </Button>
                <Button variant="outlined" sx={{ minWidth: 'auto', p: 1, fontWeight: 'bold' }}>
                    RESET
                </Button>
            </Stack>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>SR No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>HSN Code</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Country Selector</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3].map((row) => (
                            <TableRow key={row}>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    {row}
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        CAR124
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    <Typography variant="body2" fontWeight="500">Main Name</Typography>
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="caption" color="text.secondary">CAR12433</Typography>
                                        </Box>
                                        <Typography variant="body2">Description</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Select size="small" defaultValue="" sx={{ minWidth: 100, height: 32, mb: 1 }}>
                                            <MenuItem value=""><em>Select</em></MenuItem>
                                        </Select>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ verticalAlign: 'top' }}>
                                    <Stack spacing={1}>
                                        <Button variant="outlined" size="small" onClick={() => navigate('/trade-view/impo-expo')} sx={{ borderRadius: 6, textTransform: 'none' }}>Import</Button>
                                        <Typography variant="caption" align="center">or</Typography>
                                        <Button variant="outlined" size="small" onClick={() => navigate('/trade-view/impo-expo')} sx={{ borderRadius: 6, textTransform: 'none' }}>Export</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}