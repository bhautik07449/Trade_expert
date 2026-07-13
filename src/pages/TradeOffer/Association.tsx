import {
    Box,
    Typography,
    Divider,
    FormControl,
    Select,
    MenuItem,
    Paper,
    Button,
    Chip,
    Avatar,
    Container,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import CMSservice from "../../service/cms.service";

export default function Association() {
    const navigate = useNavigate();
    const location = useLocation();
    const offer = location.state?.offer;

    const [detailLoading, setDetailLoading] = useState(false);
    const [offerData, setOfferData] = useState<any>(null);

    useEffect(() => {
        if (offer?.id) {
            getOfferDataById(offer.id);
        }
    }, [offer?.id]);

    const getOfferDataById = async (id: number | string) => {
        setDetailLoading(true);
        setOfferData(null);
        try {
            const res = await CMSservice.getStocklots(id);
            if (res) {
                setOfferData(res?.data);
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            setDetailLoading(false);
        }
    };

    const items = offerData?.data?.association || offerData?.data?.items || [];

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
                <Box sx={{ width: '100%', bgcolor: 'background.paper', p: { xs: 2, md: 4 }, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="h5" align="center" fontWeight="800" gutterBottom sx={{ color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Join HAND for Joint-Venture Association
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
                        Featured with coverage on.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 3 }, flexWrap: 'wrap', mb: 3 }}>
                        <Paper variant="outlined" sx={{ px: 3, py: 1.5, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark', borderColor: 'primary.main', fontWeight: 'bold' }}>
                            Available to-TALK
                        </Paper>
                        <Paper variant="outlined" sx={{ px: 3, py: 1.5, borderRadius: 2, bgcolor: 'grey.100', color: 'text.primary', borderColor: 'divider', fontWeight: 'bold' }}>
                            In-Negotiation
                        </Paper>
                        <Paper variant="outlined" sx={{ px: 3, py: 1.5, borderRadius: 2, bgcolor: 'success.light', color: 'success.dark', borderColor: 'success.main', fontWeight: 'bold' }}>
                            Successfully-Ventured
                        </Paper>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>State</em></MenuItem>
                                <MenuItem value="state1">State 1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>City</em></MenuItem>
                                <MenuItem value="city1">City 1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>Company Type</em></MenuItem>
                                <MenuItem value="type1">Type 1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>Opportunity</em></MenuItem>
                                <MenuItem value="opp1">Opportunity 1</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                        {items.length > 0 ? items.map((item: any, index: number) => (
                            <Paper
                                key={item.id}
                                elevation={0}
                                sx={{
                                    p: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: 3
                                }}
                            >
                                <Box sx={{ width: { xs: '100%', sm: 120 }, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                                    {item.association_image || item.image ? (
                                        <Box component="img" src={item.association_image || item.image} alt="Association" sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2 }} />
                                    ) : (
                                        <Avatar variant="rounded" sx={{ width: 120, height: 120, bgcolor: 'grey.200', color: 'grey.500' }}>
                                            <ImageIcon fontSize="large" />
                                        </Avatar>
                                    )}
                                </Box>

                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Typography variant="h6" fontWeight="bold">
                                            {item.company_name || "Company Name"}
                                        </Typography>
                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={item.status === 'Active' ? 'success' : 'warning'}
                                            sx={{ fontWeight: 'bold' }}
                                        />
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }} dangerouslySetInnerHTML={{ __html: item.details || item.description || '' }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => navigate('/trade-offers/association/initiative', { state: { card: item } })}
                                            sx={{ borderRadius: 6, px: 3, textTransform: 'none', fontWeight: 'bold' }}
                                        >
                                            Take further Initiative
                                        </Button>
                                        <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 'bold' }}>
                                            (Read more &#9662;)
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        )) : (
                            <Typography align="center" color="text.secondary">No items found.</Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}