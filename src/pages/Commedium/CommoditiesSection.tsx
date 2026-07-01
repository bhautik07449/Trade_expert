import { useState } from 'react';
import { Box, Typography, Select, MenuItem, Paper, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function CommoditiesSection() {
    const trends = [
        {
            name: "Active",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        },
        {
            name: "Adv/Decline",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        },
        {
            name: "CLOSING",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        },
        {
            name: "HIGH/LOW",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        },
        {
            name: "TOP TRADED",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum."
        },
    ];

    const [selectedTrend, setSelectedTrend] = useState(trends[0]);

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 3, textTransform: 'uppercase' }}>
                COMMODITIES
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250, bgcolor: 'white' }}>
                    <MenuItem value="">Categories</MenuItem>
                </Select>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250, bgcolor: 'white' }}>
                    <MenuItem value="">MCDEX/NCDEX</MenuItem>
                </Select>
                <Select size="small" defaultValue="" displayEmpty sx={{ minWidth: 250, bgcolor: 'white' }}>
                    <MenuItem value="">CLASSIFICATION</MenuItem>
                </Select>
            </Box>

            <Paper variant="outlined" sx={{ display: 'flex', minHeight: 400, borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ width: 250, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', textTransform: 'uppercase' }}>
                        TREND SWITCHER
                    </Typography>
                    <List disablePadding>
                        {trends.map((trend, index) => (
                            <ListItem key={index} disablePadding sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                                <ListItemButton
                                    sx={{ py: 1.5, bgcolor: selectedTrend.name === trend.name ? 'primary.light' : 'transparent' }}
                                    onClick={() => setSelectedTrend(trend)}
                                >
                                    <ListItemText primary={trend.name} primaryTypographyProps={{ variant: 'body2', fontWeight: selectedTrend.name === trend.name ? 'bold' : '500', color: selectedTrend.name === trend.name ? 'primary.main' : 'inherit' }} />
                                    <ListItemIcon sx={{ minWidth: 'auto', color: selectedTrend.name === trend.name ? 'primary.main' : 'inherit' }}>
                                        <ArrowRightIcon fontSize="small" />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ flex: 1, bgcolor: 'white', p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant="h5" color="primary.main" fontWeight="bold" sx={{ mb: 2 }}>
                        {selectedTrend.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {selectedTrend.description}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}
