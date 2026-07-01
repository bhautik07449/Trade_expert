import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function OtherTrades({ activeTab }: any) {
    return (
        <Box>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={6}>
                <TextField
                    fullWidth
                    size="medium"
                    placeholder={`Search in ${activeTab}...`}
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 120, borderRadius: 2, fontWeight: 600 }}
                >
                    Search
                </Button>
            </Stack>
            <Box
                sx={{
                    py: 10,
                    textAlign: 'center',
                    bgcolor: '#f8fafc',
                    borderRadius: 3,
                    border: '2px dashed',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h5" color="text.secondary" fontWeight={600}>
                    {activeTab} content will come soon.
                </Typography>
            </Box>
        </Box>
    )
}