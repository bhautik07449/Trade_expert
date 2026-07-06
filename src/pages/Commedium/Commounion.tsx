import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Commounion() {
    return (
        <Box>
            <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>
                COMM / UNION
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 4 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: 120 }}>TREND SELECTOR.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>A B C</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>D E F</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>G H I</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>J K L</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', textAlign: 'center' }}>M N O</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <TableRow key={row} sx={{ height: 40 }}>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider', py: 0.5 }}>
                                    <PlayArrowIcon color="primary" fontSize="small" />
                                </TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}