import { Box, Typography } from "@mui/material";

export default function OverViewContent() {
    return (
        <Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 4, md: 6 }, py: { xs: 3, md: 4 }, boxSizing: 'border-box', mb: 4 }}>
            <Box>
                <Typography variant="h4">About us</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
            </Box>
        </Box>
    )
}