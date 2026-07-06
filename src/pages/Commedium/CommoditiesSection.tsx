import { useState } from 'react';
import { Box, Typography, Select, MenuItem, Paper, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import SideTableView from './SideTableView';

export default function CommoditiesSection() {

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

            <SideTableView />
        </Box>
    );
}
