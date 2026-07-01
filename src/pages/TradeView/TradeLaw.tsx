import { Box, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function TradeLaw() {
    return (
        <Box>
            <Paper elevation={0} sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h6" align="center" fontWeight="bold" sx={{ textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', display: 'block', pb: 0.5, mx: 'auto', width: 'fit-content' }}>
                    Trade Laws
                </Typography>
            </Paper>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
                <Typography>Select a</Typography>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250 }}>
                    <MenuItem value="">Sector</MenuItem>
                </Select>
                <Typography>/more</Typography>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250 }}>
                    <MenuItem value="">Sub Sector</MenuItem>
                </Select>
                <Typography>/Department</Typography>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250 }}>
                    <MenuItem value="">Department</MenuItem>
                </Select>
            </Box>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Sr No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Department</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Act Details</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>More Details</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Useful When</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Use-Case</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4].map((row) => (
                            <TableRow key={row} sx={{ height: 60 }}>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>{row}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    Division Name
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    Statement Detail
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    Description
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                                        <li>Bulleted</li>
                                        <li>List</li>
                                    </ul>
                                </TableCell>
                                <TableCell sx={{ verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                                        <Box sx={{ width: 40, height: 24, border: '1px solid grey', borderRadius: 1, mb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Box sx={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid grey' }} />
                                        </Box>
                                        <Typography variant="caption">(video link)</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}