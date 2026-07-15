// @ts-nocheck
import { useState } from "react";
import {
    Box, Button, Checkbox, CircularProgress, Divider,
    FormControl, FormControlLabel,
    Grid, MenuItem, Paper, Select, Snackbar, Alert,
    TextField, Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CMSservice from "../../service/cms.service";

const INITIAL_FORM = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    street: '',
    unit: '',
    postal: '',
    available_cash: '',
    contact_method: 'email',
    contact_detail: '',
    investment_diligence: '',
    best_time_to_call: '',
    comment: '',
    updates_opt_in: true,
};

function validate(form: typeof INITIAL_FORM) {
    const errors: Partial<typeof INITIAL_FORM> = {};
    if (!form.first_name.trim()) errors.first_name = 'First name is required';
    if (!form.last_name.trim()) errors.last_name = 'Last name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
    if (!form.phone.trim()) errors.phone = 'Phone number is required';
    if (!form.city.trim()) errors.city = 'City is required';
    return errors;
}

export default function RequestInfo({ setActiveView, card }: any) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState<Partial<typeof INITIAL_FORM>>({});
    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState<{ open: boolean; type: 'success' | 'error'; msg: string }>({
        open: false, type: 'success', msg: ''
    });

    const handleChange = (field: keyof typeof INITIAL_FORM) => (e: any) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = async () => {
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...form,
                offer_id: card?.id ?? null,
                offer_name: card?.franchiseName ?? card?.franchise_type?.franchise_type ?? null,
            };
            await CMSservice.submitRequestInfo(payload);
            setSnack({ open: true, type: 'success', msg: 'Request submitted successfully! We will contact you soon.' });
            setForm(INITIAL_FORM);
            setErrors({});
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Something went wrong. Please try again.';
            setSnack({ open: true, type: 'error', msg });
        } finally {
            setLoading(false);
        }
    };

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
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            size="small"
                            value={form.first_name}
                            onChange={handleChange('first_name')}
                            error={!!errors.first_name}
                            helperText={errors.first_name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            size="small"
                            value={form.last_name}
                            onChange={handleChange('last_name')}
                            error={!!errors.last_name}
                            helperText={errors.last_name}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Phone No."
                            variant="outlined"
                            size="small"
                            value={form.phone}
                            onChange={handleChange('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="State"
                            variant="outlined"
                            size="small"
                            value={form.state}
                            onChange={handleChange('state')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="City"
                            variant="outlined"
                            size="small"
                            value={form.city}
                            onChange={handleChange('city')}
                            error={!!errors.city}
                            helperText={errors.city}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Street"
                            variant="outlined"
                            size="small"
                            value={form.street}
                            onChange={handleChange('street')}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Unit"
                            variant="outlined"
                            size="small"
                            value={form.unit}
                            onChange={handleChange('unit')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                            fullWidth
                            label="Postal"
                            variant="outlined"
                            size="small"
                            value={form.postal} onChange={handleChange('postal')}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth size="small">
                            <Select
                                value={form.available_cash}
                                onChange={handleChange('available_cash')}
                                displayEmpty
                            >
                                <MenuItem value=""><em>Available Cash</em></MenuItem>
                                <MenuItem value="10k">$10,000+</MenuItem>
                                <MenuItem value="50k">$50,000+</MenuItem>
                                <MenuItem value="100k">$100,000+</MenuItem>
                                <MenuItem value="500k">$500,000+</MenuItem>
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
                                    <Select value={form.contact_method} onChange={handleChange('contact_method')}>
                                        <MenuItem value="email">Email</MenuItem>
                                        <MenuItem value="phone">Phone</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth placeholder="Details..." variant="outlined" size="small"
                                    value={form.contact_detail} onChange={handleChange('contact_detail')}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={form.investment_diligence}
                                        onChange={handleChange('investment_diligence')}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><em>Investment Diligence</em></MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
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
                                    <Select
                                        value={form.best_time_to_call}
                                        onChange={handleChange('best_time_to_call')}
                                        displayEmpty
                                    >
                                        <MenuItem value=""><em>Best time to Call</em></MenuItem>
                                        <MenuItem value="morning">Morning</MenuItem>
                                        <MenuItem value="afternoon">Afternoon</MenuItem>
                                        <MenuItem value="evening">Evening</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Comment / Question"
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={3}
                                    value={form.comment}
                                    onChange={handleChange('comment')}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 3, mb: 4 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.updates_opt_in}
                                onChange={handleChange('updates_opt_in')}
                                color="primary"
                            />
                        }
                        label="Update for future franchise opportunities!"
                    />
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        disabled={loading}
                        onClick={handleSubmit}
                        sx={{ minWidth: 200, borderRadius: 2, fontWeight: 'bold' }}
                        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                    >
                        {loading ? 'Submitting...' : 'Continue →'}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={snack.open}
                autoHideDuration={5000}
                onClose={() => setSnack(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snack.type}
                    variant="filled"
                    onClose={() => setSnack(s => ({ ...s, open: false }))}
                    sx={{ width: '100%' }}
                >
                    {snack.msg}
                </Alert>
            </Snackbar>
        </Box>
    );
}