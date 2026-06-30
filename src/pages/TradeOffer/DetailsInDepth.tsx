import React, { useState } from "react";
import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetailInDepth({ setActiveView }: any) {
    const [detailTab, setDetailTab] = useState('Image');

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
                    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                        <List disablePadding>
                            {['Image', 'Profile', 'Financials', 'Video'].map((item, index) => (
                                <React.Fragment key={item}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            selected={detailTab === item}
                                            onClick={() => setDetailTab(item)}
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
                    <Paper variant="outlined" sx={{ p: 4, minHeight: 400, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" color="primary.main" gutterBottom>
                            {detailTab} Information
                        </Typography>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300', mt: 2 }}>
                            <Typography color="text.secondary" fontStyle="italic">
                                (Content for {detailTab} will navigate/show here)
                            </Typography>
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