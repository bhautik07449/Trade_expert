import { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container
} from "@mui/material";

export default function TradeImpoExpo() {
    const [activeTab, setActiveTab] = useState<'Regulation' | 'Policy' | 'Estimation'>('Regulation');

    const data = [
        { country: "India", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
        { country: "Canada", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
        { country: "USA", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
        { country: "India", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
        { country: "Canada", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
        { country: "USA", status: "Pending", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966", no: "5" },
    ]

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.default', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'secondary.main', textTransform: 'uppercase', mb: 1 }}>
                    Trade Regulations & Compliances
                </Typography>
            </Box>
            <Container sx={{ maxWidth: '1400px !important', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, mt: 5 }}>
                <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Button
                            variant={activeTab === 'Regulation' ? 'contained' : 'outlined'}
                            onClick={() => setActiveTab('Regulation')}
                            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 0 }}
                        >
                            Export / Import
                        </Button>
                        <Button
                            variant={activeTab === 'Policy' ? 'contained' : 'outlined'}
                            onClick={() => setActiveTab('Policy')}
                            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 0 }}
                        >
                            Policy Documents
                        </Button>
                        <Button
                            variant={activeTab === 'Estimation' ? 'contained' : 'outlined'}
                            onClick={() => setActiveTab('Estimation')}
                            sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: 0 }}
                        >
                            Estimation Control
                        </Button>
                    </Box>

                    {activeTab === 'Regulation' && (
                        <Box>
                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 0, mb: 4 }}>
                                <Table size="small">
                                    <TableBody>
                                        {data?.map((list, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>{list?.country}</TableCell>
                                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
                                                    <Box sx={{ display: 'flex', gap: 1 }}>{list?.status}</Box>
                                                </TableCell>
                                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>
                                                    {list?.description}
                                                </TableCell>
                                                <TableCell>{list?.no}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {activeTab === 'Policy' && (
                        <Box>
                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 0 }}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: '10%' }}>Sr No.</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider' }}>Policy or Compliance Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Document Guideline</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {[
                                            { id: 1, name: "Export Policy 2024", file: "export_policy_2024.pdf" },
                                            { id: 2, name: "Import Compliance Guidelines", file: "import_guidelines.pdf" },
                                            { id: 3, name: "Customs Duty Regulations", file: "customs_duty.pdf" }
                                        ].map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>{item.id}</TableCell>
                                                <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>{item.name}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', cursor: 'pointer' }}>
                                                        <Typography variant="body2" sx={{ textDecoration: 'underline' }}>{item.file}</Typography>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {activeTab === 'Estimation' && (
                        <Box>
                            <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>
                                (or if) ESTIMATION CONTROL.
                            </Typography>

                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 0 }}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: 'grey.100' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: '15%' }}>Whole Code</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: '15%' }}>Part Code</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: '10%' }}>Tax Rate</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', borderRight: '1px solid', borderColor: 'divider', width: '30%' }}>Description</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Exceptions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell rowSpan={3} sx={{ borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'top' }}>
                                                <Typography variant="body2" align="center">SE34S2W3</Typography>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>2 Digit</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>11%</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Description</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Exceptions</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>2 Digit</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>15%</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Description</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Exceptions</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>4 Dig</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>19%</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Description</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid', borderColor: 'divider' }}>Exceptions</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}