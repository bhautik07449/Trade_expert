import * as React from "react"
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material"

type InquiryDialogProps = {
    open: boolean
    onClose: () => void
    onSubmit?: (data: Record<string, any>) => void
    product?: {
        name: string
        description?: string
        image?: string
    }
}

export default function InquiryDialog({
    open,
    onClose,
    onSubmit,
    product = {
        name: "Flavoured Khakhra",
        description: "Khakhra is a thin cracker common in the Gujarati and Rajasthani cuisines of western India...",
        image: "/product-thumbnail.png",
    },
}: InquiryDialogProps) {
    const formRef = React.useRef<HTMLFormElement>(null)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const obj: Record<string, any> = {}
        fd.forEach((v, k) => {
            obj[k] = v
        })
        obj.getLatestPrice = fd.get("getLatestPrice") === "on"
        if (onSubmit) onSubmit(obj)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" aria-labelledby="inquiry-dialog-title">
            <DialogTitle id="inquiry-dialog-title" sx={{ textAlign: "center", fontWeight: 600 }}>
                REQUEST AN INQUIRY
            </DialogTitle>

            <DialogContent dividers>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar src={product.image} alt={product.name} sx={{ width: 56, height: 56 }} variant="rounded" />
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                            {product.name}
                        </Typography>
                        {product.description ? (
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        ) : null}
                    </Box>
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        {/* Left Column */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                Inquiry Information
                            </Typography>

                            <TextField
                                name="subject"
                                label="Subject"
                                placeholder="Please enter subject"
                                fullWidth
                                size="small"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="message"
                                label="Message"
                                placeholder="Please enter message"
                                fullWidth
                                size="small"
                                multiline
                                minRows={4}
                                sx={{ mb: 2 }}
                            />

                            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="body2" fontWeight={600}>
                                        Expected Order Quantity
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 5 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="unit-label">Unit</InputLabel>
                                        <Select labelId="unit-label" label="Unit" name="unit" defaultValue="Metric Ton">
                                            <MenuItem value="Metric Ton">Metric Ton</MenuItem>
                                            <MenuItem value="Kilogram">Kilogram</MenuItem>
                                            <MenuItem value="Pound">Pound</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 7 }}>
                                    <TextField
                                        name="quantity"
                                        label="Quantity"
                                        placeholder="Please enter quantity"
                                        fullWidth
                                        size="small"
                                        type="number"
                                        inputProps={{ min: 0, step: "any" }}
                                    />
                                </Grid>
                            </Grid>

                            <FormControlLabel control={<Checkbox name="getLatestPrice" />} label="Get latest price" sx={{ mb: 2 }} />

                            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel id="frequency-label">Requirement Frequency</InputLabel>
                                <Select labelId="frequency-label" label="Requirement Frequency" name="frequency" defaultValue="Monthly">
                                    <MenuItem value="One-time">One-time</MenuItem>
                                    <MenuItem value="Weekly">Weekly</MenuItem>
                                    <MenuItem value="Monthly">Monthly</MenuItem>
                                    <MenuItem value="Quarterly">Quarterly</MenuItem>
                                    <MenuItem value="Yearly">Yearly</MenuItem>
                                </Select>
                            </FormControl>

                            <Grid container spacing={1} alignItems="center">
                                <Grid size={{ xs: 5 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="currency-label">Currency</InputLabel>
                                        <Select labelId="currency-label" label="Currency" name="currency" defaultValue="USD">
                                            <MenuItem value="USD">USD</MenuItem>
                                            <MenuItem value="EUR">EUR</MenuItem>
                                            <MenuItem value="INR">INR</MenuItem>
                                            <MenuItem value="GBP">GBP</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 7 }}>
                                    <TextField
                                        name="preferredUnitPrice"
                                        label="Preferred Unit Price"
                                        placeholder="Preferred unit price"
                                        fullWidth
                                        size="small"
                                        type="number"
                                        inputProps={{ min: 0, step: "any" }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Right Column */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                Contact Detail
                            </Typography>

                            <Grid container spacing={1} sx={{ mb: 1 }}>
                                <Grid size={{ xs: 4 }}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="salutation-label">Title</InputLabel>
                                        <Select labelId="salutation-label" label="Title" name="salutation" defaultValue="Mr.">
                                            <MenuItem value="Mr.">Mr.</MenuItem>
                                            <MenuItem value="Ms.">Ms.</MenuItem>
                                            <MenuItem value="Mrs.">Mrs.</MenuItem>
                                            <MenuItem value="Dr.">Dr.</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <TextField
                                        name="firstName"
                                        label="First name"
                                        placeholder="Enter first name"
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 4 }}>
                                    <TextField
                                        name="lastName"
                                        label="Last name"
                                        placeholder="Enter last name"
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                name="company"
                                label="Company name"
                                placeholder="Company name"
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="email"
                                label="Business email"
                                placeholder="Business email"
                                type="email"
                                fullWidth
                                size="small"
                                required
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="address"
                                label="Business address"
                                placeholder="Business address"
                                fullWidth
                                size="small"
                                multiline
                                minRows={2}
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="contact"
                                label="Business contact"
                                placeholder="Business contact"
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                name="website"
                                label="Business website"
                                placeholder="https://example.com"
                                type="url"
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />

                            <FormControl fullWidth size="small">
                                <InputLabel id="business-type-label">Business Type</InputLabel>
                                <Select labelId="business-type-label" label="Business Type" name="businessType" defaultValue="">
                                    <MenuItem value="">
                                        <em>Choose...</em>
                                    </MenuItem>
                                    <MenuItem value="Retailer">Retailer</MenuItem>
                                    <MenuItem value="Wholesaler">Wholesaler</MenuItem>
                                    <MenuItem value="Manufacturer">Manufacturer</MenuItem>
                                    <MenuItem value="Distributor">Distributor</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <DialogActions sx={{ px: 0, pt: 3 }}>
                        <Button onClick={onClose} variant="text">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="success">
                            Submit
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
