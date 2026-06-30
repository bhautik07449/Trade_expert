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

export default function Tender() {
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
                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        display: 'inline-block',
                                        pb: 0.5
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
                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        display: 'inline-block',
                                        pb: 0.5
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
                                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{
                                        borderBottom: '2px solid',
                                        borderColor: 'primary.main',
                                        display: 'inline-block',
                                        pb: 0.5
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

                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, ml: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <span style={{ fontSize: '16px' }}>&#8595;</span> Open more tab on click.
                                </Typography>
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
                                <Typography color="text.secondary" variant="h6" fontStyle="italic">
                                    (Content / Results Area)
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}