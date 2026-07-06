import { Box, Typography, Select, MenuItem } from "@mui/material";
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
                <Select size="small" defaultValue="MCDEX" displayEmpty sx={{ minWidth: 250, bgcolor: 'white' }}>
                    <MenuItem value="MCDEX">MCDEX</MenuItem>
                    <MenuItem value="NCDEX">NCDEX</MenuItem>
                </Select>
                <Select size="small" defaultValue="CLASSIFICATION" displayEmpty sx={{ minWidth: 250, bgcolor: 'white' }}>
                    <MenuItem value="CLASSIFICATION">CLASSIFICATION</MenuItem>
                </Select>
            </Box>

            <SideTableView />
        </Box>
    );
}