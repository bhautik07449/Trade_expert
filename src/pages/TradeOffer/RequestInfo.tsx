import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RequestInfo({ setActiveView }: any) {
    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => setActiveView('detailInDepth')}
                sx={{ mb: 3 }}
                color="inherit"
            >
                Back to Details
            </Button>

            <Paper variant="outlined" sx={{ p: { xs: 2, md: 5 }, borderRadius: 2 }}>
                <Typography variant="h6" align="center" fontWeight="bold" sx={{ mb: 4, textTransform: 'uppercase' }}>
                    Request Info
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="First Name" variant="outlined" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Last Name" variant="outlined" size="small" />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Email" variant="outlined" size="small" type="email" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField fullWidth label="Phone No." variant="outlined" size="small" />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="State" variant="outlined" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="City" variant="outlined" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Street" variant="outlined" size="small" />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Unit" variant="outlined" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField fullWidth label="Postal" variant="outlined" size="small" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth size="small">
                            <Select defaultValue="" displayEmpty>
                                <MenuItem value=""><em>Available Cash</em></MenuItem>
                                <MenuItem value="10k">$10,000+</MenuItem>
                                <MenuItem value="50k">$50,000+</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    How would you like to get contacted?
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth size="small">
                                    <Select defaultValue="email">
                                        <MenuItem value="email">Email</MenuItem>
                                        <MenuItem value="phone">Phone</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField fullWidth placeholder="Details..." variant="outlined" size="small" />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <FormControl fullWidth size="small">
                                    <Select defaultValue="" displayEmpty>
                                        <MenuItem value=""><em>Investment Diligence</em></MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                        <MenuItem value="low">Low</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <FormControl fullWidth size="small">
                                    <Select defaultValue="" displayEmpty>
                                        <MenuItem value=""><em>Best time to Call</em></MenuItem>
                                        <MenuItem value="morning">Morning</MenuItem>
                                        <MenuItem value="afternoon">Afternoon</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Comment / Qust"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, mb: 4 }}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked color="primary" />}
                        label="Update for future franchise opportunities!"
                    />
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{ minWidth: 200, borderRadius: 2, fontWeight: 'bold' }}
                    >
                        Continue &rarr;
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}