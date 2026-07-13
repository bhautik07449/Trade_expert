import React, { useRef, useState } from "react";
import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetailInDepth({ setActiveView, card }: any) {
    const [detailTab, setDetailTab] = useState('Image');

    const imageRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const financialsRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (section: string) => {
        setDetailTab(section);
        const ref = 
            section === 'Image' ? imageRef :
            section === 'Profile' ? profileRef :
            section === 'Financials' ? financialsRef :
            videoRef;
            
        if (ref.current) {
            setTimeout(() => {
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    };

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => setActiveView('cards')}
                sx={{ mb: 3 }}
                color="inherit"
            >
                Back to Franchises
            </Button>

            <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 4, textTransform: 'uppercase' }}>
                Details - In Depth.
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper variant="outlined" sx={{ borderRadius: 2, position: 'sticky', top: '150px' }}>
                        <List disablePadding>
                            {['Image', 'Profile', 'Financials', 'Video'].map((item, index) => (
                                <React.Fragment key={item}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            selected={detailTab === item}
                                            onClick={() => scrollToSection(item)}
                                            sx={{
                                                borderLeft: detailTab === item ? '4px solid' : '4px solid transparent',
                                                borderColor: 'primary.main',
                                                bgcolor: detailTab === item ? 'primary.50' : 'transparent',
                                            }}
                                        >
                                            <ListItemText primary={item} primaryTypographyProps={{ fontWeight: detailTab === item ? 'bold' : 'medium' }} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < 3 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Paper variant="outlined" sx={{ p: 4, minHeight: 400, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        
                        <Box ref={imageRef} sx={{ scrollMarginTop: '180px' }}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                Image Information
                            </Typography>
                            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300', mt: 2, overflow: 'hidden' }}>
                                {card?.image ? (
                                    <Box component="img" src={card.image} alt="Detail" sx={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
                                ) : (
                                    <Typography color="text.secondary" fontStyle="italic">
                                        No Image available
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        
                        <Divider />
                        
                        <Box ref={profileRef} sx={{ scrollMarginTop: '180px' }}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                Profile Information
                            </Typography>
                            <Box sx={{ minHeight: 200, p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200', mt: 2 }}>
                                {card?.profile ? (
                                    <Typography color="text.primary" dangerouslySetInnerHTML={{ __html: card.profile }} />
                                ) : (
                                    <Typography color="text.secondary" fontStyle="italic" align="center" sx={{ mt: 8 }}>
                                        No Profile information available
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Divider />
                        
                        <Box ref={financialsRef} sx={{ scrollMarginTop: '180px' }}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                Financials Information
                            </Typography>
                            <Box sx={{ minHeight: 200, p: 3, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'grey.200', mt: 2 }}>
                                {card?.financials ? (
                                    <Typography color="text.primary" dangerouslySetInnerHTML={{ __html: card.financials }} />
                                ) : (
                                    <Typography color="text.secondary" fontStyle="italic" align="center" sx={{ mt: 8 }}>
                                        No Financials information available
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Divider />

                        <Box ref={videoRef} sx={{ scrollMarginTop: '180px' }}>
                            <Typography variant="h6" color="primary.main" gutterBottom>
                                Video Information
                            </Typography>
                            <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300', mt: 2, overflow: 'hidden' }}>
                                {card?.video ? (
                                    <video src={card.video} controls style={{ maxWidth: '100%', maxHeight: '400px' }} />
                                ) : (
                                    <Typography color="text.secondary" fontStyle="italic">
                                        No Video available
                                    </Typography>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => setActiveView('requestInfo')}
                                sx={{ minWidth: 200, borderRadius: 2, fontWeight: 'bold' }}
                            >
                                Request Info
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}