import { Box, Typography } from "@mui/material";

export default function CommPressSection() {
    return (
        <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ textTransform: 'uppercase', borderBottom: '2px solid', borderColor: 'primary.main', pb: 0.5, mb: 1 }}>
                COMM-PRESS
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 4 }}>
                (NEWS & EVENTS)
            </Typography>

            <Box sx={{
                border: '1px solid',
                borderColor: 'primary.main',
                borderRadius: 4,
                px: 6,
                py: 3,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                maxWidth: 600
            }}>
                <Typography variant="body1" fontStyle="italic" fontWeight="500">
                    (This feature will be made specifically for COMM-EDUM Initirer of this Page.)
                </Typography>
            </Box>
        </Box>
    );
}
