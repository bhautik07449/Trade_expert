import { Container } from "@mui/material";
import {
    Box,
    Typography,
    Grid,
    Divider,
    FormControl,
    Select,
    MenuItem,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import CMSservice from "../../service/cms.service";

export default function Tender() {
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

    const items = offerData?.data?.tender || offerData?.data?.items || [];

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
                        Become A Provider-ELECT - WIN A TENDER
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4, fontWeight: 500 }}>
                        Coverage on All View Points
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        px: 4,
                                        py: 0.75,
                                        borderRadius: 8,
                                        display: 'inline-block',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        mb: 2,
                                        userSelect: 'none',
                                        pointerEvents: 'none'
                                    }}>
                                        Eyes ON
                                    </Typography>
                                    <List dense sx={{ pt: 1 }}>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Central" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="State" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="City" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Rural" /></ListItem>
                                    </List>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        px: 4,
                                        py: 0.75,
                                        borderRadius: 8,
                                        display: 'inline-block',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        mb: 2,
                                        userSelect: 'none',
                                        pointerEvents: 'none'
                                    }}>
                                        Sorted ON
                                    </Typography>
                                    <List dense sx={{ pt: 1 }}>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Bid Amount" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Open & Live" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="To be Re-Opened" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Sectors" /></ListItem>
                                    </List>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        px: 4,
                                        py: 0.75,
                                        borderRadius: 8,
                                        display: 'inline-block',
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        mb: 2,
                                        userSelect: 'none',
                                        pointerEvents: 'none'
                                    }}>
                                        Detailed for
                                    </Typography>
                                    <List dense sx={{ pt: 1 }}>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Depth Information" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Upload Alerts" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Bid Progress View" /></ListItem>
                                        <ListItem sx={{ justifyContent: 'center', py: 0.25 }}><ListItemText primaryTypographyProps={{ align: 'center', fontWeight: 500 }} primary="Fit-Matrix" /></ListItem>
                                    </List>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
                        <FormControl size="small" sx={{ minWidth: 220 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>Central</em></MenuItem>
                                <MenuItem value="option1">Option 1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 220 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>State</em></MenuItem>
                                <MenuItem value="option1">Option 1</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size="small" sx={{ minWidth: 220 }}>
                            <Select defaultValue="" displayEmpty sx={{ bgcolor: 'grey.50' }}>
                                <MenuItem value=""><em>City</em></MenuItem>
                                <MenuItem value="option1">Option 1</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography fontWeight="600">Category</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0 }}>
                                        <Typography variant="body2" color="text.secondary">Options will appear here.</Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography fontWeight="600">Govt / Private</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0 }}>
                                        <Typography variant="body2" color="text.secondary">Options will appear here.</Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography fontWeight="600">Department</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0 }}>
                                        <Typography variant="body2" color="text.secondary">Options will appear here.</Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion disableGutters elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, '&:before': { display: 'none' } }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography fontWeight="600">Extra Info</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ pt: 0 }}>
                                        <Typography variant="body2" color="text.secondary">More information filters.</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    border: '2px dashed',
                                    borderColor: 'grey.300',
                                    height: '100%',
                                    minHeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'grey.50',
                                    borderRadius: 2
                                }}
                            >
                                {items.length > 0 ? (
                                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%', height: '100%', overflowY: 'auto' }}>
                                        {items.map((item: any, index: number) => (
                                            <Paper key={index} variant="outlined" sx={{ p: 2, bgcolor: 'background.paper', borderColor: 'divider' }}>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom>{item.categoryName || item?.category?.name || "Tender"}</Typography>
                                                <Grid container spacing={2} sx={{ mb: 1 }}>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Typography variant="body2" color="text.secondary"><strong>Level:</strong> {item.tender_level}</Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Typography variant="body2" color="text.secondary"><strong>Type:</strong> {item.govt_private}</Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 4 }}>
                                                        <Typography variant="body2" color="text.secondary"><strong>Department:</strong> {item.department}</Typography>
                                                    </Grid>
                                                </Grid>
                                                {item.extra_info && <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}><strong>Extra Info:</strong> {item.extra_info}</Typography>}
                                                <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: item.details || item.description || '' }} />
                                            </Paper>
                                        ))}
                                    </Box>
                                ) : (
                                    <Typography color="text.secondary" variant="h6" fontStyle="italic">
                                        No tenders found.
                                    </Typography>
                                )}
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}