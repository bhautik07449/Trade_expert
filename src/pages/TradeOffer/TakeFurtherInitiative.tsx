import React, { useState, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Container,
} from '@mui/material';

export default function TakeFurtherInitiative() {
    const [activeTab, setActiveTab] = useState('EOI');

    const menuItems = [
        { id: 'EOI', label: 'EOI' },
        { id: 'MOU', label: 'MOU' },
        { id: 'MOA', label: 'MOA' },
        { id: 'MOIS', label: 'MOIS' },
        { id: 'TRACK_PROGRESS', label: 'TRACK PROGRESS' },
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollTop;

        for (let i = menuItems.length - 1; i >= 0; i--) {
            const element = document.getElementById(`section-${menuItems[i].id}`);
            if (element) {
                if (element.offsetTop - container.offsetTop <= scrollPosition + 100) {
                    if (activeTab !== menuItems[i].id) {
                        setActiveTab(menuItems[i].id);
                    }
                    break;
                }
            }
        }
    };

    const handleMenuClick = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(`section-${id}`);
        const container = scrollContainerRef.current;
        if (element && container) {
            container.scrollTo({
                top: element.offsetTop - container.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const renderAllContent = () => {
        return (
            <Box
                ref={scrollContainerRef}
                onScroll={handleScroll}
                sx={{
                    height: '500px',
                    overflowY: 'auto',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    scrollBehavior: 'smooth'
                }}
            >
                {menuItems.map(item => (
                    <Box key={item.id} id={`section-${item.id}`} sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                            {item.label}
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                                flex: 1,
                                mt: 2,
                                p: 4,
                                border: '2px dashed',
                                borderColor: 'grey.300',
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'grey.50'
                            }}
                        >
                            <Typography color="text.secondary" variant="body1" fontStyle="italic" align="center">
                                Detailed description and information for {item.label} will be shown here. <br />
                                (Information only appears if it is available and progress has happened.)
                            </Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
        );
    };

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
                    <Typography variant="h5" align="center" fontWeight="800" gutterBottom sx={{ color: 'secondary.main', textTransform: 'uppercase', letterSpacing: 0.5, mb: 4, borderBottom: '2px solid', borderColor: 'divider', pb: 2, display: 'inline-block', width: '100%' }}>
                        Take further Initiative.
                    </Typography>

                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <List disablePadding>
                                    {menuItems.map((item, index) => (
                                        <React.Fragment key={item.id}>
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    selected={activeTab === item.id}
                                                    onClick={() => handleMenuClick(item.id)}
                                                    sx={{
                                                        py: 2,
                                                        borderLeft: activeTab === item.id ? '4px solid' : '4px solid transparent',
                                                        borderColor: 'primary.main',
                                                        bgcolor: activeTab === item.id ? 'primary.50' : 'transparent',
                                                        '&.Mui-selected': {
                                                            bgcolor: 'primary.50',
                                                            '&:hover': {
                                                                bgcolor: 'primary.100',
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={item.label}
                                                        primaryTypographyProps={{
                                                            fontWeight: activeTab === item.id ? 'bold' : 'medium',
                                                            color: activeTab === item.id ? 'primary.main' : 'text.primary'
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                            {index < menuItems.length - 1 && <Box sx={{ height: '1px', bgcolor: 'divider' }} />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, md: 9 }}>
                            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                {renderAllContent()}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}