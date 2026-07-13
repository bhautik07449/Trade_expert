import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CMSservice from "../../service/cms.service";
import {
    Box,
    Container,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Button,
    Grid,
    Paper
} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RequestInfo from './RequestInfo';
import DetailInDepth from './DetailsInDepth';

export default function Dealer() {
    const location = useLocation();
    const offer = location.state?.offer;

    const [activeView, setActiveView] = useState<'cards' | 'detailInDepth' | 'requestInfo'>('cards');
    const [selectedCard, setSelectedCard] = useState<any>(null);
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

    const items = offerData?.data?.dealer || offerData?.data?.franchise || offerData?.data?.items || [];

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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 5, justifyContent: 'center' }}>
                        <Typography variant="h5" align="center" fontWeight="800" sx={{ color: 'secondary.main', px: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Become a Exclusive franchise Partner.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mb: 4 }}>
                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>Category</em></MenuItem>
                                <MenuItem value="cat1">Category 1</MenuItem>
                            </Select>
                        </FormControl>

                        <PlayArrowIcon color="action" fontSize="small" />

                        <FormControl size="small" sx={{ minWidth: 250 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>Franchise Type</em></MenuItem>
                                <MenuItem value="type1">Type 1</MenuItem>
                            </Select>
                        </FormControl>

                        <PlayArrowIcon color="action" fontSize="small" />

                        <Button
                            variant={activeView === 'detailInDepth' ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setActiveView('detailInDepth')}
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Detail In-Depth
                        </Button>

                        <PlayArrowIcon color="action" fontSize="small" />

                        <Button
                            variant={activeView === 'requestInfo' ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setActiveView('requestInfo')}
                            sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                            Request Info
                        </Button>
                    </Box>

                    <Paper variant="outlined" sx={{ p: 4, borderRadius: 2, bgcolor: 'background.default' }}>

                        {activeView === 'cards' && (
                            <Grid container spacing={4}>
                                {items.length > 0 ? items.map((card: any, index: number) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                                        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <Box sx={{
                                                height: 250,
                                                bgcolor: 'grey.100',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderBottom: '1px solid',
                                                borderColor: 'divider'
                                            }}>
                                                <Box component="img" src={card.image} alt="Event" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </Box>

                                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <Typography fontWeight="bold" sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                                                    {card.franchiseName || card.franchise_type?.franchise_type || card.franchise_type || card?.category?.name || "Franchise"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider', textAlign: 'center', flex: 1 }}>
                                                    Details In-Depth
                                                </Typography>
                                                <Button
                                                    fullWidth
                                                    sx={{ py: 1.5, textTransform: 'none', borderRadius: 0, fontWeight: 'bold' }}
                                                    onClick={() => {
                                                        setSelectedCard(card);
                                                        setActiveView('detailInDepth');
                                                    }}
                                                >
                                                    More Info
                                                </Button>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )) : (
                                    <Grid size={{ xs: 12 }}>
                                        <Typography align="center" color="text.secondary">No items found.</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )}

                        {activeView === 'detailInDepth' && (
                            <DetailInDepth setActiveView={setActiveView} card={selectedCard} />
                        )}

                        {activeView === 'requestInfo' && (
                            <RequestInfo setActiveView={setActiveView} card={selectedCard} />
                        )}

                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}