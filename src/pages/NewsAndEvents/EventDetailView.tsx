import { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    TextField,
    Divider,
} from '@mui/material';

export default function EventDetailView({ eventData }: any) {
    const [attendType, setAttendType] = useState('');

    return (
        <Box sx={{ maxWidth: '1400px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                    <InputLabel>Sectors</InputLabel>
                    <Select label="Sectors" defaultValue="">
                        <MenuItem value=""><em>None</em></MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                    <InputLabel>Events</InputLabel>
                    <Select label="Events" defaultValue="">
                        <MenuItem value=""><em>None</em></MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 250 }}>
                    <InputLabel>Companies</InputLabel>
                    <Select label="Companies" defaultValue="">
                        <MenuItem value=""><em>None</em></MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: { xs: 2, sm: 4 }, bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 35%' } }}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 300,
                                bgcolor: 'grey.200',
                                borderRadius: 1,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            {eventData?.image ? (
                                <Box component="img" src={eventData.image} alt="Event" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <Typography color="text.secondary">Image</Typography>
                            )}
                        </Box>
                        <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, textAlign: 'center', border: '1px solid #e0e0e0' }}>
                            <Typography variant="h6" fontWeight="bold">{eventData?.title || 'Event Name'}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography fontWeight="bold" sx={{ minWidth: 100 }}>Date:</Typography>
                            <TextField size="small" fullWidth placeholder="Select Date" />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography fontWeight="bold" sx={{ minWidth: 100 }}>Companies:</Typography>
                            <TextField size="small" fullWidth placeholder="Enter Companies" />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                            <Typography fontWeight="bold" sx={{ minWidth: 100 }}>Details:</Typography>
                            <Box sx={{ flex: 1, height: '100%' }}>
                                <Typography variant="body1" sx={{ color: 'text.secondary', minHeight: 120, borderBottom: '1px solid #eee', pb: 2 }}>
                                    {eventData?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto', pt: 2 }}>
                            <Typography fontWeight="bold" sx={{ minWidth: 100 }}>Attend as:</Typography>
                            <Button
                                variant={attendType === 'Host' ? 'contained' : 'outlined'}
                                onClick={() => setAttendType('Host')}
                                sx={{ borderRadius: 8, textTransform: 'none', px: 4, py: 1 }}
                            >
                                Host
                            </Button>
                            <Typography color="text.secondary" fontWeight="medium">or</Typography>
                            <Button
                                variant={attendType === 'Visitor' ? 'contained' : 'outlined'}
                                onClick={() => setAttendType('Visitor')}
                                sx={{ borderRadius: 8, textTransform: 'none', px: 4, py: 1 }}
                            >
                                Visitor
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {attendType && (
                    <>
                        <Divider sx={{ my: 5 }} />

                        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
                            <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
                                {attendType}
                            </Typography>
                            <Box
                                sx={{
                                    border: '2px dashed',
                                    borderColor: 'grey.300',
                                    p: 8,
                                    borderRadius: 3,
                                    mb: 4,
                                    bgcolor: 'grey.50',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography color="text.secondary" fontStyle="italic" variant="h6">
                                    (Here form & calendar fill up related Info will come)
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ px: 8, py: 1.5, borderRadius: 8, fontWeight: 'bold', fontSize: '1.1rem' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}
